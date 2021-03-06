module Api
  class RestaurantsController < ApplicationController
    before_filter :require_signed_in!, except: [:show, :index, :location, :search]

      def create
        @place = current_user.restaurants.new(place_params)

        if @place.save
          render json: @place
        else
          render json: @place.errors.full_messages
        end
      end

      def update
        @place = Restaurant.find(params[:id])

        if @place.update(place_params)
          render json: @place
        else
          render json: @place.errors.full_messages
        end
      end

      def destroy
          @place = Restaurant.find(params[:id])
          @place.destroy
          render json: @place
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

        if (params[:kind] == "sentence")
          @search_results =  Restaurant.sentence(params[:cuisine], location,
          params[:rating], params[:distance])
        else
          @search_results =  Restaurant.search(params[:cuisine], location,
          params[:rating], params[:distance], params[:limit])
        end

        @search_results
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
