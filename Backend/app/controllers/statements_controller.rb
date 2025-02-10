class StatementsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_statement, only: [:show, :update, :destroy, :get_solutions, :add_solution]
  before_action :authorize_statement, only: [:show, :update, :destroy, :get_solutions, :add_solution]

  def index
    if current_user.student?
      render json: { error: "No autorizado" }, status: :forbidden
    else
      @statements = if current_user.admin?
        Statement.includes(solutions: { entries: :annotations })
          else
            Statement.includes(solutions: { entries: :annotations }).where("is_public = ? OR user_id = ?", true, current_user.id)
          end
        render json: @statements.as_json(
          include: {
            solutions: {
              include: {
                entries: {
                  include: {
                    annotations: {
                      order: :number
                    }
                  }
                }
              }
            }
          }
        )
    end
  end

  def show
    render json: @statement.as_json(
      include: {
        solutions: {
          include: {
            entries: {
              include: {
                annotations: {
                  order: :number
                }
              }
            }
          }
        } 
      }
    )
  end

  def create
    if current_user.student?
      render json: { error: "No autorizado" }, status: :forbidden
    else
      @statement = current_user.statements.build(statement_params)
      process_account_ids(@statement)

      if @statement.save
        render json: @statement, status: :created
      else
        render json: @statement.errors, status: :unprocessable_entity
      end
    end
  end

  def get_solutions
    solutions = @statement.solutions.includes(entries: :annotations)
    render json: solutions.as_json(
      include: {
        entries: {
          include: {
            annotations: {
              order: :number
            }
          }
        }
      }
    )
  end

  def add_solution
    @solution = @statement.solutions.create(solution_params)
    process_account_ids_in_solution(@solution) #comprobar 

    if @solution.save
      if params[:entries]
        params[:entries].each do |entry_params|
          entry = @solution.entries.create(entry_params)
          if entry.save && entry_params[:annotations]
            entry_params[:annotations].each do |annotation_params|
              entry.annotations.create(annotation_params)
            end
          end
        end
      end
      render json: @solution, status: :created
    else
      render json: @solution.errors, status: :unprocessable_entity
    end
  end

  def update
    Rails.logger.debug "Params received in update: #{params[:statement].inspect}"
    if @statement.user_id == current_user.id || current_user.admin?
      if @statement.update(statement_params)
        update_solutions_and_entries
        process_account_ids(@statement)
    
        if @statement.errors.any?
          render json: @statement.errors, status: :unprocessable_entity
        else
          render json: @statement, status: :ok
        end
      else
        render json: @statement.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "No autorizado" }, status: :forbidden
    end
  end

  def destroy
    if @statement.user_id == current_user.id || current_user.admin?
      @statement.solutions.destroy_all
      if @statement.destroy
        render json: { message: "Enunciado eliminado"}, status: :ok
      else
        render json: { error: "No se pudo eliminar el enunciado" }, status: :unprocessable_entity
      end
    else
      render json: { error: "No autorizado" }, status: :forbidden
    end
  end

  private

  def authorize_statement
    if current_user.student?
      render json: { error: "No autorizado" }, status: :forbidden
    elsif current_user.admin? || (current_user.teacher? && (@statement.user_id == current_user.id || @statement.is_public))
      return true #si falla esto, quitar el return y dejar solo true
    else
      render json: { error: "No autorizado" }, status: :forbidden
    end
  end

  def statement_params
    Rails.logger.debug "Params received: #{params[:statement].inspect}"
    params.require(:statement).permit(
      :definition, 
      :explanation, 
      :is_public,
      solutions_attributes: [
        :id,
        :description,
        :_destroy,
        entries_attributes: [
          :id,
          :entry_number,
          :entry_date,
          :_destroy,
          annotations_attributes: [
            :id,
            :number,
            :credit,
            :debit,
            :account_number,
            :_destroy
          ]
        ]
      ]
    )
  end

  def solution_params
    params.require(:solution).permit(
    :description, :_destroy, # Debes permitir el atributo _destroy aquí también
    entries_attributes: [
      :id,
      :entry_number,
      :entry_date,
      :_destroy,
      annotations_attributes: [
        :id,
        :number,
        :credit,
        :debit,
        :account_number,
        :_destroy
      ]
    ]
  )
  end

  def set_statement
    @statement = Statement.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Statement not found' }, status: :not_found
  end

  def process_account_ids(resource)
    solutions = resource.is_a?(Statement) ? resource.solutions : [resource]
    has_errors = false

    solutions.each do |solution|
      solution.entries.each do |entry|
        entry.annotations.each do |annotation|
          Rails.logger.debug "Account number: #{annotation.account_number}"
          
          if annotation.account_number.present?
            account = Account.find_by(account_number: annotation.account_number)
            
            if account
              annotation.account_id = account.id if annotation.account_id.nil? || annotation.account_id != account.id
              Rails.logger.debug "Assigned account_id: #{annotation.account_id}"
              unless annotation.save
                Rails.logger.debug "Error al guardar la anotación: #{annotation.errors.full_messages}"
                has_errors = true
              end
            else
              annotation.errors.add(:account_number, "no válido o no encontrado")
              has_errors = true
            end
          else
            annotation.errors.add(:account_number, "es obligatorio")
            has_errors = true
          end
        end
      end
    end

    if has_errors
      raise ActiveRecord::RecordInvalid, "Una o más anotaciones tienen errores y no se pueden guardar."
    end
  end

  def update_solutions_and_entries
    if statement_params[:solutions_attributes].present?
      statement_params[:solutions_attributes].each do |solution_attr|
        if solution_attr[:id].present?
          solution = @statement.solutions.find_by(id: solution_attr[:id])
          if solution
            if solution_attr[:_destroy] == "1" || solution_attr[:_destroy] == true
              solution.destroy
            else
              solution.update(solution_attr.except(:_destroy).permit(:description))
  
              if solution_attr[:entries_attributes].present?
                solution_attr[:entries_attributes].each do |entry_attr|
                  if entry_attr[:id].present?
                    entry = solution.entries.find_by(id: entry_attr[:id])
                    if entry
                      if entry_attr[:_destroy] == "1" || entry_attr[:_destroy] == true
                        entry.destroy
                      else
                        entry.update(entry_attr.except(:_destroy).permit(:entry_number, :entry_date))
  
                      if entry_attr[:annotations_attributes].present?
                        entry_attr[:annotations_attributes].each do |annotation_attr|
                          if annotation_attr[:id].present?
                            annotation = entry.annotations.find_by(id: annotation_attr[:id])
                            if annotation_attr[:_destroy] == "1" || annotation_attr[:_destroy] == true
                              annotation.destroy
                            else
                              annotation.update(annotation_attr.except(:_destroy).permit(:number, :credit, :debit, :account_number))
                            end
                          else
                            entry.annotations.create(annotation_attr.except(:_destroy).permit(:number, :credit, :debit, :account_number))
                          end
                        end
                      end
                    end
                  end
                else
                  entry = solution.entries.create(entry_attr.except(:_destroy).permit(:entry_number, :entry_date))
                end
              end
            end
          end
        end
      else
        unless solution_attr[:_destroy] == "1" || solution_attr[:_destroy] == true
          solution = @statement.solutions.create(solution_attr.except(:_destroy).permit(:description))
        end
      end
    end
  end
end
end