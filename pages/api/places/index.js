// import { db_places } from "../../../lib/db_places";
import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const place = await Place.find();
      response.status(200).json(place);
    } catch (error) {
      console.error("Error handling request: ", error);
      response.status(404).json({ error: "Internal Server Error" });
    }
    return;
  }

  if (request.method === "POST") {
    try {
      await Place.create(request.body);
      response.status(201).json({ status: "New place successfully added!" });
    } catch (error) {
      console.error("Error handling request: ", error);
      response.status(404).json({ error: "Error while adding new place" });
    }
  }
}
