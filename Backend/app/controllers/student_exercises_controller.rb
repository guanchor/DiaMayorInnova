class StudentExercisesController < ApplicationController
  before_action :authenticate_user!

  def index
    @exercises = Exercise.includes(marks: {student_entries: :student_annotations}).where("user_id = ?", current_user.id)
    render json: @exercises.as_json(
      include: {
        solutions: {
          include: {
            entries: {
              include: :annotations
            }
          }
        }
      } 
    )
  end

  def show 
    @exercise = Exercise.include(marks: {student_entries: :student_annotations}).find(params[:id])
    render json: @exercise.as_json(
      include: {
        solutions: {
          include: {
            entries: {
              include: :annotations
            }
          }
        }
      } 
    )
  end

  def create  
    @exercise = current_user.exercise.build(mark_params)

    process_account_ids(@exercise)

    if @exercise.save 
      render json: @exercise, status: :created
    else  
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end

  


end

=begin
def index
  @exercises = Exercise.where("user_id = ?", current_user.id)

  render json: @exercises
end

def show
    user = User.find(params[:user_id])
    
    # Encuentra el ejercicio del usuario
    exercise = user.exercises.first
    
    if exercise
      # Obtén las notas vinculadas al ejercicio
      marks = exercise.marks

      # Obtén los asientos vinculados a las notas
      entries = marks.map(&:student_entries).flatten

      # Obtén las anotaciones relacionadas con los asientos
      annotations = entries.map(&:student_annotations).flatten

      render json: {
        exercise: exercise,
        marks: marks,
        entries: entries,
        annotations: annotations
      }
    else
      render json: { error: "No exercise found for user" }, status: :not_found
    end
  end

  def create
    user = User.find(params[:user_id])

    # Crea un nuevo ejercicio para el usuario
    exercise = user.exercises.build(task_id: params[:task_id])

    if exercise.save
      # Crea las marcas relacionadas
      params[:marks].each do |mark_params|
        mark = exercise.marks.build(score: mark_params[:score])

        if mark.save
          # Crea los asientos relacionados
          mark_params[:student_entries].each do |entry_params|
            entry = mark.student_entries.build(description: entry_params[:description])

            if entry.save
              # Crea las anotaciones relacionadas
              entry_params[:student_annotations].each do |annotation_params|
                entry.student_annotations.create(content: annotation_params[:content])
              end
            end
          end
        end
      end

      render json: { message: "Exercise and related data created successfully!" }, status: :created
    else
      render json: { error: exercise.errors.full_messages }, status: :unprocessable_entity
    end
  end
=end
