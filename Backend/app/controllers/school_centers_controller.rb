class SchoolCentersController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    if params[:school_name].present?
      @schools = SchoolCenter.where("school_name LIKE ?", "%#{params[:school_name]}%")
    else
      @schools = SchoolCenter.all
    end
    render json: @schools
  end

  def show
    @school = SchoolCenter.find(params[:id])
    render @school
  end

  def create
    @school = SchoolCenter.create(
      school_name: params[:school_name],
      address: params[:address],
      phone: params[:phone],
      email: params[:email],
      website: params[:website],
      province: params[:province],
    )
  render json: @school
  end

  def update
    @school = SchoolCenter.find(params[:id])
    @school.update(
      school_name: params[:school_name],
      address: params[:address],
      phone: params[:phone],
      email: params[:email],
      website: params[:website],
      province: params[:province]
    )
    render json: @school
    end

  def destroy
    @schools = SchoolCenter.all
    @school = SchoolCenter.find(params[:id])
    @school.destroy
    render json: @schools
  end
end
