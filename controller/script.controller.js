const Product = require("../models/product.model");
const Vendor = require("../models/vendor.model");
const Categories = require("../models/category.model");
const Subcategories = require("../models/subcategory.model");
const Customer = require("../models/customer.model");
const Admin = require("../models/admin.model");
const Shop = require("../models/shop.model");
const Order = require("../models/order.model");
const Dummy = require("../models/dummy.model");

const jwtToken = require("../utils");

const authContoller = require("../controller/auth.controller");

const bcrypt = require("bcrypt");

const scripthandle = async (req, res) => {
  //Admin SignUp
  const adminName = req.body.admin.info.fullName;

  const adminEmail = req.body.admin.info.email;

  const adminPassword = req.body.admin.info.password;

  const adminHashedPassword = bcrypt.hashSync(adminPassword, 10);

  const isAlreadyUser = await Customer.findOne({ email: req.body.email });

  const admin = await Admin.create({
    fullName: adminName,
    email: adminEmail,
    password: adminHashedPassword,
  });

  const adminToken = jwtToken({
    id: admin._id,
    email: admin.email,
  });

  //Admin Create Categories and subcategories
  let admin_id = admin._id;

  const categoriesInfo = req.body.admin.categories;

  let category = [];

  let subcategory = [];

  categoriesInfo.forEach(async (categoryItem) => {
    const categoryName = categoryItem.info.name;

    const categoryDescription = categoryItem.info.description;

    const categoryData = {
      name: categoryName,
      description: categoryDescription,
      adminId: admin_id,
    };

    const insertCategoryObj = new Categories(categoryData);

    const categoryResponse = await insertCategoryObj.save();

    category.push(categoryResponse);

    const subcategoriesInfo = categoryItem.sub_categories;

    subcategoriesInfo.forEach(async (subcategoryItem) => {
      const subcategoryName = subcategoryItem.name;

      const subcategoryDescription = subcategoryItem.description;

      const subcategoryData = {
        name: subcategoryName,
        description: subcategoryDescription,
        adminId: admin._id,
        categoryId: categoryResponse._id,
      };

      const subcategoryObj = new Subcategories(subcategoryData);

      const subcategoryResponse = await subcategoryObj.save();

      subcategory.push(subcategoryResponse);
    });
  });

  //Vendor register
  const vendorName = req.body.vendor.info.fullName;

  const vendorEmail = req.body.vendor.info.email;

  const vendorPassword = req.body.vendor.info.password;

  const vendorHashedPassword = bcrypt.hashSync(vendorPassword, 10);

  const vendor = await Vendor.create({
    fullName: vendorName,
    email: vendorEmail,
    password: vendorHashedPassword,
  });

  const vendorToken = jwtToken({
    id: vendor._id,
    email: vendor.email,
  });

  //Vendor create Shop

  const shopName = req.body.vendor.shop.name;

  const shopDescription = req.body.vendor.shop.description;

  const shopAccountHolderName = req.body.vendor.shop.accountHolderName;

  const shopAccountHolderEmail = req.body.vendor.shop.accountHolderEmail;

  const vendorBankName = req.body.vendor.shop.bankName;

  const vendorAccountNo = req.body.vendor.shop.accountNo;

  const vendorCountry = req.body.vendor.shop.country;

  const vendorStreet = req.body.vendor.shop.street;

  const vendorContactNumber = req.body.vendor.shop.contactNumber;

  const shopData = {
    name: shopName,
    description: shopDescription,
    accountHolderName: shopAccountHolderName,
    accountHolderEmail: shopAccountHolderEmail,
    bankName: vendorBankName,
    accountNo: vendorAccountNo,
    country: vendorCountry,
    street: vendorStreet,
    contactNumber: vendorContactNumber,
    vendorId: vendor._id,
  };

  const insertShop = new Shop(shopData);

  const shop = await insertShop.save();

  //Vendor Create Product
  const productInfo = req.body.vendor.product;

  const products = [];

  productInfo.forEach(async (productItem) => {
    const productName = productItem.name;
    const productDescription = productItem.description;
    const productPrice = productItem.price;
    const productSaleprice = productItem.salePrice;
    const productQuantity = productItem.quantity;
    const categoryid = category[0];
    const subcategoryid = subcategory[0];

    const productData = {
      name: productName,
      description: productDescription,
      price: productPrice,
      salePrice: productSaleprice,
      quantity: productQuantity,
      vendorId: vendor._id,
      categoryId: categoryid._id,
      subcategoryId: subcategoryid._id,
      shopId: shop._id,
    };

    const insertProduct = new Product(productData);

    const productResponse = await insertProduct.save();

    products.push(productResponse);
  });

  //Customer register
  const customerName = req.body.customer.info.fullName;

  const customerPassword = req.body.customer.info.password;

  const customerHashedPassword = bcrypt.hashSync(customerPassword, 10);

  const customerEmail = req.body.customer.info.email;

  const customer = await Customer.create({
    fullName: customerName,
    email: customerEmail,
    password: customerHashedPassword,
  });

  const customerToken = jwtToken({
    id: customer._id,
    email: customer.email,
  });

  //Customer place an order
  const customerContactNumber = req.body.customer.order.contactNumber;

  const customerBillingAddress = req.body.customer.order.BillingAddress;

  const customerShippingAddress = req.body.customer.order.ShippingAddress;

  const customerDeliverySchedule = req.body.customer.order.DeliverySchedule;

  const customerOrderNote = req.body.customer.order.OrderNote;

  const customerShippingCharge = req.body.customer.order.ShippingCharge;

  const customerTax = req.body.customer.order.Tax;

  const customerTotal = req.body.customer.order.Total;

  const orderData = {
    contactNumber: customerContactNumber,
    BillingAddress: customerBillingAddress,
    ShippingAddress: customerShippingAddress,
    DeliverySchedule: customerDeliverySchedule,
    OrderNote: customerOrderNote,
    ShippingCharge: customerShippingCharge,
    Tax: customerTax,
    Total: customerTotal,
    customerId: customer._id,
    productId: products[0]._id,
  };

  const insertOrder = new Order(orderData);

  const order = await insertOrder.save();

  res.status(200).json({
    admin,
    adminToken,
    category,
    subcategory,
    vendor,
    vendorToken,
    shop,
    products,
    customer,
    customerToken,
    order,
  });
};

