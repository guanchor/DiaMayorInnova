Rails.application.routes.draw do

  resources :class_groups
  resources :accounting_plans
  resources :school_centers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  devise_for :users 
  devise_scope :user do
    post 'sign_up', to: 'registrations#create'
    post 'sign_in', to: 'sessions#create'
    post 'log_out', to: 'sessions#destroy'
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
