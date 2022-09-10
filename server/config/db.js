const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB);
  console.log(`MONGODB CONNECTED : ${conn.connection.host.cyan.underline.bold}`);
};

module.exports = connectDB;
