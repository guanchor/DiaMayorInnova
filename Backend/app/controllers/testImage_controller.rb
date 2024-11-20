class testImgController < ApplicationController
  def index
    @posts = testImg.ApplicationController
    render json:@posts
  end
  
  def create
    @testImg = testImg.create(post_params)
  end

  private
  def post_params
    posts.permit(:title, :body, :featured_image)
  end

end