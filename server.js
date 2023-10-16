const express = require("express");
require("dotenv").config();

const customerRoutes = require("./routes/customer.routes");
const adminRoutes = require("./routes/admin.routes");
const vendorRoutes = require("./routes/vendor.routes");

const connectionToDatabase = require("./config/connectionToDatabase");
connectionToDatabase();

const app = express();
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/vendor", vendorRoutes);
app.use("/customer", customerRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port : ${process.env.PORT}`);
});
