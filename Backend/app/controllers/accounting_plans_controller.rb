require 'caxlsx'
require 'roo'

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

  # ✅ Affiche uniquement les comptes du PGC sélectionné
  def accounts_by_PGC
    accounting_plan = AccountingPlan.find_by(id: params[:id])
    
    if accounting_plan
      accounts = Account.where(accounting_plan_id: accounting_plan.id)
      render json: accounts, status: :ok
    else
      render json: { error: "Plan comptable non trouvé" }, status: :not_found
    end
  end

  # ✅ Export XLSX uniquement des comptes du PGC sélectionné
  def export_xlsx_by_pgc
    accounting_plan = AccountingPlan.find_by(id: params[:id])

    if accounting_plan
      accounts = Account.where(accounting_plan_id: accounting_plan.id)

      p = Axlsx::Package.new
      wb = p.workbook

      wb.add_worksheet(name: "Comptes du #{accounting_plan.name}") do |sheet|
        sheet.add_row ["Nom du compte", "Numéro", "Description"]
        accounts.each do |account|
          sheet.add_row [account.name, account.account_number, account.description]
        end
      end

      send_data p.to_stream.read,
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                disposition: "attachment",
                filename: "comptes_#{accounting_plan.acronym}.xlsx"
    else
      render json: { error: "Plan comptable non trouvé" }, status: :not_found
    end
  end

  def import_xlsx
    if params[:file].blank?
        return render json: { error: "Aucun fichier fourni" }, status: :bad_request
    end

    file = params[:file]
    xlsx = Roo::Spreadsheet.open(file.path)

    ActiveRecord::Base.transaction do
        xlsx.sheet(0).each(name: 'Nom', acronym: 'Acronyme', description: 'Description') do |row|
            next if row[:name] == 'Nom' || row[:acronym] == 'Acronyme' # Ignore l'en-tête

            # Crée un nouveau plan comptable
            AccountingPlan.create!(
                name: row[:name],
                acronym: row[:acronym],
                description: row[:description]
            )
        end
    end

    render json: { message: "Importation réussie" }, status: :ok
rescue StandardError => e
    render json: { error: "Erreur lors de l'importation : #{e.message}" }, status: :unprocessable_entity
end

  private

  def accounting_plan_params
    params.require(:accounting_plan).permit(:name, :description, :acronym)
  end

end
