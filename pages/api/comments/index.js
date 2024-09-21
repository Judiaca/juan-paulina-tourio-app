// import dbConnect from "../../../db/connect";
// import Comment from "../../../db/models/Comments";

// export default async function handler(request, response) {
//   await dbConnect();

//   if (request.method === "GET") {
//     const comment = await Comment.find();

//     if (!comment) {
//       return response.status(404).json({ error: "Place not found" });
//     }

//     return response.status(200).json(comment);
//   }
// }
