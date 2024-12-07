class ExercisesController < ApplicationController
  before_action :authenticate_user!

  def index
    @exercises = Exercise.all
    render json: @exercises
  end

  def show
    @exercise = Exercise.find(params[:id])
    render @exercise
  end

  def create
    @exercise = Exercise.new(exercise_params)
    if @exercise.save
      render json: @exercise, status: :created
    else
      render json: @exercise.errors, status: :unprocessable_entity
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

  private
    def exercise_params
      params.require(:exercise).permit(:user_id, :task_id)
    end
end
