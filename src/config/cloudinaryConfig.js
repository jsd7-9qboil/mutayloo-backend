import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: process.env.CLOUDINARY_FOLDER_NAME,
		allowed_formats: ["jpg", "png", "jpeg"],
		transformation: [{ width: 500, height: 500, crop: "limit" }],
		upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
	},
});

export { cloudinary, storage };