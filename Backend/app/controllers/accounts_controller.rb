class AccountsController < ApplicationController
  def index
    @accounts = Account.all
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

  def find_by_account_number
    @account = Account.find_by(account_number: params[:account_number])
    if @account
      render json: { account_id: @account.id }
    else
      render json: { error: "Cuenta no encontrada" }, status: :not_found
    end
  end
  
end