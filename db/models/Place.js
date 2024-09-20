import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  image: { type: String },
  mapURL: { type: String },
  description: { type: String },
  // comments: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId, // Referenz auf Kommentardokumente
  //     ref: "Comment", // das Modell noch erstellen!
  //   },
  // ],
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
