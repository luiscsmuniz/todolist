# frozen_string_literal: true

module Api::V1
  class TasksController < ApplicationController
    before_action :set_task, only: %i[show update destroy]

    # GET /api/v1/tasks

    def index
      @tasks = Task.order(:id)

      render json: @tasks
    end

    # GET /api/v1/task/1

    def show
      render json: @task
    end

    # POST /api/v1/tasks
    def create
      @task.new(task_params)

      if @task.save
        render json: @task, status: :created
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /api/v1/task/1
    def update
      if @task.new(task_params)
        render json: @task
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end

    # DELETE /api/v1/task/1
    def destroy
      @task.destroy

      if @task.destroy
        head :no_content, status: :ok
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end

    private

    def set_list
      @list = List.find(params[:id])
    end

    def task_params
      params.require(:task).permit(:description)
    end
  end
end
