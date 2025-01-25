



import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          className={`p-2 rounded-full transition-colors ${
            star <= rating
              ? "text-yellow-500 hover:bg-black"
              : "text-black hover:bg-primary hover:text-primary-foreground"
          }`}
          variant="outline"
          size="icon"
          key={star}
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        >
          <StarIcon
            className={`w-5 h-5 ${
              star <= rating ? "fill-yellow-500" : "fill-black"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;