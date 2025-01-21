class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_task, only: [:show, :update, :destroy, :destroy_statement]
  before_action :set_task, only: [:destroy_statement]
  
  def index
    if current_user.student?
      @tasks = Task.all
      render json: @tasks
      # render json: { error: "No autorizado" }, status: :forbidden Solo para la prueba !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    else
      if current_user.admin?
        @tasks = Task.all
      else
        @tasks = Task.where(created_by: current_user.id)
      end
      if params[:title].present?
        @tasks = @tasks.where("title LIKE ?", "%#{params[:title]}%")
      end
      render json: @tasks
    end
  end

  def show
    @task = Task.includes(:statements).find(params[:id])
    render json: @task.to_json(include: :statements)
  end

  def create
    if current_user.student?
      render json: { error: "No autorizado" }, status: :forbidden
    else
      task = Task.new(
        title: params[:title],
        opening_date: params[:opening_date],
        closing_date: params[:closing_date],
        created_by: current_user.id
      )
      if task.opening_date >= task.closing_date
        render json: { error: "La fecha de apertura debe ser anterior a la fecha de cierre." }, status: :unprocessable_entity
        return
      end
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
  end

  def update
    @task = Task.find(params[:id])

    authorize! :update, @task

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
    @task = Task.find(params[:id])
    @task.destroy
    render json: { message: "Tarea eliminada correctamente." }, status: :ok
  end


  def destroy_statement
    if params[:task_id].blank? || params[:statement_id].blank?
      render json: { error: "Faltan parámetros necesarios." }, status: :bad_request
      return
    end

    @task = Task.find_by(id: params[:task_id])
    @statement = Statement.find_by(id: params[:statement_id])

    if @task.nil? || @statement.nil?
      render json: { error: "Tarea o enunciado no encontrados." }, status: :not_found
      return
    end

    @task.statements.delete(@statement)
    render json: { message: "Enunciado desvinculado de la tarea correctamente." }, status: :ok
  end

  private 

  def authorize_task
    @task = Task.find(params[:id])
    if current_user.student?
      render json: { error: "No autorizado" }, status: :forbidden
    else
      if current_user.admin? || @task.created_by == current_user.id
        authorize! :manage, @task
      else
        render json: { error: "No autorizado" }, status: :forbidden
      end
    end
  rescue CanCan::AccessDenied
    render json: { error: "No autorizado" }, status: :forbidden
  end

  def task_params
    params.require(:task).permit(:title, :opening_date, :closing_date, statement_ids: [])
  end

  def set_task
    @task = Task.find(params[:task_id])
  end
end