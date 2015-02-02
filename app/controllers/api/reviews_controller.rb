module Api
  class ReviewsController < ApplicationController
    before_filter :require_signed_in!

    def create
      @review = Review.new(review_params)
      puts "Hello"
      puts params
      if @review.save
        render :json => @review
      else
        render :json => { error: "invalid url" }, status: :unprocessable_entity
      end
    end


    def destroy
      @review = Review.find_by_id(params[:id])
      @review.destroy
    end

    private
    def review_params
      params.require(:review).permit(:user_id, :place_id, :title, :body, :rating)
    end
  end
end
