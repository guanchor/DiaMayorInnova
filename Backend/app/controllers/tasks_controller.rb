class TasksController < ApplicationController

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def show
    @task = Task.includes(:statements).find(params[:id])
    render json: @task.to_json(include: :statements)
  end

  def create
    task = Task.create(
      title: params[:title],
      opening_date: params[:opening_date],
      closing_date: params[:closing_date]
    )
    if task.save
      if params[:statement_ids].present?
        statements = Statement.where(id: params[:statement_ids])
        task.statements << statements
      end

      render json: task, status: :created
    else
      render json: { error: task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update(
      title: params[:title],
      opening_date: params[:opening_date],
      closing_date: params[:closing_date]
    )
    render json: @task
  end

  def destroy
    @tasks = Task.all
    @task = Task.find(params[:id])
    @task.destroy
    render json: @tasks
  end
end