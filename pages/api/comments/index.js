import dbConnect from "../../../db/connect";
import Comment from "../../../db/models/Comment";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const newComment = await Comment.create(request.body);

      // Kommentar zu "Place" hinzufügen (comments-Array)
      await Place.findByIdAndUpdate(newComment.place, {
        $push: { comments: newComment._id },
      });

      response.status(201).json(newComment);
    } catch (error) {
      console.error("Error adding comment: ", error);
      response.status(400).json({ error: "Error adding comment" });
    }
  }

  if (request.method === "DELETE") {
    const { commentId } = request.query; // commentId vom Frontend übergeben

    console.log("COMMENT ID:", commentId);

    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);

      if (!deletedComment) {
        return response.status(404).json({ error: "Comment not found" });
      }

      // Kommentar aus "Place" entfernen
      await Place.findByIdAndUpdate(deletedComment.place, {
        $pull: { comments: commentId },
      });

      response.status(200).json({ message: "Comment successfully deleted" });
    } catch (error) {
      console.error("Error deleting comment: ", error);
      response.status(400).json({ error: "Error deleting comment" });
    }
  }
}
