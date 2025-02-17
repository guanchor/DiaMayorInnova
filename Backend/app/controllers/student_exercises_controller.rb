class StudentExercisesController < ApplicationController
  before_action :authenticate_user!

  def index
    @exercises = Exercise.includes(:task, marks: { student_entries: :student_annotations }).where(user_id: current_user.id)
    render json: @exercises.as_json(
      include: {
        task: {only: [:title]},  
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
  
    if @exercise.save
      @mark = Mark.new(exercise_id: @exercise.id, mark: 5, statement_id: 9)
      
      if @mark.save
        render json: { exercise: @exercise, mark: @mark }, status: :created
      else
        render json: @mark.errors, status: :unprocessable_entity
      end
    else
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end

  def find_mark_exercise_by_user

    @exercises = Exercise.includes(:task, marks: { student_entries: :student_annotations }).where(user_id: current_user.id)

    # puts "
    
    # *****************************************
    # ****************************************
    
    # Suma total de marcas: #{@total_mark}
    
    # *********************************
    # *********************************
    
    # "
  
    render json: @exercises.as_json(
      include: {
        task: {only: [:title]},  
        marks: {
            include: {
              student_entries: {
                include: :student_annotations
              }
            }
          }
      },
      methods: [:total_mark]
    )
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