# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ServerSchema do
  let(:context) { {} }
  let(:variables) { {} }
  let(:result) do
    response = ServerSchema.execute(
      query_string,
      context: context,
      variables: variables,
    )
    response['error'] || response
  end

  describe 'Queries' do
    context 'Get tasks' do
      let!(:task) { @task = FactoryBot.create(:task) }
      let(:query_string) do
        %|
          query TaskQuery($after: Int!, $first: Int!){
            tasks(after: $after, first: $first){
              payload{
                id
                description
                status
              }
            }
          }
        |
      end

      let(:variables) do
        {
          after: 0,
          first: 5,
        }
      end

      it 'when to get the tasks' do
        result['data']['tasks']['payload'].each do |r|
          expect(r['id'].to_i).to eq(@task.id)
          expect(r['description']).to eq(@task.description)
          expect(r['status']).to eq(@task.status.upcase)
        end
      end
    end
  end
end
