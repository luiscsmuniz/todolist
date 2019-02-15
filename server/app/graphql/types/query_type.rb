# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :task, [TaskType], null: false

    def task
      Task.order(created_at: :desc)
    end
  end
end
