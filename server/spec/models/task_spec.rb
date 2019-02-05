# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Task do
  context '#save' do
    it 'save task successful' do
      expect(Task.new(description: 'description', status: 0).save).to eql(true)
    end

    it 'when is' do
      expect(Task.new.save).to eql(false)
    end
  end

  context '#destroy' do
    it 'destroy ok' do
      task = Task.all

      task.each do |_t|
        expect(task.destroy).to eql(true)
      end
    end
  end

  context '#update' do
    it 'update description success' do
      task = Task.create(description: 'description test', status: 0)
      task.description = 'teste 2'
      expect(task.save).to eql(true)
    end

    it 'update description fail' do
      task = Task.create(description: 'description test', status: 0)
      task.description = nil
      expect(task.save).to eql(false)
    end

    it 'update status success' do
      task = Task.create(description: 'description test', status: 0)
      task.status = 1
      expect(task.save).to eql(true)
    end
  end
end
