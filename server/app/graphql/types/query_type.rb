# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :tasks, TaskCollectionType, null: false do
      argument :after, Integer, required: true
      argument :first, Integer, required: true
    end

    def tasks(after:, first:)
      tasks = Task.where('tasks.id > :id', id: after).limit(first)
      payload = []
      tasks.each do |task|
        payload.push(
          id: task.id,
          description: task.description,
          status: task.status,
        )
      end

      next_page = payload.any? ? Task.where('tasks.id > :id', id: payload.last[:id]).count : false
      p next_page
      {
        payload: payload,
        page_info: { has_next_page: next_page >= 1 },
      }
    end
  end
end
