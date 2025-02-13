import { connectDB } from "@/lib/db";
import { Item } from "@/models/items";

export async function POST(request: Request) {
  try {
    const { itemId, userId } = await request.json();

    if (!itemId || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing itemId or userId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectDB();

    const item = await Item.findById(itemId);
    if (!item) {
      return new Response(JSON.stringify({ error: "Item not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!Array.isArray(item.likedBy)) {
      item.likedBy = [];
    }

    const hasLiked = item.likedBy.includes(userId);

    if (hasLiked) {
      item.likedBy = item.likedBy.filter((id: string) => id !== userId);
      item.likes = Math.max(0, item.likes - 1);
    } else {
      item.likedBy.push(userId);
      item.likes += 1;
    }

    await item.save();

    return new Response(
      JSON.stringify({
        message: "Success",
        likes: item.likes,
        likedBy: item.likedBy,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
