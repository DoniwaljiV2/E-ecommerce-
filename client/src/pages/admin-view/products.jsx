// // import ProductImageUploader from "@/components/admin-view/image-uploder";
// // import AdminProductTile from "@/components/admin-view/product-tile";
// // import CommonForm from "@/components/common/form";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetHeader,
// //   SheetTitle,
// // } from "@/components/ui/sheet";
// // import { addProductFormElements } from "@/config";
// // import { useToast } from "@/hooks/use-toast";
// // import {
// //   addNewProduct,
// //   deleteProduct,
// //   editProduct,
// //   fetchAllProducts,
// // } from "@/store/admin/products-slice";

// // import { Fragment, useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";

// // const initialFormData = {
// //   image: null,
// //   title: "",
// //   description: "",
// //   category: "",
// //   brand: "",
// //   price: "",
// //   salePrice: "",
// //   totalStock: "",
// // };

// // function AdminProducts() {
// //   const [openCreateProductsDialog, setOpenCreateProductsDialog] =
// //     useState(false);
// //   const [formData, setFormData] = useState(initialFormData);
// //   const [imageFile, setImageFile] = useState(null);
// //   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
// //   const [imageLoadingState, setImageLoadingState] = useState(false);
// //   const [currentEditedId, setCurrentEditedId] = useState(null);
// //   const { productList } = useSelector((state) => state.adminProducts);
// //   const { toast } = useToast();
// //   const dispatch = useDispatch();
// //   function onSubmit(event) {
// //     event.preventDefault();
// //     currentEditedId !== null
// //       ? dispatch(editProduct({ id: currentEditedId, formData })).then(
// //           (data) => {
// //             console.log(data, "Edit");
// //             if (data?.payload?.success) {
// //               dispatch(fetchAllProducts());
// //               setFormData(initialFormData);
// //               setOpenCreateProductsDialog(false);
// //               setCurrentEditedId(null);
// //             }
// //           }
// //         )
// //       : dispatch(
// //           addNewProduct({
// //             ...formData,
// //             image: uploadedImageUrl,
// //           })
// //         ).then((data) => {
// //           console.log(data);
// //           if (data?.payload?.success) {
// //             dispatch(fetchAllProducts());
// //             setOpenCreateProductsDialog(false);
// //             setImageFile(null);
// //             setFormData(initialFormData);
// //             toast({
// //               title: "Product add successfully",
// //             });
// //           }
// //         });
// //   }

// //   function isFormValid() {
// //     return Object.keys(formData)
// //       .map((key) => formData[key] !== "")
// //       .every((item) => item);
// //   }

// //   function handleDelete(getCurrentProdcutId) {
// //     dispatch(deleteProduct(getCurrentProdcutId)).then((data) => {
// //       if (data?.payload?.success) {
// //         dispatch(fetchAllProducts());
// //       }
// //     });
// //   }

// //   useEffect(() => {
// //     dispatch(fetchAllProducts());
// //   }, [dispatch]);
// //   // console.log(productList, uploadedImageUrl, "ProductList");

// //   return (
// //     <Fragment>
// //       <div className="mb-5  w-full flex justify-end">
// //         <Button onClick={() => setOpenCreateProductsDialog(true)}>
// //           Add New Product
// //         </Button>
// //       </div>
// //       <div className="grid gap-4 md:grid-cols-4 lg:grid-flow-col-4">
// //         {productList && productList.length > 0
// //           ? productList.map((productItem) => (
// //               <AdminProductTile
// //                 key={productItem._id}
// //                 product={productItem}
// //                 setCurrentEditedId={setCurrentEditedId}
// //                 setOpenCreateProductsDialog={setOpenCreateProductsDialog}
// //                 setFormData={setFormData}
// //                 handleDelete={handleDelete}
// //               />
// //             ))
// //           : null}
// //       </div>
// //       <Sheet
// //         open={openCreateProductsDialog}
// //         onOpenChange={() => {
// //           setOpenCreateProductsDialog(false);
// //           setCurrentEditedId(null);
// //           setFormData(initialFormData);
// //         }}
// //       >
// //         <SheetContent side="right" className="overflow-auto">
// //           <SheetHeader>
// //             <SheetTitle>
// //               {currentEditedId !== null ? "Edit Product" : "Add New Product"}
// //             </SheetTitle>
// //           </SheetHeader>
// //           <ProductImageUploader
// //             imageFile={imageFile}
// //             setImageFile={setImageFile}
// //             uploadedImageUrl={uploadedImageUrl}
// //             setUploadedImageUrl={setUploadedImageUrl}
// //             imageLoadingState={imageLoadingState}
// //             setImageLoadingState={setImageLoadingState}
// //             currentEditedId={currentEditedId}
// //             isEditMode={currentEditedId !== null}
// //           />
// //           <div className="py-6">
// //             <CommonForm
// //               onSubmit={onSubmit}
// //               formData={formData}
// //               setFormData={setFormData}
// //               buttonText={currentEditedId !== null ? "Edit" : "Add"}
// //               formControls={addProductFormElements}
// //               isBtnDisabled={!isFormValid()}
// //             />
// //           </div>
// //         </SheetContent>
// //       </Sheet>
// //     </Fragment>
// //   );
// // }

