module Api
  class ReviewsController < ApplicationController
    before_filter :require_signed_in!

    def create
      @review = Review.new(review_params)
      if @review.save
        render :json => @review
      else
        render :json => { error: "invalid url" }, status: :unprocessable_entity
      end
    end

    def show
      @review = Review.find_by_id(params[:id])
      render :json => @review
    end


    def update
      @review = Review.find_by_id(params[:id])
      if @review.update(review_params)
        render json: @review
      else
        render json: @review.errors.full_messages, status: :unprocessable_entity
      end
    end

    def destroy
      @review = Review.find_by_id(params[:id])
      @review.destroy
      render :json => { success: "Review Deleted" }, status: "200"
    end

    private
    def review_params
      params.require(:review).permit(:user_id, :place_id, :title, :body, :rating)
    end
  end
end
