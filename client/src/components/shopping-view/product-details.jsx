


import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);


  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProdcutId, getTotalStock) {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProdcutId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    if (!user?.id) {
      console.error("User ID is not available.");
      return; // Handle case where user ID is not available
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProdcutId,
        quantity: 1,
      })
    )
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({
            title: "Product is Added to Cart",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to add to cart:", error); // Handle error
      });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

      
  
      
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 max-w-full sm:max-w-[90vw] lg:max-w-[70vw]  max-h-[80vh] overflow-y-auto">
        <div className="relative overflow-hidden rounded-lg max-w-full">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full object-cover h-auto"
          />
        </div>
        
        <div>
          <DialogTitle className="text-lg sm:text-2xl font-extrabold mb-2">
            {productDetails?.title}
          </DialogTitle>

          <DialogDescription className="text-muted-foreground text-sm sm:text-lg mb-2">
            {productDetails?.description}
          </DialogDescription>

          <div className="flex items-center justify-between mb-2">
            <p className={`text-xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-lg font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 mt-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground text-sm sm:text-base">{averageReview.toFixed(2)}</span>
          </div>

          <div className="mt-4 mb-4">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-50 cursor-not-allowed">Out Of Stock</Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(productDetails?._id, productDetails?.totalStock)
                }
              >
                Add to cart
              </Button>
            )}
          </div>

          <Separator />

          <div className="max-h-[200px] sm:max-h-[300px] overflow-y-auto mt-4">
            <h2 className="text-lg font-bold mb-2">Reviews</h2>
            <div className="grid gap-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4 sm:gap-4" key={reviewItem._id}>
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border">
                      <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <h3 className="font-bold text-sm sm:text-base">{reviewItem?.userName}</h3>
                      <StarRatingComponent rating={reviewItem?.reviewValue} />
                      <p className="text-sm">{reviewItem.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-sm sm:text-base">No Reviews</h1>
              )}
            </div>

            <div className="mt-4 sm:mt-6 flex flex-col gap-2">
              <Label className="text-sm sm:text-base">Write a Review</Label>
              <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review"
                className="text-sm sm:text-base"
              />
              <Button 
              className="w-full mt-2"
              onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;