// // export default AdminProducts;



// import ProductImageUploader from "@/components/admin-view/image-uploder";
// import AdminProductTile from "@/components/admin-view/product-tile";
// import CommonForm from "@/components/common/form";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { addProductFormElements } from "@/config";
// import { useToast } from "@/hooks/use-toast";
// import {
//   addNewProduct,
//   deleteProduct,
//   editProduct,
//   fetchAllProducts,
// } from "@/store/admin/products-slice";

// import { Fragment, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const initialFormData = {
//   image: null,
//   title: "",
//   description: "",
//   category: "",
//   brand: "",
//   price: "",
//   salePrice: "",
//   totalStock: "",
// };

// function AdminProducts() {
//   const [openCreateProductsDialog, setOpenCreateProductsDialog] =
//     useState(false);
//   const [formData, setFormData] = useState(initialFormData);
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const [currentEditedId, setCurrentEditedId] = useState(null);
//   const { productList } = useSelector((state) => state.adminProducts);
//   const { toast } = useToast();
//   const dispatch = useDispatch();

//   function onSubmit(event) {
//     event.preventDefault();
//     currentEditedId !== null
//       ? dispatch(editProduct({ id: currentEditedId, formData })).then(
//           (data) => {
//             if (data?.payload?.success) {
//               dispatch(fetchAllProducts());
//               resetForm();
//             }
//           }
//         )
//       : dispatch(
//           addNewProduct({
//             ...formData,
//             image: uploadedImageUrl,
//           })
//         ).then((data) => {
//           if (data?.payload?.success) {
//             dispatch(fetchAllProducts());
//             resetForm();
//             toast({
//               title: "Product added successfully",
//             });
//           }
//         });
//   }

//   function resetForm() {
//     setFormData(initialFormData);
//     setOpenCreateProductsDialog(false);
//     setCurrentEditedId(null);
//     setImageFile(null);
//     setUploadedImageUrl("");
//   }

//   function isFormValid() {
//     return Object.keys(formData)
//       .map((key) => formData[key] !== "")
//       .every((item) => item);
//   }

//   function handleDelete(getCurrentProductId) {
//     dispatch(deleteProduct(getCurrentProductId)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllProducts());
//       }
//     });
//   }

//   useEffect(() => {
//     dispatch(fetchAllProducts());
//   }, [dispatch]);

//   return (
//     <Fragment>
//       <div className="mb-5 w-full flex justify-end">
//         <Button onClick={() => setOpenCreateProductsDialog(true)}>
//           Add New Product
//         </Button>
//       </div>
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {productList && productList.length > 0
//           ? productList.map((productItem) => (
//               <AdminProductTile
//                 key={productItem._id}
//                 product={productItem}
//                 setCurrentEditedId={setCurrentEditedId}
//                 setOpenCreateProductsDialog={setOpenCreateProductsDialog}
//                 setFormData={setFormData}
//                 handleDelete={handleDelete}
//               />
//             ))
//           : <p className="col-span-full text-center">No products available.</p>}
//       </div>
//       <Sheet
//         open={openCreateProductsDialog}
//         onOpenChange={resetForm}
//       >
//         <SheetContent side="right" className="overflow-auto max-w-lg mx-auto">
//           <SheetHeader>
//             <SheetTitle>
//               {currentEditedId !== null ? "Edit Product" : "Add New Product"}
//             </SheetTitle>
//           </SheetHeader>
//           <ProductImageUploader
//             imageFile={imageFile}
//             setImageFile={setImageFile}
//             uploadedImageUrl={uploadedImageUrl}
//             setUploadedImageUrl={setUploadedImageUrl}
//             imageLoadingState={imageLoadingState}
//             setImageLoadingState={setImageLoadingState}
//             currentEditedId={currentEditedId}
//             isEditMode={currentEditedId !== null}
//           />
//           <div className="py-6">
//             <CommonForm
//               onSubmit={onSubmit}
//               formData={formData}
//               setFormData={setFormData}
//               buttonText={currentEditedId !== null ? "Edit" : "Add"}
//               formControls={addProductFormElements}
//               isBtnDisabled={!isFormValid()}
//             />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </Fragment>
//   );
// }

// export default AdminProducts;



import ProductImageUploader from "@/components/admin-view/image-uploder";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              resetForm();
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            resetForm();
            toast({
              title: "Product added successfully",
            });
          }
        });
  }

  function resetForm() {
    setFormData(initialFormData);
    setOpenCreateProductsDialog(false);
    setCurrentEditedId(null);
    setImageFile(null);
    setUploadedImageUrl("");
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-between">

      <h1 className="text-2xl font-bold mb-4">Products</h1>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              product={productItem}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setFormData={setFormData}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="col-span-full text-center">No products available.</p>
        )}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={resetForm}
      >
        <SheetContent side="right" className="overflow-auto max-w-lg mx-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUploader
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            currentEditedId={currentEditedId}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
