// api/products.ts
import { Product } from "@/types/product";

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

// keyof is TS and finds all key products in type Product, like this: 
//keyof Product === "id" | "title" | "description" | "category" | "price" | "images"
// This means only those keys are allowed to send as prop.
export async function getProducts({
    limit,
    skip,
    fieldName,
    order,
}: {
    limit: number;
    skip: number;
    fieldName?: keyof Product;
    order?: "asc" | "desc";
}): Promise<ProductsResponse> {
    try {
        // const response = await fetch(`https://api.escuelajs.co/api/v1/products?limit=${limit ?? 10}&offset=5`, {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=${fieldName}&order=${order}`, {
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














// export async function getProducts({
//     limit,
//     skip,
// }: {
//     limit: number;
//     skip: number;
// }): Promise<ProductsResponse> {
//     try {
//         // const response = await fetch(`https://api.escuelajs.co/api/v1/products?limit=${limit ?? 10}&offset=5`, {
//         const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, {
//             cache: "force-cache",
//         });

//         if (!response.ok) {
//             console.log(response);
//             throw new Error("Could not fetch products");
//         }

//         //Make data in JSON format and return
//         return await response.json();

//     } catch (error) {
//         console.error("Error while fetching products: ", error);
//         throw error;
//     }
// };


// NY

export async function getProduct({
    id,
}: {
    id: string;
}): Promise<Product> {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
            cache: "force-cache", //Kanske räcker med en gång?
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