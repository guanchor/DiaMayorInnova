class TokensController < ApplicationController

  def validate_token
    
    token = request.headers["AUTH-TOKEN"]

    @user = User.find_by(authentication_token: token)

    if @user
      json_response("Token validado exitosamente", true, { user: user_with_image(user), token: user.authentication_token, roles: user.roles.pluck(:name) }, :ok)
    else
      json_response("Token inválido", false, {}, :unauthorized)
    end
  end
end