require 'rails_helper'

describe AccountsController do

  #Factories
  let(:admin_user) { create(:admin_user) } # Crear el usuario
  let(:account) { create(:account) } # Crear cuenta
  let(:accounting_plan) { create(:accounting_plan)} # Crear PGC para el test de 'POST' donde se crea una cuenta manualmente

  #Autenticación
  before do
      request.headers['AUTH-TOKEN'] = admin_user.authentication_token
  end

  #Tests
  describe "GET index" do
    describe "devuelve las cuentas existentes" do
      before do
        account = create(:account)
        get :index
      end

      it { expect(response).to have_http_status(:ok) }
    end

    describe "devuelve una cuenta filtrada por nombre" do
      before do
        account = create(:account, name: "Test Account")
        get :index, params: { name: "Test" }
      end

      it { expect(response).to have_http_status(:ok) }
    end
  end


  describe "GET show" do
    describe "devuelve una cuenta existente" do
      before do
        get :show, params: {id: account.id}
      end

      it { expect(response).to have_http_status(:ok) }
    end
  end


  describe "POST create" do
    describe "crea una cuenta nueva" do
      before do
        newAcc = { account: { name: "Test Account", account_number: "999", description: "Test description",  accounting_plan_id: accounting_plan.id} }
        post :create, params: newAcc
      end

      it { expect(response).to have_http_status(:created) }
    end

    describe "error 422, parámetros no válidos" do
      before do
        post :create, params: {account: {name: ""}}
      end

      it { expect(response).to have_http_status(:unprocessable_entity) }
    end
  end


  describe "PUT update" do
    describe "modificar una cuenta existente" do
      before do
        put :update, params: {id: account.id, account: { name: "Pruebaaaaa"}}
      end

      it { expect(response).to have_http_status(:success) }
    end

    describe "error 422, datos no válidos" do
      before do
        put :update, params: {id: account.id, account: { name: ""}}
      end

      it { expect(response).to have_http_status(:unprocessable_entity) }
    end
  end


  describe "DELETE destroy" do
    describe "eliminar cuenta" do
      before do
        account # Crear cuenta
        delete :destroy, params: {id: account.id}
      end

      it { expect(response).to have_http_status(:success) }
    end
  end
end