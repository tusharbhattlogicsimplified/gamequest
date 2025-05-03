import IMAGES from "@/app/utils/imagePaths";
import Image from "next/image";
import CustomImage from "./CustomImage";

interface RatingStarsProps {
  rating: number;
  totalStars?: number;
  size?: number; 
  className?: string;
}

export default function RatingStars({
  rating,
  totalStars = 5,
  size = 24,
  className = "",
}: RatingStarsProps) {
  const roundedRating = Math.round(rating);

  const filledStarSrc = IMAGES.filledStar.src;
  const outlinedStarSrc = IMAGES.emptyStar.src;

  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: totalStars }).map((_, i) => (
        <CustomImage
          key={i}
          src={i < roundedRating ? filledStarSrc : outlinedStarSrc}
          alt={i < roundedRating ? "Filled star" : "Outlined star"}
          width={size}
          height={size}
        />
      ))}
    </div>
  );
}
