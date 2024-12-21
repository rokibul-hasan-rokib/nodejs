import mongoose from "mongoose";
import colors from "colors";

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {});
    console.log(
      `Database Connected Successfully ${conn.connection.host}`.bgBlue
    );
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

export default dbConnect;

