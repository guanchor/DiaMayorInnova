class AnnotationsController < ApplicationController
  def index
    @annotations = Annotation.all
    render json: @annotations
  end
  
  def show
      @annotation = Annotation.find(params[:id])
      render json: @annotation
  end

  def create
      @annotation = Annotation.create(
          entry_id: params[:entry_id],
          number: params[:number],
          credit: params[:credit],
          debit: params[:debit],
      )
      render json: @annotation
  end

  def update
      @annotation = Annotation.find(params[:id])
      @annotation.update(
        entry_id: params[:entry_id],
        number: params[:number],
        credit: params[:credit],
        debit: params[:debit],
      )
      render json: @annotation
  end

  def destroy
      @annotations = Annotation.all
      @annotation = Annotation.find(params[:id])
      @annotation.destroy
      render json: @annotations
  end

end
