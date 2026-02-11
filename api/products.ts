// api/products.ts
import { Product } from "@/types/product";

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export async function getProducts(): Promise<ProductsResponse> {
    try {
        // const response = await fetch(`https://api.escuelajs.co/api/v1/products?limit=${limit ?? 10}&offset=5`, {
        const response = await fetch(`https://dummyjson.com/products?limit=10`, {
            cache: "force-cache",
        });

        if (!response.ok) {
            console.log(response);
            throw new Error("Could not fetch products");
        }

        //Make data in JSON format and return
        return await response.json();

    } catch (error) {
        console.error("Error while fetching products: ", error);
        throw error;
    }
};