const getOrders = async (req, res) => {
  const shopId = "6538c6bf33170bd4501ca4c5";

  const orders = await Order.find({
    productId: {
      $in: (
        await Product.find({ shopId: shopId })
      ).map((product) => product._id),
    },
  }).populate("productId");

  res.status(200).json(orders);
};

const addData = async (req, res) => {
  console.log("items", req.body);

  const totalItems = req.body.items;

  const items = [];

  for (let i = 1; i <= totalItems; i++) {
    const itemData = {
      name: `Product${i}`,
      price: i,
      color: "red",
      size: "medium",
    };

    const responseData = await Dummy.create(itemData);

    items.push(responseData);
  }

  return res.status(200).json(items);
};

const getDummyData = async (req, res) => {
  const pageNumber = parseInt(req.query.page);

  const pageSize = parseInt(req.query.size);

  const totalProducts = await Dummy.countDocuments();

  let startIndex = pageNumber * pageSize;

  let endIndex = (pageNumber + 1) * pageSize;

  const result = {};

  result.totalProducts = totalProducts;

  if (startIndex > 0) {
    result.previous = {
      pageNumber: pageNumber - 1,
      pageSize: pageSize,
    };
  }

  if (endIndex < totalProducts) {
    result.next = {
      pageNumber: pageNumber + 1,
      pageSize: pageSize,
    };
  }

  result.data = await Dummy.find().skip(startIndex).limit(pageSize);

  result.rowsPerPage = pageSize;

  console.log(pageNumber, pageSize);

  res.status(200).json(result);
};

const fetchDataQuantity = async (req, res) => {
  const quantity = await Dummy.countDocuments();
  return res.status(200).json({ quantity: quantity });
};

const deleteData = async (req, res) => {
  const result = await Dummy.deleteMany();
  res.status(200).json("deleted");
};

module.exports = {
  scripthandle,
  getOrders,
  addData,
  getDummyData,
  deleteData,
  fetchDataQuantity,
};
