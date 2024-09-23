import dbConnect from "../../../db/connect";
import Comment from "../../../db/models/Comment";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  console.log("Received Request Body:", request.body);

  if (request.method === "POST") {
    try {
      console.log("Request Body:", request.body);
      // Neuen Kommentar erstellen
      const newComment = await Comment.create(request.body);

      console.log("New Comment:", newComment);

      // Kommentar zur Place-Collection hinzufügen (comments-Array)
      await Place.findByIdAndUpdate(newComment.place, {
        $push: { comments: newComment._id },
      });

      response.status(201).json(newComment);
    } catch (error) {
      console.error("Error adding comment: ", error);
      response.status(400).json({ error: "Error adding comment" });
    }
  }
}
