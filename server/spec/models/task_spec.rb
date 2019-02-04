# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Task do
  context '#save' do
    it 'when is succesful' do
      expect(Task.new(description: 'description').save).to eql(true)
    end

    it 'when is' do
      expect(Task.new.save).to eql(false)
    end
  end
end
