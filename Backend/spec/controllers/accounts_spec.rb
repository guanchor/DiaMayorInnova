require 'rails_helper'

describe AccountsController do

  #Factories
  let(:admin_user) { create(:admin_user) } # Crear el usuario
  let(:account) { create(:account) } # Crear cuenta

  #Autenticación
  before do
      request.headers['AUTH-TOKEN'] = admin_user.authentication_token
  end

  #Tests
  describe "GET index" do
    it "devuelve las cuentas existentes" do
      account = create(:account)
      get :index

      expect(response).to have_http_status(:ok)
    end

    it "devuelve una cuenta filtrada por nombre" do
      account = create(:account, name: "Test Account")
      get :index, params: { name: "Test" }

      expect(response).to have_http_status(:ok)
    end
  end


  describe "GET show" do
    it "devuelve una cuenta existente" do
      get :show, params: {id: account.id}

      expect(response).to have_http_status(:ok)
    end
  end


  describe "POST create" do
    it "crea una cuenta nueva" do
      newAcc = { account: { name: "Test Account", account_number: "999", description: "Test description",  accounting_plan_id: 1} }
      post :create, params: newAcc

      expect(response).to have_http_status(:created)
    end

  end
end