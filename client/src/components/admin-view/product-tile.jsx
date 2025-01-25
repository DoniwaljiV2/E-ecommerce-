

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  setFormData,
  handleDelete,
}) {
  return (
    <Card>
      <div className="w-full max-w-sm mx-auto">
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title || "Product image"}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent className="p-4">
          <h2 className="text-lg md:text-xl font-bold mb-2 mt-2">{product?.title}</h2>

          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-base md:text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-base md:text-lg font-bold">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-4">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
            className="mb-2 sm:mb-0 w-full sm:w-auto"
          >
            Edit
          </Button>
          <Button 
            onClick={() => handleDelete(product?._id)} 
            className="bg-red-500 hover:bg-red-600 w-full sm:w-auto"
          >
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
