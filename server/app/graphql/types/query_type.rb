# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :tasks, [TaskType], null: false

    def tasks
      Task.order(created_at: :desc)
    end
  end
end
