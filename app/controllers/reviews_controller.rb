class ReviewsController < ApplicationController

  def create
    @review = Review.new(review_params)
    if @review.save
      redirect_to restaurant_url(@review.place_id)
    else
      flash.now[:errors] = @review.errors.full_messages
      redirect_to restaurants_url
    end
  end


  def destroy
    @review = Review.find_by_id(params[:id])

    @review.destroy
    redirect_to restaurants_url
  end

  private
  def review_params
    params.require(:review).permit(:user_id, :place_id, :title, :body, :rating)
  end
end
