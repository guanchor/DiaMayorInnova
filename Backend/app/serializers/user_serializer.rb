class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :email, :password, :name, :first_lastName, :second_lastName, :featured_image, :roles
  
  def roles
    object.roles.pluck(:name)
  end

  def featured_image
    if object.featured_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(object.featured_image, only_path: true)
    else
      nil
    end
  end
end