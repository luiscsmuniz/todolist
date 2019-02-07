# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::TasksController, type: :request do
  let! { @task = FactoryBot.create(:task) }

  context '#create' do
    it 'POST tasks create' do
      expect { post '/api/v1/tasks', params: { task: { description: 'test json', status: :in_progress } } }.to change { Task.count }.by(1)
      expect(response.content_type).to eq('application/json')
      expect(response).to have_http_status(201)
    end

    it 'POST tasks fail' do
      expect { post '/api/v1/tasks', params: { task: { description: nil, status: :in_progress } } }.to change { Task.count }.by(0)
      expect(response.content_type).to eq('application/json')
      expect(response).to have_http_status(422)
    end
  end

  context '#index' do
    it 'GET index' do
      get '/api/v1/tasks'
      JSON.parse(response.body, symbolize_names: true).each do |r|
        expect(r[:id]).to eql(@task.id)
        expect(r[:description]).to eql(@task.description)
        expect(r[:status]).to eql(@task.status)
      end
      expect(response.content_type).to eq('application/json')
      expect(response).to have_http_status(200)
    end

    it 'GET by id' do
      get "/api/v1/tasks/#{@task.id}"
      expect(response.body).to eql(@task.to_json)
    end
  end

  context '#destroy' do
    it 'destroy task successful' do
      expect { delete "/api/v1/tasks/#{@task.id}" }.to change { Task.count }.by(-1)
      expect(response).to have_http_status(204)
    end
  end

  context '#update' do
    it 'update success' do
      put "/api/v1/tasks/#{@task.id}", params: { task: { description: 'update test json', status: :completed } }
      expect(response.content_type).to eq('application/json')
      expect(response).to have_http_status(200)
    end

    it 'update fail' do
      put "/api/v1/tasks/#{@task.id}", params: { task: { description: nil, status: nil } }
      expect(response.content_type).to eq('application/json')
      expect(response).to have_http_status(422)
    end
  end
end
