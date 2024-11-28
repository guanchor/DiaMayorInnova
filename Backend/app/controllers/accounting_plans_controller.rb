class AccountingPlansController < ApplicationController
    before_action :authenticate_user!
    load_and_authorize_resource
    
    def index
        if params[:name].present?
            @accountingPlans = AccountingPlan.where("name LIKE ?", "%#{params[:name]}%")
        else
            @accountingPlans = AccountingPlan.all
        end
        render json: @accountingPlans
    end

    def show
        @accountingPlan = AccountingPlan.find(params[:id])
        render json: @accountingPlan
    end

    def create
        @accountingPlan = AccountingPlan.create(
            name: params[:name],
            description: params[:description],
            acronym: params[:acronym],
        )
        render json: @accountingPlan
    end

    def update 
        @accountingPlan = AccountingPlan.find(params[:id])
        @accountingPlan.update(
            name: params[:name],
            description: params[:description],
            acronym: params[:acronym]
        )
        render json: @accountingPlan
    end

    def destroy
        @accountingPlans = AccountingPlan.all
        @accountingPlan = AccountingPlan.find(params[:id])
        @accountingPlan.destroy
        render json: @accountingPlans
    end
end
