# frozen_string_literal: true

class Task < ApplicationRecord
  validates :description, presence: true
  validates :status, presence: true
  enum status: %i[in_progress completed]
end
