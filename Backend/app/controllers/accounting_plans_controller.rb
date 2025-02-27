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
        @accountingPlan = AccountingPlan.new(accounting_plan_params)

        if @accountingPlan.save
            render json: @accountingPlan, status: :created
        else
            render json: @accountingPlan.errors, status: :unprocessable_entity
        end
    end

    def update 
        @accountingPlan = AccountingPlan.find(params[:id])
        if @accountingPlan.update(accounting_plan_params)
            render json: @accountingPlan
        else
            render json: @accountingPlan.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @accountingPlans = AccountingPlan.all
        @accountingPlan = AccountingPlan.find(params[:id])
        @accountingPlan.destroy
        render json: @accountingPlans
    end

    # 🚀 Ajoute la méthode `accounts` **ICI**, avant `private`
    def accounts_by_PGC
        accounting_plan = AccountingPlan.find_by(id: params[:id])
      
        if accounting_plan
          render json: accounting_plan.accounts, status: :ok
        else
          render json: { error: "Plan comptable non trouvé" }, status: :not_found
        end
    end

    private

    def accounting_plan_params
        params.require(:accounting_plan).permit(:name, :description, :acronym)
    end

end
