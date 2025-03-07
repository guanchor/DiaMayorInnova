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

    # CSV files methods
    require 'csv'

    def export_csv
        accounting_plan = AccountingPlan.find(params[:id])

        if accounting_plan.nil?
            render json: @accountingPlan.errors, status: :not_found
        end

        begin
            temp_file = Tempfile.new(["pgc_#{accounting_plan.acronym}", ".csv"])

            CSV.open(temp_file.path, "w", col_sep: ";") do |csv|
                csv << ["ID", "Nombre", "Acronimo", "Descripcion"] # PGC headers
                csv << [accounting_plan.id, accounting_plan.name, accounting_plan.acronym, accounting_plan.description]

                csv << [] # Space

                csv << ["Numero cuenta", "Nombre", "Descripcion"] # Accounts headers
                accounting_plan.accounts.each do |account|
                    csv << [account.account_number, account.name, account.description]
                end
            end

            # Show temp file and data
            # Rails.logger.info "Archivo generado en: #{temp_file.path}"
            # Rails.logger.info "Contenido del archivo: #{File.read(temp_file.path)}"

            send_file temp_file.path, type: "text/csv; charset=utf-8", disposition: "attachment" # Download file from browser

        ensure # Always run, no matter what
            temp_file.close
            temp_file.unlink # Delete temp file
        end
    end


    def import_csv
        file = params[:file]

        if file.blank?
            render json: @accountingPlan.errors, status: :unprocessable_entity
        end

        begin
            CSV.foreach(file.path, headers: true, col_sep: ";") do |pgc|
                AccountingPlan.create(
                    name: pgc["Nombre"],
                    acronym: pgc["Acronimo"],
                    description: pgc["Descripcion"]
                )
            end

            render json: { message: "Archivo importado con éxito"}, status: :ok

        rescue
            render json: @accountingPlan.errors, status: :unprocessable_entity
        end
    end


    # Filter accounts by Accounting Plan
    def accounts_by_PGC
        accounting_plan = AccountingPlan.find_by(id: params[:id])
      
        if accounting_plan
          render json: accounting_plan.accounts, status: :ok
        else
          render json: { error: "PGC no encontrado" }, status: :not_found
        end
    end

    private

    def accounting_plan_params
        params.require(:accounting_plan).permit(:name, :description, :acronym)
    end

end
