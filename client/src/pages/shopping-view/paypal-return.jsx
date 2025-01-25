import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

// console.log(paymentId,'paymentIdpaymentId');
// console.log(payerId,'payerIdpayerId');


  useEffect(() => {
    if (paymentId && payerId) {
      const currentOrderId = sessionStorage.getItem("currentOrderId");
      if (currentOrderId) {
        const getCurrentOrderId = JSON.parse(currentOrderId);
        dispatch(
          capturePayment({ paymentId, payerId, orderId: getCurrentOrderId })
        ).then((data) => {
          if (data?.payload?.success) {
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/shop/payment-success";
          } else {
            console.error("Payment capture failed:", data?.payload);
          }
        });
      }
  
    }
  }, [paymentId, payerId, dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
