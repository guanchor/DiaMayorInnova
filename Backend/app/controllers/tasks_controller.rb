class TasksController < ApplicationController

  def index
    @tasks = Task.all
    render json: @tasks
  end

  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def create
    @task = Task.create(
      title: params[:title],
      opening_date: params[:opening_date],
      closing_date: params[:closing_date]
    )
    render json: @task
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