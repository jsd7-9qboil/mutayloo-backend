import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory, adjust as needed
const upload = multer({ storage });

export default upload;
