class StudentExercisesController < ApplicationController
  before_action :authenticate_user!

  def index
    @tasks = Task.includes(statements: { solutions: { entries: :annotations } }).where(id: params[:task_id])
  
    if @tasks.any?
      render json: @tasks, include: { statements: { include: { solutions: { include: { entries: { include: :annotations } } } } } }
    else
      render json: { error: 'No tasks found' }, status: :not_found
    end
  end

  # def index
  #   @exercises = Exercise.includes(marks: { student_entries: :student_annotations }).where(user_id: current_user.id)
  #   render json: @exercises.as_json(
  #     include: {
  #       marks: {
  #         include: {
  #           student_entries: {
  #             include: :student_annotations
  #           }
  #         }
  #       }
  #     }
  #   )
  # end

  def show
    @exercise = Exercise.includes(marks: { student_entries: :student_annotations }).find(params[:id])
    render json: @exercise.as_json(
      include: {
        marks: {
          include: {
            student_entries: {
              include: :student_annotations
            }
          }
        }
      }
    )
  end



  def create
    @exercise = current_user.exercises.build(exercise_params)
    @solution =   Solution.joins(statement: :tasks).where(tasks: :params[:task_id])

    if @exercise.save
      render json: @exercise, status: :created
    else
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end

  def prueba
    @solution =   Solution.joins(statement: :tasks).where(tasks: :params[:task_id])
  end

  private

  def exercise_params
    params.require(:exercise).permit(
      :task_id,
      marks_attributes: [
        :id,
        :mark,
        student_entries_attributes: [
          :id,
          :entry_number,
          :entry_date,
          student_annotations_attributes: [
            :id,
            :account_id,
            :number,
            :account_number,
            :credit,
            :debit
          ]
        ]
      ]
    )
  end
end