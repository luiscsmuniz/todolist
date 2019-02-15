# frozen_string_literal: true

module Mutations
  class UpdateTask < BaseMutation
    class UpdateTaskInput < Types::BaseInputObject
      argument :id, ID, required: true
      argument :description, String, required: false
      argument :status, Types::TaskStatus, required: false
    end

    argument :input, UpdateTaskInput, required: true

    type Types::TaskType

    def resolve(input:)
      task = Task.find(input[:id])
      task.update!(input.to_h)
      task
    end
  end
end
