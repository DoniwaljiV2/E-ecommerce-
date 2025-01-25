import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[200px] md:h-[350px] w-full overflow-hidden">
        <img
          src={accImg}
          alt="account-img"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-4 p-4 md:gap-8 md:py-8">
        <div className="flex flex-col rounded-lg border bg-background p-4 md:p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList className="flex gap-2 md:gap-4">
              <TabsTrigger
                value="orders"
                className="text-sm md:text-base p-2 md:p-3"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="text-sm md:text-base p-2 md:p-3"
              >
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
