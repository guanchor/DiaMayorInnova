class SolutionsController < ApplicationController
  before_action :set_solution, only: [:mark_as_example, :unmark_as_example, :show, :update, :destroy]
  def index
    @solutions = Solution.all
    render json: @solutions
  end
  
  def show
      @solution = Solution.find(params[:id])
      render json: @solution
  end

  def create
      @solution = Solution.create(
          description: params[:description],
      )
      render json: @solution
  end

  def update
      @solution = Solution.find(params[:id])
      @solution.update(
        description: params[:description],
      )
      render json: @solution
  end

  def destroy
      @solutions = Solution.all
      @solution = Solution.find(params[:id])
      @solution.destroy
      render json: @solutions
  end 
  def mark_as_example
    # Vérifier si un HelpExample existe déjà pour cette solution
    if @solution.help_example.present?
      render json: { error: "This solution is already an example" }, status: :unprocessable_entity
      return
    end

    # Créer un HelpExample lié à la solution
    @help_example = HelpExample.new(
      solution_id: @solution.id,
      account_id: params[:account_id] || current_user.account_id,  # À adapter selon votre auth
      creditMoves: params[:creditMoves] || @solution.creditMoves || "",  # Récupérer depuis la solution si disponible
      debitMoves: params[:debitMoves] || @solution.debitMoves || ""
    )

    if @help_example.save && @solution.update(is_example: true)
      render json: { success: true, help_example: @help_example }, status: :created
    else
      errors = @help_example.errors.full_messages + (@solution.errors.full_messages || [])
      render json: { success: false, errors: errors }, status: :unprocessable_entity
    end
  end

  def unmark_as_example
    # Vérifier si la solution est un exemple
    unless @solution.help_example.present?
      render json: { error: "This solution is not an example" }, status: :unprocessable_entity
      return
    end

    # Supprimer le HelpExample et mettre à jour is_example
    @help_example = @solution.help_example
    if @help_example.destroy && @solution.update(is_example: false)
      render json: { success: true, message: "Solution unmarked as example" }, status: :ok
    else
      errors = (@help_example&.errors&.full_messages || []) + (@solution.errors.full_messages || [])
      render json: { success: false, errors: errors }, status: :unprocessable_entity
    end
  end

  private

  def set_solution
    @solution = Solution.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Solution not found" }, status: :not_found
  end

end
