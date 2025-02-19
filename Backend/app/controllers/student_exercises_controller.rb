class StudentExercisesController < ApplicationController
  before_action :authenticate_user!

  def index
    @exercises = Exercise.includes(:task, marks: { student_entries: :student_annotations }).where(user_id: current_user.id)
    render json: @exercises.as_json(
      include: {
        task: { only: [:id, :title, :opening_date, :closing_date] },
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
    @exercise = Exercise.includes(:task, marks: { student_entries: :student_annotations }).find(params[:id])

    time_remaining = if @exercise.task.is_exam
                       current_time = Time.current
                       if current_time < @exercise.task.opening_date
                         0
                       elsif current_time > @exercise.task.closing_date
                         0
                       else
                         (@exercise.task.closing_date - current_time).to_i
                       end
                     else
                       nil
                     end
  
    render json: {
      exercise: @exercise.as_json(
        include: {
          task: { only: [:id, :title, :opening_date, :closing_date, :is_exam] },
          marks: {
            include: {
              student_entries: {
                include: :student_annotations
              }
            }
          }
        }
      ),
      statements: @exercise.task.statements,
      time_remaining: time_remaining
    }
  end

  def create
    @exercise = current_user.exercises.build(exercise_params)

    if @exercise.save
      render json: @exercise, status: :created
    else
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end


  def students_mark_list
    task_id = params[:task_id] # Get ID by param

    @students_marks = Exercise
      .includes(:marks, :task, :user)     # Get relations
      .where(task_id: task_id)            # Filter all exercises from a specific task
      .where(users: { role: "student" })  # Only students
      .joins(:user)                       # Join all student users
    
    result = @students_marks.map do |exercise|
      {
        task: exercise.task.title,  
        student: exercise.user.name,
        mark: exercise.total_mark 
      }
  end

  render json: result
end


  def start
    @exercise = Exercise.find(params[:id])

    # Verificar si el examen existe
    unless @exercise
      render json: { error: "Examen no encontrado." }, status: :not_found
      return
    end

    current_time = Time.current
    if current_time < @exercise.task.opening_date
      render json: { error: "El examen no está disponible aún." }, status: :unprocessable_entity
      return
    elsif current_time > @exercise.task.closing_date
      render json: { error: "El examen ya ha finalizado." }, status: :unprocessable_entity
      return
    elsif @exercise.started
      render json: { error: "El examen ya ha comenzado." }, status: :unprocessable_entity
      return
    else
      if @exercise.update(started: true)
        render json: @exercise, status: :ok
      else
        render json: { error: "Error al iniciar el examen." }, status: :unprocessable_entity
      end
    end
  end

  def update
    @exercise = Exercise.find(params[:id])

    if @exercise.update(exercise_params)
      render json: @exercise, status: :ok
    else
      render json: { errors: @exercise.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def exercise_params
    params.require(:exercise).permit(
      :task_id,
      marks_attributes: [
        :id,
        :statement_id,
        :mark,
        :_destroy,
        student_entries_attributes: [
          :id,
          :entry_number,
          :entry_date,
          :_destroy,
          student_annotations_attributes: [
            :id,
            :account_id,
            :number,
            :account_number,
            :credit,
            :debit,
            :_destroy,
          ]
        ]
      ]
    )
  end

end