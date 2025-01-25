//  require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const authRouter = require("./routes/auth/auth-routes");
// const adminProductsRouter=require('./routes/admin/products-routes')
// const adminOrderRouter=require('./routes/admin/order-routes')

// const shopProductsRouter=require('./routes/shop/products-routes')
// const shopCartRouter=require('./routes/shop/cart-routes')
// const shopAddressRouter=require('./routes/shop/address-routes')
// const shopOrderRouter=require('./routes/shop/order-routes')
// const shopSearchRouter=require('./routes/shop/search-routes')
// const shopReviewRouter=require('./routes/shop/review-routes')

// const commonFeatureRouter=require('./routes/common/feature-routes')
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("MongoDb connected");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: process.env.CLIENT_BASE_URL,         //http://localhost:5174
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "Cache-Control",
//       "Expires",  
//       "Pragma",
//     ],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(express.json());
// app.use('/api/auth',authRouter); 
// app.use('/api/admin/products',adminProductsRouter)
// app.use('/api/admin/orders',adminOrderRouter)
// app.use('/api/shop/products',shopProductsRouter)
// app.use('/api/shop/cart',shopCartRouter)
// app.use('/api/shop/address',shopAddressRouter)
// app.use('/api/shop/order',shopOrderRouter)
// app.use('/api/shop/search',shopSearchRouter)
// app.use('/api/shop/review',shopReviewRouter)
// app.use('/api/common/feature',commonFeatureRouter)
// app.listen(PORT, () => {
//   console.log(`Server is connected on port ${PORT}`);
// });





require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Routes
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// Check Environment Variables
if (!process.env.MONGO_URL || !process.env.CLIENT_BASE_URL) {
  console.error("Environment variables MONGO_URL or CLIENT_BASE_URL are missing");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });
});
