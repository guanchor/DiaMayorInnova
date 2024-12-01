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

    if task_params[:statement_ids].present?
      @task.statement_ids = task_params[:statement_ids]
    end

    if @task.update(task_params)
      render json: @task, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @tasks = Task.all
    @task = Task.find(params[:id])
    @task.destroy
    render json: @tasks
  end

   # Nuevo método para eliminar un enunciado de una tarea
   def destroy_statement
    @task = Task.find(params[:task_id])
    @statement = Statement.find(params[:statement_id])

    # Eliminar la relación entre la tarea y el enunciado
    @task.statements.delete(@statement)

    # Retornar la tarea actualizada con los enunciados restantes
    render json: @task.to_json(include: :statements), status: :ok
  end

  private 

  def task_params
    params.require(:task).permit(:title, :description, statement_ids: [])
  end
end