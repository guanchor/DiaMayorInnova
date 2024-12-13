class AccountsController < ApplicationController
  def index
    if params[:accountNumber].present?
      @accounts = Account.where("accountNumber LIKE ?", "%#{params[:accountNumber]}%")
    else
      @accounts = Account.all
    end 
    render json: @accounts
  end

  def show
    @account = Account.find(params[:id])
    render json: @account
  end

  def create
    @account = Account.create(
      accountNumber: params[:accountNumber],
      description: params[:description],
      name: params[:name],
      accounting_plan_id: params[:accounting_plan_id], #accounting plan id
      
    )
    render json: @account
  end

  def update
    @account = Account.find(params[:id])
    @account.update(
      accountNumber: params[:accountNumber],
      description: params[:description],
      name: params[:name],
      accounting_plan_id: params[:accounting_plan_id], #accounting plan id
      
    )
    render json: @account
  end

  def destroy
    @accounts = Account.all
    @account = Account.find(params[:id])
    @account.destroy
    render json: @accounts
  end
end