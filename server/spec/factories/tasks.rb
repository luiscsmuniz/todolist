# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    sequence(:description) { |n| "Description test #{n}" }
    status { :in_progress }
  end
end
