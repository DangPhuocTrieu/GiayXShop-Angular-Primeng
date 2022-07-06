import { Product } from "./product";

export interface DataServer {
    success: boolean;
    message: string;
    data?: Product[] | Product
}