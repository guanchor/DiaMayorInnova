class RegistrationsController < Devise::RegistrationsController
    skip_before_action :authenticate_user!, only: [:create]
    before_action :ensure_auth_header_present, only: :create
    before_action :ensure_admin_user, only: :create

  def new
    super
  end

  def index
    @users = User.all
    render json: @users
  end

  def create

    current_user = User.find_by(authentication_token: request.headers['AUTH-TOKEN'])

    email = params[:email]
    password = params[:password]
    featured_image = params[:featured_image]
    roles = JSON.parse(params[:roles]) rescue []
    
    user = User.new(email: email, password: password)

    if featured_image.present?
      user.featured_image = featured_image
    end

    user.name = params[:name]
    user.first_lastName = params[:first_lastName]
    user.second_lastName = params[:second_lastName]

    if user.save
      roles.each do |role_name|
        role = Role.find_by(name: role_name)
        user.roles << role if role
      end

      user_data = user.as_json
      if user.featured_image.attached?
        user_data[:featured_image] = { url: rails_blob_url(user.featured_image, only_path: true) }
      else
        user_data[:featured_image] = nil
      end
      json_response "Signed Up Succesfully", true, { user: user_data}, :ok
    else
      json_response "Validation Error", false, { errors: user.errors.full_messages }, :unprocessable_entity
    end
  end

  private

  def ensure_admin_user
    token = request.headers['AUTH-TOKEN']
    current_user = User.find_by(authentication_token: token)
    unless current_user&.has_role?(:admin)
      json_response "Unauthorized", false, {}, :unauthorized
    end
  end

  def ensure_auth_header_present
    unless request.headers['Authorization'].present? || request.headers['AUTH-TOKEN'].present?
      json_response "Missing Authorization header", false, {}, :bad_request
    end
  end

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name, :first_lastName, :second_lastName, :featured_image, roles: [])
  end
end 