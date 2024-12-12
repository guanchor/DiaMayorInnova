class HelpExamplesController < ApplicationController
  def index
    @helpExamples = HelpExample.all
    render json: @helpExamples
  end

  def show
    @helpExample = HelpExample.find(params[:id])
    render json: @helpExample
  end

  def create
    @helpExample = HelpExample.create(
      creditMoves: params[:creditMoves],
      debitMoves: params[:debitMoves],
      account_id: params[:account_id],
      description: params[:description]
    )
    render json: @helpExample
  end

  def update
    @helpExample = HelpExample.find(params[:id])
    @helpExample.update(
      creditMoves: params[:creditMoves],
      debitMoves: params[:debitMoves],
      account_id: params[:account_id],
      description: params[:description]
    )
    render json: @helpExample
  end

  def destroy
    @helpExamples = HelpExample.all
    @helpExample = HelpExample.find(params[:id])
    @helpExample.destroy
    render json: @helpExamples
  end
end