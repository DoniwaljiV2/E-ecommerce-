import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const[openDetailsDialog,setOpenDetailsDialog]=useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
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
      return; 
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

  function handleGetProductDetails(getCurrentProdcutId) {
    dispatch(fetchProductDetails(getCurrentProdcutId));
  }

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      dispatch(resetSearchResults());
    }
  }, [keyword]);
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // console.log(searchResults, "getSearchResultsgetSearchResults");

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="w-full flex items-center mb-6">
        <Input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Search Products..."
          className="py-6"
        />
      </div>
      {!searchResults.length ? (
        <h1 className=" text-5xl font-extrabold">No Results Found!</h1>
      ) : null}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ShoppingProductTile
            handleAddToCart={handleAddToCart}
            handleGetProductDetails={handleGetProductDetails}
            key={item._id}
            product={item}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
