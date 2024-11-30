class ClassGroupsController < ApplicationController
    before_action :authenticate_user!
    # Esto protege las rutas de 'show', 'index', 'create', 'update', 'destroy'
    load_and_authorize_resource

    def index
        Rails.logger.debug "Current User: #{current_user.inspect}"
        
        if params[:module].present?
            @classGroups = ClassGroup.where("module LIKE ?", "%#{params[:module]}%")
        else
            @classGroups = ClassGroup.all
        end
        render json: @classGroups
    end
    
    def show
        @classGroup = ClassGroup.find(params[:id])
        render json: @classGroup
    end

    def create
        @classGroup = ClassGroup.new(class_group_params)

        if @classGroup.save
            render json: @classGroup, status: :created
        else
            render json: @classGroup.errors, status: :unprocessable_entity
        end
    end

    def update
        @classGroup = ClassGroup.find(params[:id])
        if @classGroup.update(class_group_params)
            render json: @classGroup
        else
            render json: @classGroup.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @classGroup = ClassGroup.find(params[:id])
        @classGroup.destroy
            render json: { message: 'Grupo de clase eliminado con éxito' }, status: :ok
    end

    private

    # Método para manejar los parámetros permitidos usando strong parameters
    def class_group_params
        params.require(:class_group).permit(:course, :module, :modality, :number_students, :max_students, :location, :weekly_hours)
    end
end
