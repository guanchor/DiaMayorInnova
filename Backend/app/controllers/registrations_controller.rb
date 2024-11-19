class RegistrationsController < Devise::RegistrationsController
    before_action :ensure_auth_header_present, only: :create

  def create
    featured_image = params[:featured_image]
    email, password = decode_auth_header
    
    if featured_image.present?
      user = User.new(email: email, password: password, featured_image: featured_image)
      if user.save
        json_response "Signed Up Succesfully", true, { user: user, data: featured_image }, :ok
      else
        json_response "Something wrong", false, {}, :unprocessable_entity
      end
    else  
      user = User.new(email: email, password: password)
      if user.save
        json_response "Signed Up Succesfully", true, { user: user}, :ok
      else
        json_response "Something wrong", false, {}, :unprocessable_entity
      end
    end
    
    if user.save
      json_response "Signed Up Succesfully", true, { user: user, data: featured_image }, :ok
    else
      json_response "Something wrong", false, {}, :unprocessable_entity
    end
  end

  private

  def ensure_auth_header_present
    unless request.headers['Authorization'].present?
      json_response "Missing Authorization header", false, {}, :bad_request
    end
  end

  def decode_auth_header
    encoded_credentials = request.headers['Authorization'].to_s.remove("Basic ").strip

    decode_credentials = Base64.decode64(encoded_credentials)

    email, password = decode_credentials.split(":")

    [email, password]
  end
end 