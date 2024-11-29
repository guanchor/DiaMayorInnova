class SolutionsController < ApplicationController
  def index
    @solutions = Solution.all
    render json: @solutions
  end
  
  def show
      @solution = Solution.find(params[:id])
      render json: @solution
  end

  def create
      @solution = Solution.create(
          description: params[:description],
      )
      render json: @solution
  end

  def update
      @solution = Solution.find(params[:id])
      @solution.update(
        description: params[:description],
      )
      render json: @solution
  end

  def destroy
      @solutions = Solution.all
      @solution = Solution.find(params[:id])
      @solution.destroy
      render json: @solutions
  end 

end
