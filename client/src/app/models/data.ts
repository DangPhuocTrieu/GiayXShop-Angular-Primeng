import { Product } from "./product";
import { Review } from "./review";

export interface DataServer {
    success: boolean;
    message: string;
    data?: Product[] | Product
}