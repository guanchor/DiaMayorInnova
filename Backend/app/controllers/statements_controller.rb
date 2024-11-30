class StatementsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_statement, only: [:update, :destroy]


  def index
    @statements = Statement.where("is_public = ? OR user_id = ?", true, current_user.id)
    render json: @statements
  end

  def create
    @statement = current_user.statements.create(statement_params)
    if @statement.save
      render json: @statement, status: :created
    else
      render json: @statement.errors, status: :unprocessable_entity
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
end