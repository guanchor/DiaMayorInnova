class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name , :first_lastName, :second_lastName
=begin   
  attributes :id, :email, :password, :featured_image
=end
  
  def featured_image
    if object.featured_image.attached?
      {
        url: rails_blob_url(object.featured_image)
      }
    end
  end
end