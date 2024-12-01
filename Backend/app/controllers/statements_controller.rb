class StatementsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_statement, only: [:update, :destroy]

  def index
    @statements = Statement.where("is_public = ? OR user_id = ?", true, current_user.id)
    render json: @statements
  end

  def show
    @statement = Statement.includes(:solutions).find(params[:id])
    render json: @statement, include: :solutions
  end

  def create
    @statement = current_user.statements.create(statement_params)
    if @statement.save
      render json: @statement, status: :created
    else
      render json: @statement.errors, status: :unprocessable_entity
    end
  end

  # Nuevo método para agregar una solución a un enunciado
  def add_solution
    @statement = Statement.find(params[:id])
    @solution = @statement.solutions.create(solution_params)
    if @solution.save
      render json: @solution, status: :created
    else
      render json: @solution.errors, status: :unprocessable_entity
    end
  end

  def update
    if @statement.user_id == current_user.id
      if @statement.update(statement_params)
        render json: @statement
      else
        render json: @statement.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "No autorizado" }, status: :forbidden
    end
  end

  def destroy
    if @statement.user_id == current_user.id
    @statement.destroy
      render json: { message: "Enunciado eliminado"}, status: :ok
    else
      render json: { error: "No autorizado" }, status: :forbidden
    end
  end

  private

  def find_statement
    @statement = Statement.find(params[:id])
  end

  def statement_params
    params.required(:statement).permit(:definition, :explanation, :is_public)
  end

  def solution_params
    params.require(:solution).permit(:content)
  end
end