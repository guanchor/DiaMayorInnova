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
        describe "devolver todos los PGC" do
            before do
                accounting_plans = create_list(:accounting_plan, 3)
                get :index
            end

            it { expect(response).to have_http_status(:ok) }

        end

        describe "filtrar por nombre" do
            before do
                plan_a = create(:accounting_plan, name: "Plan A")
                get :index, params: { name: "Plan A" }
            end

            it { expect(response).to have_http_status(:ok) }
        end
    end


    describe "GET show" do
        describe "devolver un PGC existente" do
            before do
                get :show, params: { id: accounting_plan.id }
            end

            it { expect(response).to have_http_status(:ok) }
        end
    end


    describe "POST create" do
        describe "crear nuevo  PGC" do
            before do
                newPGC = { accounting_plan: {name: "Nuevo PGC", description: "Desc nueva", acronym: "NP"} }
                post :create, params: newPGC
            end

            it { expect(response).to have_http_status(:created) }
        end

        describe "error 422, datos no válidos" do
            before do
                newPGC = { accounting_plan: { name: ""} }
                post :create, params: newPGC
            end

            it { expect(response).to have_http_status(:unprocessable_entity) }
        end
    end


    describe "PUT update" do
        describe "actualizar PGC existente" do
            before do
                newInfo = { id: accounting_plan.id, accounting_plan: { name: "Actualizadooo"} }
                put :update, params: newInfo
            end

            it { expect(response).to have_http_status(:success) }
        end

        describe "error 422, datos no válidos" do
            before do
                newInfo = { id: accounting_plan.id, accounting_plan: { name: ""} }
                put :update, params: newInfo
            end

            it { expect(response).to have_http_status(:unprocessable_entity) }   
        end          
    end


    describe "DELETE destroy" do
        describe "eliminar PGC" do
            before do
                accounting_plan # Crear PGC para el test
                delete :destroy, params: {id: accounting_plan.id}
            end

            it { expect(response).to have_http_status(:success) }
        end
    end
end
