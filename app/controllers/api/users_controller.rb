module Api
  class UsersController < ApplicationController
    # wrap_parameters false
    def create
      @user = User.new(user_params)
      if @user.save
        sign_in(@user)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    end

    def show
      @user = User.includes(:reviews, :restaurants).find(params[:id])
      render :show
    end


    def update
        if current_user.update(user_params)
          render json: current_user
        else
          render json: [], status: 422
        end
    end

    private
    def user_params
      params.require(:user).permit(:password, :username, :image, :nickname, :location, :description)
    end
  end
end
