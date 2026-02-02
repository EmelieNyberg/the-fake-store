// api/products.ts
import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch("https://api.escuelajs.co/api/v1/products");

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