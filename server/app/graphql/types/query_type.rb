# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :task, [TaskType], null: false

    def task
      Task.all
    end
  end
end
