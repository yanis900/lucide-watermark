export interface Item {
  svgData: string;
  pngData: string;
  user: {
    name: string;
    picture: string;
  };
  createdAt: string;
  likes: number;
};
