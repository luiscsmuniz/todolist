# frozen_string_literal: true

class Types::TaskCollectionType < Types::BaseObject
  field :payload, [Types::TaskType], null: true
  field :page_info, Types::PageInfoType, null: true
end
