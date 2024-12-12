class TasksController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @tasks = Task.where(created_by: current_user.id)

    if params[:title].present?
      @tasks = @tasks.where("title LIKE ?", "%#{params[:title]}%")
    end
  
    # Renderizamos las tareas filtradas
    render json: @tasks
  end

  def show
    @task = Task.includes(:statements).find(params[:id])
    render json: @task.to_json(include: :statements)
  end

  def create
    task = Task.new(
      title: params[:title],
      opening_date: params[:opening_date],
      closing_date: params[:closing_date],
      created_by: current_user.id
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

    if @task.update(task_params)
      if params[:statement_ids].present?
        statements = Statement.where(id: params[:statement_ids])

        if statements.count == params[:statement_ids].length
          @task.statements.clear
          @task.statements << statements
        else
          render json: { error: "Algunos enunciados no existen" }, status: :unprocessable_entity
          return
        end
      end
      render json: @task.to_json(include: :statements), status: :ok
    else
      render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @tasks = Task.all
    @task = Task.find(params[:id])
    @task.destroy
    render json: { message: "Tarea eliminada correctamente." }, status: :ok
  end


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
    params.require(:task).permit(:title, :opening_date, :closing_date, statement_ids: [])
  end
end