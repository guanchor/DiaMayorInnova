require "rails_helper"

RSpec.describe UsersController, type: :controller do
  let(:admin_user) { create(:user, role: 'admin') }
  let(:teacher_user) { create(:user, role: 'teacher') }
  let(:student_user) { create(:user, role: 'student') }
  let(:valid_attributes) { { email: 'test@example.com', password: 'password', name: 'Test User', role: 'student' } }
  let(:invalid_attributes) { { email: '', password: 'password', name: 'Test User' } }

  describe "POST #create" do
    context "when the user is an admin" do
      before { request.headers['AUTH-TOKEN'] = admin_user.authentication_token }

      it "creates a new user and returns success" do
        expect {
          post :create, params: { user: valid_attributes }
        }.to change(User, :count).by(1)
        expect(response).to have_http_status(:ok)
      end

      it "returns an error when the user is invalid" do
        post :create, params: { user: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['errors']).to include("Email can't be blank")
      end
    end

    context "when the user is not an admin" do
      before { request.headers['AUTH-TOKEN'] = teacher_user.authentication_token }

      it "returns unauthorized" do
        post :create, params: { user: valid_attributes }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
