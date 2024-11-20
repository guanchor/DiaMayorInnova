class SessionsController < Devise::SessionsController
  before_action :valid_token, only: :destroy
  before_action :authenticate_with_basic_auth, only: :create
  skip_before_action :verify_signed_out_user, only: :destroy

  def create
    if params[:user].present? && params[:user][:authentication_token].present?
      authenticate_with_token
    else
      json_response("Missing parameters or token", false, {}, :bad_request)
    end
  end

  def destroy
    sign_out @user
    @user.generate_new_authentication_token
    json_response "Log Out Succesfully", true, {}, :ok
  end

  private

  def authenticate_with_basic_auth
    auth_header = request.headers['Authorization']

    if auth_header.present? && auth_header.start_with?('Basic ')
      credentials = auth_header.split(' ').last
      decoded_credentials = Base64.decode64(credentials).split(':')
      email = decoded_credentials[0]
      password = decoded_credentials[1]

      user = User.find_by(email: email)

      if user && user.valid_password?(password)
        sign_in(user)
        json_response("Signed In Successfully", true, { user: user_with_image(user), token: user.authentication_token }, :ok)
      else
        json_response("Invalid credentials", false, {}, :unauthorized)
      end
    else
      json_response("Missing or invalid authorization header", false, {}, :bad_request)
    end
  end

  def authenticate_with_token
    user = User.find_by(authentication_token: params[:user][:authentication_token])

    if user
      sign_in(user)
      json_response("Signed In Successfully", true, { user: user }, :ok)
    else
      json_response("Invalid or expired authentication token", false, {}, :unauthorized)
    end
  end

  def valid_token
    @user = User.find_by authentication_token: request.headers["AUTH-TOKEN"]
    if @user
      return @user
    else
      json_response "Invalid Token", false, {}, :not_found
    end
  end
  def user_with_image(user)
    user_data = user.as_json

    if user.featured_image.attached?
      user_data[:featured_image] = rails_blob_url(user.featured_image, only_path: true)
    else
      user_data[:featured_image] = nil
    end
    return user_data
  end
end