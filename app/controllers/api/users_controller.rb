module Api
  class UsersController < ApplicationController
    def new
      @user = User.new
    end

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
      @user = current_user
      render :show
    end

    private
    def user_params
      params.require(:user).permit(:password, :username)
    end
  end
end