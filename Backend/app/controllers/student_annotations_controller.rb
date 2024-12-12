class StudentAnnotationsController < ApplicationController
  before_action :authenticate_user!


    def index
      if params[:student_entry_id].present?
        @studentAnnotations = StudentAnnotation.where(student_entry_id: params[:student_entry_id])
  
      else
        @studentAnnotations  = StudentAnnotation.all
      end
      
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
      params.require(:student_annotation).permit(:account_id, :number, :account_number, :debit, :credit, :student_entry_id)
    end

  end