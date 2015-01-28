module Api
  class SessionsController < ApplicationController
    def new
      render :new
    end

    def create
      user = User.find_by_credentials(params[:user][:username],
      params[:user][:password])

      if user
        sign_in(user)
        render json: user
      else
        render json: ["User does not exist."], status: 422
      end
    end


    def destroy
      sign_out
      render json: {}
    end

    def show
      if current_user
        render :show
      else
        render json: {}
      end
    end

  end
end
