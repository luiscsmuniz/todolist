# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :tasks, TaskCollectionType, null: false do
      argument :after, Integer, required: true
      argument :first, Integer, required: true
    end

    def tasks(after:, first:)
      tasks = Task.where('tasks.id > :id', id: after)
        .order(created_at: :asc)
        .limit(first)

      has_next_page = tasks.to_a.any? && Task.where('tasks.id > :id', id: tasks.last[:id]).exists?

      {
        payload: tasks,
        page_info: { has_next_page: has_next_page },
      }
    end
  end
end
