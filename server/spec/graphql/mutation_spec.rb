# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ServerSchema do
  let(:context) { {} }
  let(:variables) { {} }
  let(:result) do
    response = ServerSchema.execute(
      mutation_string,
      context: context,
      variables: variables,
    )
    response['error'] || response
  end

  describe 'Mutations' do
    context 'Create Task' do
      let(:mutation_string) do
        %|
          mutation CreateTaskMutation($input: CreateTaskInput!) {
            createTask(
              input: $input
            ) {
              id
              description
              status
            }
          }
        |
      end

      let(:variables) do
        {
          input: {
            description: 'Description Test',
          },
        }
      end

      it 'when a task is created' do
        response = result
        task = Task.first
        response['data'].each do |r|
          expect(r[1]['id'].to_i).to eq(task.id)
          expect(r[1]['description']).to eq(task.description)
          expect(r[1]['status']).to eq(task.status.upcase)
        end
      end
    end

    context 'Update description Task' do
      let!(:task) { @task = FactoryBot.create(:task) }
      let(:mutation_string) do
        %|
          mutation UpdateTaskMutation($input: UpdateTaskInput!) {
            updateTask(
              input: $input
            ) {
              id
              description
              status
            }
          }
        |
      end

      let(:variables) do
        {
          input: {
            id: @task.id,
            description: 'Description Test update',
            status: 'COMPLETED',
          },
        }
      end

      it 'when a task is updated' do
        expect(result['data']['updateTask']['id'].to_i).to eq(@task.id)
        expect(result['data']['updateTask']['description']).not_to eq(@task.id)
        expect(result['data']['updateTask']['status']).not_to eq(@task.id)
      end
    end

    context 'Delete Task' do
      let!(:task) { @task = FactoryBot.create(:task) }
      let(:mutation_string) do
        %|
          mutation DeleteTaskMutation($id: ID!){
            deleteTask(
              id: $id
            ) {
              id
              description
              status
            }
          }
        |
      end

      let(:variables) do
        {
          id: @task.id,
        }
      end

      it 'when a task is deleted' do
        expect(result['data']['deleteTask']['id'].to_i).to eql(@task.id)
      end
    end
  end
end
