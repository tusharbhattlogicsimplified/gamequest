'use client';
import RatingStars from '@/app/components/ui/RatingStars';
import React from 'react';

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ reviews }) => {
  return (
    <div className="w-full overflow-x-auto py-10">
      <div className="flex gap-6 px-6 min-w-max">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="w-[300px] min-w-[300px] bg-[#DEB887] text-black rounded-xl p-5 shadow-md flex-shrink-0"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 border-2 border-black rounded-full" />
              <div>
                <p className="font-semibold">{review.reviewerName}</p>
                <div className="text-orange-500 text-sm">
                  <RatingStars rating={review.rating}/>
                </div>
              </div>
            </div>
            <hr className="border-black/30 mb-4" />
            <p className="text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsCarousel;
