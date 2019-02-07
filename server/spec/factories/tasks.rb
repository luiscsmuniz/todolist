# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    description { 'description test' }
    status { :in_progress }
  end
end
