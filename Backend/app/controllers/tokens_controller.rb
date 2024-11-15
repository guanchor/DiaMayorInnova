class TokensController < ApplicationController

  def validate_token
    
    token = request.headers["AUTH-TOKEN"]

    @user = User.find_by(authentication_token: token)

    if @user
      json_response("Token validado exitosamente", true, { user: @user }, :ok)
    else
      json_response("Token inválido", false, {}, :unauthorized)
    end
  end
end