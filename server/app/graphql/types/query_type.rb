# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :tasks, [TaskType], null: false

    def tasks
      Task.all
    end

    field :tasks_pagination, TaskCollectionType, null: false do
      description 'Pagination'
      argument :after, Integer, required: true
      argument :first, Integer, required: true
    end

    def tasks_pagination(after:, first:)
      tasks = Task.where('tasks.id > :id', id: after).limit(first)
      payload = []
      tasks.each do |task|
        payload.push(
          id: task.id,
          description: task.description,
          status: task.status,
        )
      end

      {
        payload: payload,

      }
    end
  end
end
