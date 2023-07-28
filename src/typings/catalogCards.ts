export interface CatalogCardNesting {
  _id: string;
  title: string;
  descrip: string;
  fullDescrip?: string;
  imgUrl: string[];
  viewsCount: number;
  likes?: number;
  theme: string;
  price: number;
}
export interface CreatingCatalogCard extends CatalogCardNesting {
  success: boolean;
  message: string;
  status: number;
}
export enum cardThemes {
  neon = "Neon decor",
  plywood = "Wood cutting",
  laserEngr = "Laser engraving",
  furniture = "Furniture",
  volPrinter = "3D-printer",
  reliefPics = "Relief pictures",
  some = "",
}
