# frozen_string_literal: true

class Task < ApplicationRecord
  validates :description, presence: true, length: { maximum: 500, minimum: 2 }
end
