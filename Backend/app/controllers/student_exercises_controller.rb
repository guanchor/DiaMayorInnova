class StudentExercisesController < ApplicationController
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

end
