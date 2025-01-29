class ExercisesController < ApplicationController
  before_action :authenticate_user!

  def index
    if params[:user_id].present?
      @exercises = Exercise.where(user_id: params[:user_id])
    else
      @exercises = Exercise.all
    end
    render json: @exercises
  end

  def show
    @exercise = Exercise.find(params[:id])
    render @exercise
  end

  def create
    task_id = exercise_params[:task_id]
    user_ids = exercise_params[:user_id] 

    if user_ids.present?
      errors = []

      user_ids.each do | user_id |
        exercise= Exercise.create(task_id: task_id, user_id: user_id)
        errors << { user_id: user_id, errors: exercise.errors.full_messages } if exercise.errors.any?
      end

      if errors.any?
        render json: { message: 'Algunas tareas no pudieron crearse.', errors: errors }, status: :unprocessable_entity
      else
        render json: { message: 'Tareas creadas con éxito.' }, status: :created
      end
    else
      render json: { error: 'El array de usuarios no puede estar vacío.' }, status: :unprocessable_entity
    end
  end

  def update
    @exercise = Exercise.find(params[:id])
    if @exercise.update(exercise_params)
      render json: @exercise
    else
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @exercises = Exercise.all
    @exercise = Exercise.find(params[:id])
    @exercise.destroy
    render json: @exercises
  end
  
  def destroy_on_group
    task_id = params[:task_id]
    user_ids = params[:user_id]

    if user_ids.present? 
      errors = []
      user_ids.each do | user_id |
        exercise= Exercise.where(user_id: user_id, task_id: task_id)
        exercise.destroy_all
      end

      if errors.any?
        render json: { message: 'Algunas tareas no pudieron crearse.', errors: errors }, status: :unprocessable_entity
      else
        render json: { message: 'Eliminadas' }, status: :created
      end
    else
      render json: { error: 'El array de usuarios no puede estar vacío.' }, status: :unprocessable_entity
    end
  end

  def find_by_task_id
    @exercises = Exercise.where(task_id: params[:task_id])
    if @exercises.any?
      render json: @exercises
    else
      render json: []
    end
  end


  private
    def exercise_params
      params.require(:exercise).permit( :task_id, user_id: [])
  end 

end
