# frozen_string_literal: true

module Mutations
  class DeleteTask < BaseMutation
    argument :id, ID, required: true
    type Types::TaskType
    def resolve(id:)
      delete = Task.find(id)
      delete.destroy!
    end
  end
end
