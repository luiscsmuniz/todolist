# frozen_string_literal: true

module Mutations
  class CreateTask < BaseMutation
    class CreateTaskInput < Types::BaseInputObject
      argument :description, String, required: false
    end

    argument :input, CreateTaskInput, required: true

    type Types::TaskType
    def resolve(input:)
      Task.create!(input.to_h)
    end
  end
end
