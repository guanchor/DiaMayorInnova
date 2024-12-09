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

=begin   private
    def exercise_params
      params.require(:exercise).permit(:user_id, :task_id)
    end 
=end
end
