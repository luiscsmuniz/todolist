# frozen_string_literal: true

class Task < ApplicationRecord
  validates :description, presence: true
  validates :status, inclusion: { in: [0, 1] }
end
