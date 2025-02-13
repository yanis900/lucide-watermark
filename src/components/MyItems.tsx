import { Clock, Download, Grid2X2, Heart } from "lucide-react";
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
import { useUser } from "@auth0/nextjs-auth0/client";

export interface Item {
  svgData: string;
  pngData: string;
  user: {
    name: string;
    picture: string;
  };
  createdAt: string;
  likes: number;
}

export default function MyItems() {
  const [items, setItems] = useState<Item[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.name) return;
      const data = await fetchItems();
      console.log("GET Fetched items:", data);
      const userItems = data.filter(
        (item: Item) => item.user.name === user.name
      );
      setItems(userItems);
    };

    fetchData();
  }, [user?.name]);

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

  const total = items.reduce((sum, item) => sum + item.likes, 0);

  console.log(total);
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-700">My Designs</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Grid2X2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{items.length}</div>
                <div className="text-sm text-muted-foreground">
                  Total Designs
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{total}</div>
                <div className="text-sm text-muted-foreground">Total Likes</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mb-8">
          <div className="flex items-center gap-4">
            <Select
              onValueChange={(value) => {
                handleChange(value);
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <Card key={i} className="group overflow-hidden bg-white">
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
                      <span className="text-sm text-gray-600">by you</span>
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
