import { connectDB } from "@/lib/db";
import { Item } from "@/models/items";

export async function GET(request: Request) {
  try {
    // Establish a connection to the database
    await connectDB();

    // Retrieve all items from the database
    const items = await Item.find({});

    // Return the fetched items as a JSON response with a 200 status code
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    // Handle any errors by returning a 500 Internal Server Error response
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
