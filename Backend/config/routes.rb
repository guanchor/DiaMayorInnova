Rails.application.routes.draw do

  resources :class_groups
  resources :accounting_plans
  resources :school_centers
  resources :annotations
  resources :entries
  resources :solutions


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  devise_for :users 
  devise_scope :user do
    post 'sign_up', to: 'registrations#create'
    post 'sign_in', to: 'sessions#create'
    delete 'log_out', to: 'sessions#destroy'
    post 'validate_token', to: 'tokens#validate_token'
  end

  resources :users, only: [:index, :show, :create, :update, :destroy]
  
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
