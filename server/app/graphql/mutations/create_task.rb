# frozen_string_literal: true

module Mutations
  class CreateTask < BaseMutation
    argument :description, String, required: false
    type Types::TaskType
    def resolve(description: nil)
      Task.create!(
        description: description,
      )
    end
  end
end
