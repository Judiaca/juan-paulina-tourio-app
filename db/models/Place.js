import mongoose from "mongoose";

const { Schema } = mongoose;
const placeSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
  comments: { type: Array, required: true },
  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId, // Referenz auf Kommentardokumente
  //     ref: "Comment", // das Modell noch erstellen!
  //   },
  // ],
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);
export default Place;
