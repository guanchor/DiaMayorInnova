require 'rails_helper'

describe AccountingPlansController do

    #Factories
    let(:admin_user) { create(:admin_user) } # Crear el usuario
    let(:accounting_plan) { create(:accounting_plan) } # Crear PGC

    #Autenticación
    before do
        request.headers['AUTH-TOKEN'] = admin_user.authentication_token
    end

    #Tests
    describe "GET /index" do
        it "devolver todos los PGC" do
            accounting_plans = create_list(:accounting_plan, 3)
            get :index

            expect(response).to have_http_status(:ok)
        end

        it "filtrar por nombre" do
            plan_a = create(:accounting_plan, name: "Plan A")
            get :index, params: { name: "Plan A" }

            expect(response).to have_http_status(:ok)
        end
    end


    describe "GET show" do
        it "devolver un PGC existente" do
            get :show, params: { id: accounting_plan.id }

            expect(response).to have_http_status(:ok)
        end
    end


    describe "POST create" do 
        it "crear nuevo PGC" do
            newPGC = { accounting_plan: {name: "Nuevo PGC", description: "Desc nueva", acronym: "NP"} }
            post :create, params: newPGC

            expect(response).to have_http_status(:created)
        end

        it "error 422, datos no válidos" do
            newPGC = { accounting_plan: { name: ""} } # Campo vacío, CAMBIOS EN EL MODELO 
            post :create, params: newPGC

            expect(response).to have_http_status(:unprocessable_entity)
        end
    end


    describe "PATCH update" do
        it "actualizar PGC existente" do
            newInfo = { id: accounting_plan.id, accounting_plan: { name: "Actualizadooo"} }
            patch :update, params: newInfo

            expect(response).to have_http_status(:success)
        end

        it "error 422, datos no válidos" do
            newInfo = { id: accounting_plan.id, accounting_plan: { name: ""} }
            patch :update, params: newInfo

            expect(response).to have_http_status(:unprocessable_entity)
        end          
    end


    describe "DELETE destroy" do
        it "eliminar PGC" do
            accounting_plan # Crear PGC para el test
            delete :destroy, params: {id: accounting_plan.id}

            expect(response).to have_http_status(:success)
        end
    end
end
