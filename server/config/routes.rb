# frozen_string_literal: true

Rails.application.routes.draw do
  resources :tasks

  namespace :api do
    namespace :v1 do
      resources :tasks
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
