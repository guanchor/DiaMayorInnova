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
  
=begin     def create
      @studentAnnotation = StudentAnnotation.new(student_annotations_params)
      logger.debug "ayudaaaaa #{@studentAnnotation.atributes.inspect}"
  
      if @studentAnnotation.save
        render json: @studentAnnotation, status: :created
      else
        render json: @studentAnnotation.errors, status: :unprocessable_entity
      end
    end
=end
  
    def create
      @studentAnnotation = StudentAnnotation.create(
        account_id: params[:account_id],
        number: params[:number],
        account_number: params[:account_number],
        credit: params[:credit],
        debit: params[:debit],
        student_entry_id: params[:student_entry_id],
      )
      render json: @studentAnnotation
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

=begin     def student_annotations_params
      params.require(:student_annotation).permit(:number, :account_number, :credit, :debit, :entry_id, :account_id)
    end
=end
  end