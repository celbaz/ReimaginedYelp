module Api
  class UsersController < ApplicationController

    def create
      @user = User.new(user_params)
      if @user.save
        sign_in(@user)
        render :show
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    end

    def show
      @user = User.includes(:reviews, :restaurants).find(params[:id])
    end

    private
    def user_params
      params.require(:user).permit(:password, :username)
    end
  end
end
