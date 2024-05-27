import { Star } from "lucide-react";
import { TopProducts } from "../data/top-products";

interface SortRatingsProps {
  data: TopProducts;
}

const SortRatings: React.FC<SortRatingsProps> = ({ data }) => {
  const rating = data.rating;

  return (
    // <div className="inline-flex flex-col">
      <div
        className={`inline-block`}
        // style={{["--rating" as any]:`4.1`}}
      >
        <div className="filter grayscale opacity-35">⭐</div>
        <span className={`after:content-[⭐⭐⭐⭐⭐]`}></span>
      </div>
    // </div>
  );
};

export default SortRatings;

//
