class StatementsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_statement, only: [:show, :update, :destroy, :get_solutions, :add_solution] #He añadido esto para QUITARLO SI FALLA

  def index
    @statements = Statement.includes(solutions: { entries: :annotations }).where("is_public = ? OR user_id = ?", true, current_user.id)
    render json: @statements.as_json(
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
    @statement = Statement.includes(solutions: { entries: :annotations }).find(params[:id])
    render json: @statement.as_json(
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
    @statement = current_user.statements.build(statement_params)

    process_account_ids(@statement)

    if @statement.save
      render json: @statement, status: :created
    else
      render json: @statement.errors, status: :unprocessable_entity
    end
  end

  def get_solutions
    solutions = @statement.solutions.includes(entries: :annotations)
    render json: solutions.as_json(
      include: {
        entries: {
          include: :annotations
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
    Rails.logger.debug "Actualizando el enunciado con los parámetros: #{params.inspect}"
    
    if @statement.user_id == current_user.id
      process_account_ids(@statement)
      Rails.logger.debug "Errores después de procesar cuentas: #{@statement.errors.full_messages}"
    
      if @statement.errors.any?
        render json: @statement.errors, status: :unprocessable_entity
      elsif @statement.update(statement_params)
        render json: @statement
      else
        Rails.logger.debug "Errores al actualizar el enunciado: #{@statement.errors.full_messages}"
        render json: @statement.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "No autorizado" }, status: :forbidden
    end
  end

  def destroy
    if @statement.user_id == current_user.id
      @statement.solutions.destroy_all
      Rails.logger.debug "Eliminando el enunciado con ID #{@statement.id}."
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

  def statement_params
    params.require(:statement).permit(
    :definition, 
    :explanation, 
    :is_public,
    solutions_attributes: [
      :id,
      :description,
      entries_attributes: [
        :id,
        :entry_number,
        :entry_date,
        annotations_attributes: [
          :id,
          :number,
          :credit,
          :debit,
          :account_number
        ]
      ]
    ]
  )
  end

  def solution_params
    params.require(:solution).permit(:content)
  end

  def set_statement
    @statement = Statement.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Statement not found' }, status: :not_found
  end

  def process_account_ids(statement)
    statement.solutions.each do |solution|
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
              end
            else
              annotation.errors.add(:account_number, "no válido o no encontrado")
            end
          else
            annotation.errors.add(:account_number, "es obligatorio")
          end
        end
      end
    end
  end
end