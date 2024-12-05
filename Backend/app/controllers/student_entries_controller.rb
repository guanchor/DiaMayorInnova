class StudentEntriesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource


  def index
    @studentEnties = StudentEntry.all
    render json: @studentEnties
  end

  def show
    @studentEntry = StudentEntry.find(params[:id])
    render @studentEntry
  end

=begin   def create
    @studentEntry = StudentEntry.new(student_entry_params)

    if @studentEntry.save
      render json: @studentEntry, status: :created
    else
      render json: @studentEntry.errors, status: :unprocessable_entity
    end
  end
=end

  def create
    @studentEntry = StudentEntry.create(
      entry_number: params[:entry_number],
      entry_date: params[:entry_date],
      mark_id: params[:mark_id],
    )
    render json: @studentEntry
  end

  def update
    @studentEntry = StudentEntry.find(params[:id])
    if @studentEntry.update(student_entry_params)
      render json: @studentEntry
    else
      render json: @studentEntry.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @studentEnties = StudentEntry.all
    @studentEntry = StudentEntry.find(params[:id])
    @studentEntry.destroy
    render json: @studentEnties
  end

=begin   def student_entry_params
    params.require(:student_entry).permit(:entry_number, :entry_date, :mark)
  end
=end
end