import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  WatchIcon,
} from "lucide-react";
import { FaMale, FaFemale } from "react-icons/fa";
import {
  SiAdidas,
  SiFila,
  SiNike,
  SiPuma,
  SiReebok,
  SiZara,
} from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const categoriesWithIcon = [
    { id: "men", label: "Men", icon: FaMale },
    { id: "women", label: "Women", icon: FaFemale },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: Footprints },
  ];
  const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: SiNike },
    { id: "adidas", label: "Adidas", icon: SiAdidas },
    { id: "puma", label: "Puma", icon: SiPuma },
    { id: "reebok", label: "Reebok", icon: SiReebok },
    { id: "zara", label: "Zara", icon: SiZara },
    { id: "FILA", label: "FILA", icon: SiFila },
  ];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProdcutId) {
    dispatch(fetchProductDetails(getCurrentProdcutId));
  }

  function handleAddToCart(getCurrentProdcutId) {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                alt={`Slide ${index + 1}`}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 `}
              />
            ))
          : null}
        <Button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-20"
        >
          <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-20"
        >
          <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={categoryItem.id}
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={brandItem.id}
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    key={productItem?._id}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;

// import { Button } from "@/components/ui/button";
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   BabyIcon,
//   CloudLightning,
//   Footprints,
//   ShirtIcon,
//   WatchIcon,
// } from "lucide-react";
// import { SiAdidas, SiFila, SiNike, SiPuma, SiReebok, SiZara } from "react-icons/si";
// import { Card, CardContent } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllFilteredProducts,
//   fetchProductDetails,
// } from "@/store/shop/products-slice";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { useNavigate } from "react-router-dom";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "@/hooks/use-toast";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import { getFeatureImages } from "@/store/common-slice";

// function ShoppingHome() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const dispatch = useDispatch();
//   const { featureImageList } = useSelector((state) => state.commonFeature);
//   const { toast } = useToast();
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const { productList, productDetails } = useSelector(
//     (state) => state.shopProducts
//   );
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

//   const categoriesWithIcon = [
//     { id: "men", label: "Men", icon: ShirtIcon },
//     { id: "women", label: "Women", icon: CloudLightning },
//     { id: "kids", label: "Kids", icon: BabyIcon },
//     { id: "accessories", label: "Accessories", icon: WatchIcon },
//     { id: "footwear", label: "Footwear", icon: Footprints },
//   ];
//   const brandsWithIcon = [
//     { id: "nike", label: "Nike", icon: SiNike },
//     { id: "adidas", label: "Adidas", icon: SiAdidas },
//     { id: "puma", label: "Puma", icon: SiPuma },
//     { id: "reebok", label: "Reebok", icon: SiReebok },
//     { id: "zara", label: "Zara", icon: SiZara },
//     { id: "FILA", label: "H&M", icon: SiFila },
//   ];

//   const handleNavigateToListingPage = (item, section) => {
//     sessionStorage.removeItem("filters");
//     const currentFilter = { [section]: [item.id] };
//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     navigate("/shop/listing");
//   };

//   const handleGetProductDetails = (id) => dispatch(fetchProductDetails(id));

//   const handleAddToCart = (id) => {
//     if (!user?.id) return console.error("User ID is not available.");
//     dispatch(
//       addToCart({ userId: user?.id, productId: id, quantity: 1 })
//     ).then(({ payload }) => {
//       if (payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({ title: "Product is Added to Cart" });
//       }
//     }).catch(console.error);
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
//     }, 3000);
//     return () => clearInterval(timer);
//   }, [featureImageList]);

//   useEffect(() => dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" })), [dispatch]);
//   useEffect(() => { if (productDetails) setOpenDetailsDialog(true); }, [productDetails]);
//   useEffect(() => dispatch(getFeatureImages()), [dispatch]);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="relative w-full h-[600px] overflow-hidden">
//         {featureImageList && featureImageList.map((slide, index) => (
//           <img
//             src={slide?.image}
//             alt={`Slide ${index + 1}`}
//             key={index}
//             className={`${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
//           />
//         ))}
//         <Button
//           onClick={() => setCurrentSlide((prev) => (prev - 1 + featureImageList.length) % featureImageList.length)}
//           variant="outline"
//           size="icon"
//           className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-20"
//         >
//           <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6" />
//         </Button>
//         <Button
//           onClick={() => setCurrentSlide((prev) => (prev + 1) % featureImageList.length)}
//           variant="outline"
//           size="icon"
//           className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-20"
//         >
//           <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6" />
//         </Button>
//       </div>

//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Shop by category</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {categoriesWithIcon.map((category) => (
//               <Card key={category.id} onClick={() => handleNavigateToListingPage(category, "category")} className="cursor-pointer hover:shadow-lg transition-shadow">
//                 <CardContent className="flex flex-col items-center justify-center p-6">
//                   <category.icon className="w-12 h-12 mb-4 text-primary" />
//                   <span className="font-bold">{category.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-12 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {brandsWithIcon.map((brand) => (
//               <Card key={brand.id} onClick={() => handleNavigateToListingPage(brand, "brand")} className="cursor-pointer hover:shadow-lg transition-shadow">
//                 <CardContent className="flex flex-col items-center justify-center p-6">
//                   <brand.icon className="w-12 h-12 mb-4 text-primary" />
//                   <span className="font-bold">{brand.label}</span>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-12">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {productList?.map((product) => (
//               <ShoppingProductTile key={product._id} product={product} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
//     </div>
//   );
// }

// export default ShoppingHome;
