class MarksController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

    def index
      @marks = Mark.all
      render json: @marks
    end
  
    def show
      @mark = Mark.find(params[:id])
      render @mark
    end
  
    def create
      @mark = Mark.new(mark_params)
  
      if @mark.save
        render json: @mark, status: :created
      else
        render json: @mark.errors, status: :unprocessable_entity
      end
    end
  
    def update
      @mark = Mark.find(params[:id])
      if @mark.update(mark_params)
        render json: @mark
      else
        render json: @mark.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @marks = Mark.all
      @mark = Mark.find(params[:id])
      @mark.destroy
      render json: @marks
    end

    def mark_params
      params.require(:mark).permit(:mark)
    end
end