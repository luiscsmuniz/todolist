# frozen_string_literal: true

module Types
  class TaskType < Types::BaseObject
    field :id, ID, null: true
    field :description, String, null: true
    field :status, Types::TaskStatus, null: true
  end
end
