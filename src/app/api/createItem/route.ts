import { connectDB } from "@/lib/db";
import { Item } from "@/models/items";

export async function POST(request: Request) {
  try {
    const { user, svgData, pngData } = await request.json();

    const filteredUser = {
      picture: user.picture,
      name: user.name,
      sid: user.sid,
    };

    if (!user || !svgData || !pngData) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectDB();
    await Item.create({ user: filteredUser, svgData, pngData });

    return new Response(JSON.stringify({ message: "Item Created" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
