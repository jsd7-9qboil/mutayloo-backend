import mongoose from "mongoose";

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		("Connected successfully 🟢");
	} catch (error) {
		console.error("Error connecting to MongoDB 🔴:", error);
		process.exit(1);
	}
};

export default connectDB;
