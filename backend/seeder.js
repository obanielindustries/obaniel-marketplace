import axios from "axios";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";

// read .env files and variables
dotenv.config();

// ensure connection to the server
connectDB();

const importData = async () => {
  try {
    // Clear existing data to start fresh
    await Product.deleteMany();
    console.log("Database cleared of old products...");

    // 3. Fetch products from DummyJSON API
    console.log("Fetching 100 products from DummyJSON API...");
    const { data } = await axios.get(
      "https://dummyjson.com/products?limit=194",
    );
    const externalProducts = data.products;

    // find any adminUser and assign the products to him/her
    const adminUser = await User.findOne({ isAdmin: true });

    // if no user, just go back
    if (!adminUser) {
      console.error("ERROR: No Admin user found! ❌");
      console.log(
        'Please double-check Atlas to ensure "isAdmin" is set to true for your user.',
      );
      process.exit(1);
    }

    // 5. Transform data from the website, to match productSchema
    const sampleProducts = externalProducts.map((p) => {
      return {
        user: adminUser._id, // Linking product to your Admin account
        name: p.title,
        image: p.thumbnail,
        brand: p.brand || "Generic",
        category: p.category,
        description: p.description,
        price: p.price,
        countInStock: p.stock,
        rating: p.rating,
        numReviews: Math.floor(Math.random() * 30) + 1, // Random review count for realism
      };  
    });

    // allow massive import into mongodb
    await Product.insertMany(sampleProducts);

    console.log("SUCCESS: 100 Products Imported Successfully! ✅");
    process.exit(0);
  } catch (error) {
    console.error(`ERROR: ${error.message} ❌`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed! 🗑️");
    process.exit();
  } catch (error) {
    console.error(`ERROR: ${error.message} ❌`);
    process.exit(1);
  }
};

// Check for '-d' flag in terminal: e.g., "node seeder.js -d"
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
