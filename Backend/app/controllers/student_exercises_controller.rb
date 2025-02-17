class StudentExercisesController < ApplicationController
  before_action :authenticate_user!

  def index
    @exercises = Exercise.includes(marks: { student_entries: :student_annotations }).where(user_id: current_user.id)
    render json: @exercises.as_json(
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
  # def student_marks_list
  #   #Array {}
  #   #media inicializar = 0
  #   # task = ""
    

  #     @exercises = Exercise.includes(marks: {}).where(user_id: current_user.id)
  #     render json: @exercises.as_json(
  #       task = task.id(name) # Devolver título de la tarea
  #       include: {
  #         marks: {} # Devuelve la nota de todos los enunciados que forman la tarea
  #       }
  #     )

  #     exercises.each do | exercise |
  #       # bucle de exercise; exercises.each | mark |
  #       # se hace la #media

  #     llamar al metodo private con las variables

    
  # end

  # private

  # def addStudentMark #(user_id, #media, task_id)
  #   #consulta user_id para nombre
  #   #Array.push({"Nombre":  ,"Media": #media})
  # end