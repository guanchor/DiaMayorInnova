class StudentAnnotationsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  
    def index
      @studentAnnotations = StudentAnnotation.all
      render json: @studentAnnotations
    end
  
    def show
      @studentAnnotation = StudentAnnotation.find(params[:id])
      render @studentAnnotation
    end
  
    def create
      @studentAnnotation = StudentAnnotation.new(student_annotations_params)
  
      if @studentAnnotation.save
        render json: @studentAnnotation, status: :created
      else
        render json: @studentAnnotation.errors, status: :unprocessable_entity
      end
    end
  
    def update
      @studentAnnotation = StudentAnnotation.find(params[:id])
      if @studentAnnotation.update(student_annotations_params)
        render json: @studentAnnotation
      else
        render json: @studentAnnotation.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @studentAnnotations = StudentAnnotation.all
      @studentAnnotation = StudentAnnotation.find(params[:id])
      @studentAnnotation.destroy
      render json: @studentAnnotations
    end

    def student_annotations_params
      params.require(:student_annotation).permit(:number, :account_number, :credit, :debit, :entry_id, :account_id)
    end
  end