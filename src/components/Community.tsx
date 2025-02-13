import { useUser } from "@auth0/nextjs-auth0/client"; // Use the correct authentication library
import { ArrowRight, Download, Heart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { download, getTimeDifference } from "@/lib/utils";
import { fetchItems } from "@/handlers/fetch";
import Link from "next/link";

export interface Item {
  _id: string;
  svgData: string;
  pngData: string;
  user: {
    name: string;
    picture: string;
  };
  createdAt: string;
  likes: number;
  likedBy: string[];
}

export default function Community() {
  const [items, setItems] = useState<Item[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItems();
      console.log("Fetched items:", data);
      setItems(data);
    };

    fetchData();
  }, []);

  const handleChange = (value: string) => {
    if (value === "recent") {
      setItems((prevItems) =>
        [...prevItems].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } else if (value === "popular") {
      setItems((prevItems) => [...prevItems].sort((a, b) => b.likes - a.likes));
    }
  };

  const handleLike = async (itemId: string, index: number) => {
    if (!user) {
      alert("You must be logged in to like items!");
      return;
    }

    try {
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, userId: user.sub }),
      });

      if (!response.ok) throw new Error("Failed to like item");

      const data = await response.json();

      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index
            ? { ...item, likes: data.likes, likedBy: data.likedBy }
            : item
        )
      );
    } catch (error) {
      console.error("Error liking item:", error);
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-700">
            From the Community
          </h1>
          <div className="flex items-center gap-4">
            <Select onValueChange={handleChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <Card key={item._id} className="group overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] border flex items-center justify-center">
                  <img src={item.pngData} alt="SVG Preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 bg-white/90 hover:bg-white"
                          onClick={() => download(item.svgData)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className={`h-8 w-8 bg-white/90 hover:bg-white ${
                            user && user.sub && item.likedBy.includes(user.sub)
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                          onClick={() => handleLike(item._id, i)}
                        >
                          <Heart
                            className="h-4 w-4"
                            fill={
                              user &&
                              user.sub &&
                              item.likedBy.includes(user.sub)
                                ? "red"
                                : "none"
                            }
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Design Title</h3>
                    <span className="text-sm text-gray-600">
                      {item.likes} likes
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        className="h-6 w-6 rounded-full border"
                        src={item.user.picture}
                        alt="profile"
                      />
                      <span className="text-sm text-gray-600">
                        {item.user.name.length > 10 ? item.user.name.substring(0, 10) + "..." : item.user.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {getTimeDifference(item.createdAt)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
