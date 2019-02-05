# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TasksController, type: :request do
  context '#create' do
    it 'POST tasks create' do
      post '/tasks.json', params: { task: { description: 'test', status: 0 } }
      puts response.body
      expect(response.content_type).to eq('application/json')
    end

    it 'POST tasks fail' do
      post '/tasks.json', params: { task: { description: nil, status: 2 } }
      puts response.body
      expect(response.content_type).to eq('application/json')
    end
  end

  context '#index' do
    it 'GET index' do
      post '/tasks.json', params: { task: { description: 'test get json', status: 0 } }
      get '/tasks.json'

      puts JSON.parse(response.body, symbolize_names: true)
      expect(response.content_type).to eq('application/json')
    end
  end

  context '#destroy' do
    xit 'destroy task successful' do
    end
  end

  context '#update' do
    xit 'update success' do
    end
  end
end
