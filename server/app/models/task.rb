# frozen_string_literal: true

class Task < ApplicationRecord
  enum status: %i[in_progress completed]
  validates :description, presence: true
  validates :status, presence: true
end
