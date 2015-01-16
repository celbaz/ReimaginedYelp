module Api
  class RestaurantsController < ApplicationController
    before_filter :require_signed_in!, except: [:show, :index, :location, :search]

      def create
        @place = current_user.restaurants.new(place_params)

        if @place.save
          redirect_to root_url
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
        @place = Restaurant.includes(:reviews).find_by_id(params[:id])
        render :json => @place
      end

      def search
        location = ""
        if params[:location].is_a? Hash
            location = [params[:location][:latitude],
            params[:location][:longitude]]
        else
            location = params[:location]
        end

        @search_results =  Restaurant.search(params[:cuisine], location,
        params[:rating], params[:distance])
      end

      def location
          render :json => current_location
      end

      private
      def place_params
        params.require(:place).permit(:name, :food_inspection, :cuisine,
                                      :street, :zipcode, :city,
                                      :state, :phone_number)
      end
  end
end
