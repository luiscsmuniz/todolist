# frozen_string_literal: true

module Mutations
  class UpdateTask < BaseMutation
    argument :id, ID, required: true
    argument :description, String, required: false
    argument :status, Types::TaskStatus, required: false
    type Types::TaskType
    def resolve(id:, description: nil, status: nil)
      task = Task.find(id)
      status ? task.status = status.downcase : false
      description ? task.description = description : false
      task.save!
      task
    end
  end
end
