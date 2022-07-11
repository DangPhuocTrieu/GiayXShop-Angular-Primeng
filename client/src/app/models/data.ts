import { Product } from "./product";
import { Review } from "./review";

export interface DataServer {
    success: boolean;
    status?: string;
    message: string;
    data?: Product[] | Product
}