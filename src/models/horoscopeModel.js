import mongoose from "mongoose";
const { Schema } = mongoose;

const horoscopeSchema = new Schema(
  {
    sodiac: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
        type: String,
        required: true,
      },
  },
);



const Horoscope = mongoose.model("Horoscope", horoscopeSchema);
export default Horoscope;
