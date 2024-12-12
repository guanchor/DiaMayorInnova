class EntriesController < ApplicationController
  def index
    @entries = Entry.all
    render json: @entries
  end
  
  def show
      @entry = Entry.find(params[:id])
      render json: @entry
  end

  def create
      @entry = Entry.create(
          solution_id: params[:solution_id],
          entry_number: params[:entry_number],
          entry_date: params[:entry_date],  
      )
      render json: @entry
  end

  def update
      @entry = Entry.find(params[:id])
      @entry.update(
        solution_id: params[:solution_id],
        entry_number: params[:entry_number],
        entry_date: params[:entry_date],  
      )
      render json: @entry
  end

  def destroy
      @entries = Entry.all
      @entry = Entry.find(params[:id])
      @entry.destroy
      render json: @entries
  end 

end
