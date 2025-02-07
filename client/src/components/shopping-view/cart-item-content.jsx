import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItemQty } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  }


  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentCartItem = getCartItems.findIndex(
        (item) => item.productId === getCartItem?.productId
      );

      const getCurrentProductIndex = productList.findIndex(product => product._id === getCartItem?.productId);
      const getTotalStock = productList[getCurrentProductIndex]?.totalStock;

      if (indexOfCurrentCartItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
        
        let newQuantity;
        if (typeOfAction === "plus") {
          newQuantity = getQuantity + 1;
          if (newQuantity > getTotalStock) {
            toast({
              title: `Only ${getTotalStock} quantity can be added for this item`,
              variant: "destructive",
            });
            return;
          }
        } else {
          newQuantity = getQuantity - 1;
          if (newQuantity < 1) {
            return; 
          }
        }

        dispatch(
          updateCartItemQty({
            userId: user?.id,
            productId: getCartItem?.productId,
            quantity: newQuantity,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            toast({
              title: "Cart item is updated successfully", // Fixed spelling
            });
          }
        }).catch(() => {
          toast({
            title: "Failed to update cart item",
            variant: "destructive",
          });
        });
      }
    }
  };

  return (
    <div className="flex items-center space-x-4 ">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1 ">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full "
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            disabled={cartItem?.quantity === 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full "
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}{" "}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
