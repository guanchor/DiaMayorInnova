class AccountingPlansController < ApplicationController
    def index
        @accountingPlans = AccountingPlan.all
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
