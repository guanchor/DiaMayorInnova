class StatementsController < ApplicationController

  def index
    @statements = Statement.all
    render json: @statements
  end

  def show
    @statement = Statement.find(params[:id])
    render json: @statement
  end

  def create
    @statement = Statement.create(
      definition: params[:definition],
      explanation: params[:explanation]
    )
    render json: @statement
  end

  def update
    @statement = Statement.find(params[:id])
    @statement.update(
      definition: params[:definition],
      explanation: params[:explanation]
    )
    render json: @statement
  end

  def destroy
    @statements = Statement.all
    @statement = Statement.find(params[:id])
    @statement.destroy
    render json: @statements
  end
end