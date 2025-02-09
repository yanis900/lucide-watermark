import Link from "next/link";
import {
  ArrowRight,
  Download,
  Heart,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { SvgComponent } from "./SvgComponent";
import { download } from "@/lib/download";
import { getTimeDifference } from "@/lib/utils";
import { fetchItems } from "@/handlers/fetch";

export default function Community() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItems();
      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-700">
            From the Community
          </h1>
          <div className="flex items-center gap-4">
            <Select defaultValue="recent">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
            {/* <Link
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link> */}
            {/* <Button onClick={fetchItems}>GET</Button> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <Card key={i} className="group overflow-hidden bg-white">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] border flex items-center justify-center">
                  <SvgComponent svgData={item.svgData} />
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
                          className="h-8 w-8 bg-white/90 hover:bg-white"
                          onClick={fetchItems}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Design Title</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        className="h-6 w-6 rounded-full border"
                        src={item.user.picture}
                        alt="profile"
                      />
                      <span className="text-sm text-gray-600">user</span>
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
