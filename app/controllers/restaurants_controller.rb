class RestaurantsController < ApplicationController
  before_filter :require_signed_in!

    def new
      @place = Restaurant.new
    end

    def edit
      @place = Restaurant.find(params[:id])
      render :edit
    end

    def create
      @place = Restaurant.new(place_params)
      @place.user_id = current_user.id
      if @place.save
        redirect_to user_url(current_user)
      else
        flash.now[:errors] = @place.errors.full_messages
        render :new
      end
    end

    def update
      @place = Restaurant.find(params[:id])

      if @place.update(place_params)
        redirect_to restaurants_url
      else
        flash.now[:errors] = @place.errors.full_messages
        render :new
      end
    end

    def destroy
        @place = Restaurant.find(params[:id])
        @place.destroy
        redirect_to restaurants_url
    end

    def index
      @places = Restaurant.all
      render :index
    end

    def show
      @place = Restaurant.find_by_id(params[:id])
    end

    private
    def place_params
      params.require(:place).permit(:name, :food_inspection, :cuisine,
                                    :street, :zipcode, :city, :state, :phone_number)
    end
end
