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
        @classGroup = ClassGroup.create(
            course: params[:course],
            module: params[:module],
            modality: params[:modality],
            number_students: params[:number_students],
            max_students: params[:max_students],
            location: params[:location],
            weekly_hours: params[:weekly_hours]
        )
        render json: @classGroup
    end

    def update
        @classGroup = ClassGroup.find(params[:id])
        @classGroup.update(
            course: params[:course],
            module: params[:module],
            modality: params[:modality],
            number_students: params[:number_students],
            max_students: params[:max_students],
            location: params[:location],
            weekly_hours: params[:weekly_hours]
        )
        render json: @classGroup
    end

    def destroy
        @classGroups = ClassGroup.all
        @classGroup = ClassGroup.find(params[:id])
        @classGroup.destroy
        render json: @classGroups
    end
end
