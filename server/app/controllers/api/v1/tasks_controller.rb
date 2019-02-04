# frozen_string_literal: true

module Api::V1
  class TasksController < ApplicationController
    before_action :set_task, only: %i[show update destroy]

    # GET /task
    def index
      @task = Task.order(:id)

      render json: @task
    end

    # GET /Tasks/1
    def show
      render json: @task
    end

    # POST /task
    def create
      @task = Task.new(task_params)

      if @task.save
        render json: @task, status: :created
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /task/1
    def update
      if @task.update(task_params)
        render json: @task
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end

    # DELETE /task/1
    def destroy
      @task.destroy
      if @task.destroy
        head :no_content, status: :ok
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = task.find(params[:id])
    end

    # Only allow a trusted parameter "white task" through.
    def task_params
      params.require(:task).permit(:title, :excerpt, :description, :upvotes)
    end
  end
end
