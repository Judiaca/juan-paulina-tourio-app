// // import { db_places } from "../../../../lib/db_places";
// // import { db_comments } from "../../../../lib/db_comments";
import dbConnect from "../../../../db/connect";
import Place from "../../../../db/models/Place";
import Comment from "../../../../db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (!id) {
    return;
  }

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ error: "Place not found" });
    }

    // IDs von Kommentaren aus "place" abrufen:
    const commentIds = place.comments.map((comment) => comment);
    // Kommentare anhand ID abrufen:
    const comments = await Comment.find({ _id: { $in: commentIds } });

    return response.status(200).json({ place, comments });
  }

  if (request.method === "PATCH") {
    const updatedPlace = await Place.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!updatedPlace) {
      return response.status(404).json({ error: "Place not found" });
    }

    return response.status(200).json(updatedPlace);
  }

  if (request.method === "DELETE") {
    const deletedPlace = await Place.findByIdAndDelete(id);

    if (!deletedPlace) {
      return response.status(404).json({ error: "Place not found" });
    }

    return response.status(200).json({ message: "Place successfully deleted" });
  }

  // **************************************************************************
  // **************************************************************************
}

// ALTE DATEN:

// const place = db_places.find((place) => place._id.$oid === id);
// const comment = place?.comments;
// const allCommentIds = comment?.map((comment) => comment.$oid) || [];
// const comments = db_comments.filter((comment) =>
//   allCommentIds.includes(comment._id.$oid)
// );

// if (!place) {
//   return response.status(404).json({ status: "Not found" });
// }

// response.status(200).json({ place: place, comments: comments });
// }

/**************************************************************
 /************************* GET *******************************

  if (request.method === "GET") {
    // const place = await Place.findById(id).populate("comments");
     const place = await Place.findById(id);
         
    if (!place) {
      return response.status(404).json({ error: "Place not found" });
    }

    // v
    const comments = await Comment.find({placeId: id})
    return response.status(200).json(place);
  }

/*******************************************************************/

// ********************** PATCH:
/******************************
if (request.method === "PATCH") {
  // Handle adding a new comment
  if (request.body.name && request.body.comment) {
    const { name, comment } = request.body;

    const newComment = await Comment.create({ name, comment, place: id });

    // Update the place with the new comment ID
    await Place.findByIdAndUpdate(id, { $push: { comments: newComment._id } });

    return response.status(200).json(newComment);
  } else {
    // Handle updating the place itself
    const updatedPlaceData = request.body;
    const updatedPlace = await Place.findByIdAndUpdate(id, updatedPlaceData, {
      new: true,
    });

    if (!updatedPlace) {
      return response.status(404).json({ error: "Place not found" });
    }

    return response.status(200).json(updatedPlace);
  }
}
  ******************************/

// ********************** DELETE:
/******************************
else if (request.method === "DELETE") {
  const deletedPlace = await Place.findByIdAndDelete(id);

  if (!deletedPlace) {
    return response.status(404).json({ error: "Place not found" });
  }

  // Also delete associated comments
  await Comment.deleteMany({ place: id });

  return response
    .status(200)
    .json({ message: "Place and associated comments deleted successfully" });
}
******************************/
