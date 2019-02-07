# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Task do
  context '#save' do
    it 'save task successful' do
      expect(Task.new(description: 'description', status: :in_progress).save).to eql(true)
    end

    it 'when is' do
      expect(Task.new.save).to eql(false)
    end
  end

  context '#destroy' do
    it 'destroy ok' do
      Task.new(description: 'test destroy', status: 1).save
      task = Task.first
      expect { task.destroy }.to change { Task.count }.by(-1)
    end
  end

  context '#update' do
    it 'update description success' do
      task = Task.create(description: 'description test', status: :in_progress)
      expect(task.update(description: 'test')).to eql(true)
    end

    it 'update description fail' do
      task = Task.create(description: 'description test', status: :in_progress)
      expect(task.update(description: nil)).to eql(false)
    end

    it 'update status success' do
      task = Task.create(description: 'description test', status: :in_progress)
      expect(task.update(status: :completed)).to eql(true)
    end

    it 'update status fail' do
      task = Task.create(description: 'description test', status: :in_progress)
      expect(task.update(status: nil)).to eql(false)
    end
  end
end
