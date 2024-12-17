class Admin::UsersController < ApplicationController
  before_action :authenticate_admin!


  def index
    @users = User.includes(:roles).all
    render json: @users, each_serializer: UserSerializer
  end

  def show
    @user = User.find(params[:id])
    render json: @user, each_serializer: UserSerializer
  end

  def update
    logger.debug "ANTES DE BUSCAR AL USUARIO"
    @user = User.find(params[:id])
    
    logger.debug "ANTES DE COMPROBAR IMAGEN"
    if params[:featured_image].present?
      @user.featured_image.attach(params[:featured_image])
    end

    logger.debug "ANTES DE ASIGNAR PARAMETROS"
    @user.assign_attributes(user_params)
    
    logger.debug "QUE ROOOOOOOOOOLEEEEEEES"
    if params[:user][:roles].present?
      set_roles
    end

    ActiveRecord::Base.transaction do
      logger.debug "Roles antes de guardar: #{@user.roles.pluck(:name)}"
      if @user.save
        user_data = @user.as_json

        user_data[:roles] = @user.roles.pluck(:name)

        if @user.featured_image.attached?
          user_data[:featured_image] = { url: rails_blob_url(@user.featured_image, only_path: true) }
        else
          user_data[:featured_image] = nil
        end

        json_response "User updated successfully", true, { user: user_data }, :ok
      else
        raise ActiveRecord::Rollback
      end
    end
  rescue StandardError => e
    json_response "Error", false, { error: e.message }, :unprocessable_entity
  end

  def destroy
    user = User.find(params[:id])

    if user.destroy
      render json: { notice: 'User has been successfully deleted.' }
      # redirect_to admin_users_path, notice: 'User has been successfully deleted.'
    else
      render json: { alert: 'Failed to delete user.' }, status: :unprocessable_entity
      # redirect_to admin_users_path, alert: 'Failed to delete user.'
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
      :name,
      :first_lastName,
      :second_lastName,
      roles: []
    )
  end

  def set_roles
    roles = params[:user][:roles]

    @user.roles.clear if roles.any?

    roles.each do |role_name|
      role = Role.find_by(name: role_name)
      logger.debug "QUE ROOOOOOOOOOL ERES !!!!: #{role}"
      if role
        logger.debug "Asignando rol: #{role.name} (ID: #{role.id})"
        @user.roles << role  # Asignar el rol al usuario
      else
        logger.error("Rol '#{role_name}' no encontrado")
      end
    end
  end
end