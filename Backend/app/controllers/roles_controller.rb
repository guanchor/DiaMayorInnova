class RolesController < ApplicationController
  before_action :authenticate_user!
  def index
    roles = Role.all
    render json: { roles: roles }, status: :ok
  end
end