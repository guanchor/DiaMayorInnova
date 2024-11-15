class ClassGroupsController < ApplicationController
    def index
        if params[:module].present?
            @classGroups = ClassGroup.where(module: params[:module])
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
