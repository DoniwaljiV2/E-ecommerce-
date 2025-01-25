


import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    if (orderDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  // useEffect(() => {
  //   dispatch(getAllOrdersByUser(user?.id));
  // }, [dispatch, user]);

  useEffect(() => {
    if (user?.id && (!orderList || orderList.length === 0)) {
      dispatch(getAllOrdersByUser(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <Card className="w-full max-w-screen-md mx-auto">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="w-full text-xs md:text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="text-center">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem._id} className="flex flex-col sm:flex-row sm:table-row">
                    <TableCell className="hidden sm:table-cell">{orderItem._id}</TableCell>
                    <TableCell>{new Date(orderItem.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-2 ${
                          orderItem.orderStatus === "confirmed" ? "bg-green-700" : "bg-black"
                        }`}
                      >
                        {orderItem.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">${orderItem.totalAmount}</TableCell>
                    <TableCell className="flex justify-center">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="px-2 py-1 text-xs"
                            onClick={() => handleFetchOrderDetails(orderItem._id)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[80vh] overflow-y-auto p-4">
                          <ShoppingOrderDetailsView orderDetails={orderDetails} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No orders found</TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;