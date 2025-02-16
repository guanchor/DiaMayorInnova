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
    @exercises = Exercise
      .includes(:task, :marks, user: :class_group) # Cargamos Task, Marks y la relación con el estudiante
      .joins(task: { user: :teacher_class_groups }) # Unimos con los TeacherClassGroups del profesor actual
      .where(teacher_class_groups: { user_id: current_user.id }) # Filtramos por el profesor actual
  
    result = @exercises.map do |exercise|
      task = exercise.task 
      student = exercise.user 
      avMark = exercise.marks.average(:mark).to_f
  
      {
        task: task.title,
        student: student.name, 
        mark: avMark
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