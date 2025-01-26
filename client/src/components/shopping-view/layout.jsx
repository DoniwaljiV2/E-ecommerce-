import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden  ">
      {/* common header */}
      <ShoppingHeader/>
      <main className="flex flex-col w-full mt-16">
        <Outlet />  {/* Child routes will be rendered here */}
      </main>
    </div>
  );
}

export default ShoppingLayout;
