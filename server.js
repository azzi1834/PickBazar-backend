const express = require("express");
require("dotenv").config();
const cors = require("cors");

const customerRoutes = require("./routes/customer.routes");
const adminRoutes = require("./routes/admin.routes");
const vendorRoutes = require("./routes/vendor.routes");
const orderRoutes = require("./routes/order.routes");
const shopRoutes = require("./routes/shop.routes");
const categoryRoutes = require("./routes/categories.routes");
const productRoutes = require("./routes/product.routes");
const scriptRoutes = require("./routes/script.routes");

const authMiddleware = require("./authMiddleware");

const connectionToDatabase = require("./config/connectionToDatabase");
connectionToDatabase();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin/auth", adminRoutes);
app.use("/vendor/auth", vendorRoutes);
app.use("/customer/auth", customerRoutes);
app.use("/script", scriptRoutes);

app.use(authMiddleware);

app.use("/customer", [orderRoutes,productRoutes]);
app.use("/admin", [orderRoutes, categoryRoutes]);
app.use("/vendor", [shopRoutes, productRoutes]);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port : ${process.env.PORT}`);
});
