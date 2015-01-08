module Api
  class RestaurantsController < ApplicationController
    before_filter :require_signed_in!, except: [:show, :index]

      def create
        @place = current_user.restaurants.new(place_params)

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
        render :json => @places
      end

      def show
        @place = Restaurant.find_by_id(params[:id])
        render :json => @place
      end

      private
      def place_params
        params.require(:place).permit(:name, :food_inspection, :cuisine,
                                      :street, :zipcode, :city,
                                      :state, :phone_number)
      end
  end
end
