class ApplicationController < ActionController::API
  before_action :authenticate_user!

  # Este método valida el token en cada solicitud
  def authenticate_user!
    token = request.headers['AUTH-TOKEN']
    user = User.find_by(authentication_token: token)
    
    if user
      @current_user = user
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  # Método auxiliar para obtener el usuario actual
  def current_user
    @current_user
  end

    include Response

    # Este código se asegura de manejar las excepciones de CanCanCan
    rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, alert: exception.message
  end
end
