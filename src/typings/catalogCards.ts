export interface CatalogCardNesting {
  _id: string;
  title: string;
  descrip: string;
  fullDescrip?: string;
  styles: string[];
  imgUrl: string[][];
  viewsCount: number;
  likes?: number;
  theme: string;
}
export enum cardThemes {
  neon = "Neon decor",
  plywood = "Wood cutting",
  laserEngr = "Laser engraving",
  furniture = "Furniture",
  volPrinter = "3D-printer",
  reliefPics = "Relief pictures",
  some = "-",
}
