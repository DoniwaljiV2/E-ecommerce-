// import ProductImageUploader from "@/components/admin-view/image-uploder";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { toast, useToast } from "@/hooks/use-toast";
// import { addFeatureImages, getFeatureImages } from "@/store/common-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function AdminDashboard() {
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const dispatch = useDispatch();
//   const { featureImageList } = useSelector((state) => state.commonFeature);
//   const { toast } = useToast();
//   function handleUploadFeatureImage() {
//     if (!uploadedImageUrl) {
//       toast({
//         title: "Please Upload a image",
//       });
//       return;
//     }
//     dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(getFeatureImages());
//         setImageFile(null);
//         setUploadedImageUrl("");
//       }
//     });
//   }
//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);
//   return (
//     <div>
//       {/* <h1>Upload Feature Images</h1> */}
//       <ProductImageUploader
//         imageFile={imageFile}
//         setImageFile={setImageFile}
//         uploadedImageUrl={uploadedImageUrl}
//         setUploadedImageUrl={setUploadedImageUrl}
//         imageLoadingState={imageLoadingState}
//         setImageLoadingState={setImageLoadingState}
//         isCustomStyling={true}
//         // currentEditedId={currentEditedId}
//         // isEditMode={currentEditedId !== null}
//       />
//       <Button
//         onClick={handleUploadFeatureImage}
//         className={`mt-5 w-full ${
//           !uploadedImageUrl ? "cursor-not-allowed opacity-70" : ""
//         }`}
//       >
//         Upload
//       </Button>
//       <div className="flex flex-col mt-5 gap-4">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((featureImgItem) => (
//               <div className="relative" key={featureImgItem.image}>
//                 <img
//                   src={featureImgItem.image}
//                   className="w-full h-[300px] object-cover rounded-t-lg"
//                 />
//               </div>
              
//             ))
//           : null}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;



import ProductImageUploader from "@/components/admin-view/image-uploder";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast, useToast } from "@/hooks/use-toast";
import { addFeatureImages, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { toast } = useToast();

  function handleUploadFeatureImage() {
    if (!uploadedImageUrl) {
      toast({
        title: "Please Upload an image",
      });
      return;
    }
    dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Feature Images</h1>
      <ProductImageUploader
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyling={true}
      />
      <Button
        onClick={handleUploadFeatureImage}
        className={`mt-5 w-full ${
          !uploadedImageUrl ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        Upload
      </Button>
      <Separator className="my-4" />
      <div className="flex flex-col mt-5 gap-4">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative" key={featureImgItem.image}>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-lg"
                  alt="Feature"
                />
              </div>
            ))
          : (
            <p className="text-center">No feature images uploaded yet.</p>
          )}
      </div>
    </div>
  );
}

export default AdminDashboard;
