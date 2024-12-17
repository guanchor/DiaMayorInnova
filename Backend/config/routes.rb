Rails.application.routes.draw do

  resources :class_groups
  resources :accounting_plans
  resources :school_centers
  resources :accounts #do
    #get 'accounts/find_by_account_number/:account_number', to: 'accounts#find_by_account_number'
  #end

  resources :help_examples
  resources :annotations
  resources :entries
  resources :solutions

  resources :tasks, param: :id do
    delete 'statements/:statement_id', to: 'tasks#destroy_statement', as: 'destroy_statement_from_task'
    member do
      delete :destroy
    end
  end
  
  resources :statements, only: [:create, :index, :show, :update, :destroy] do
    post 'add_solution', on: :member
    get 'solutions', to: 'statements#get_solutions', on: :member
  end

  resources :roles, only: [:index]
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions' }
  devise_scope :user do
    #post 'sign_up', to: 'registrations#create'
    post 'sign_in', to: 'sessions#create'
    #get 'sign_up', to: 'registrations#new'
    delete 'log_out', to: 'sessions#destroy'
    post 'validate_token', to: 'sessions#valid_token'
  end

  namespace :admin do
    resources :users, only: [:index, :show, :destroy, :update]
  end

  #resources :users, only: [:index, :show, :create, :update, :destroy]
  
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root to: 'sessions#create'
end
