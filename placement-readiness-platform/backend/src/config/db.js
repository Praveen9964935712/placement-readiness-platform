const mongoose = require("mongoose");

const connectDB = async () => {
  const atlasUri = process.env.MONGO_URI;
  const localUri = process.env.MONGO_LOCAL_URI || "mongodb://127.0.0.1:27017/placement_platform";

  try {
    await mongoose.connect(atlasUri, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 15000,
      connectTimeoutMS: 15000
    });

    process.env.DB_SOURCE = "atlas";
    console.log("✅ MongoDB Connected");
  } catch (atlasError) {
    console.warn("⚠️ Atlas connection failed, falling back to local MongoDB...");
    console.error("🔴 Atlas Error Details:", atlasError.message);

    await mongoose.connect(localUri, {
      serverSelectionTimeoutMS: 5000
    });

    process.env.DB_SOURCE = "local";
    console.log("✅ MongoDB Connected");
  }
};

module.exports = connectDB;