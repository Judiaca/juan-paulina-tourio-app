import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const place = await Place.find();
      response.status(200).json(place);
    } catch (error) {
      console.error("Error handling request:", error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    response.status(405).json({ error: "Method Not Allowed" });
  }
}

// HALLO
