// api/products.ts
import { Product } from "@/types/product";

const URL_API = "https://dummyjson.com";

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

// keyof is TS and finds all key products in type Product, like this: 
//keyof Product === "id" | "title" | "description" | "category" | "price" | "images"
// This means only those keys are allowed to send as prop.
// ? = not mandatory
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
        // This line of kode creates an object to be able to build and handle query parameters (?page=2&sortBy=price)
        const params = new URLSearchParams();

        // if no sort: /products?limit=10&skip=10
        // params.set()= update url with limit=10
        // eg params.set("limit", "10"); = limit=10 (now hardcoaded and defult)
        params.set("limit", limit.toString());
        params.set("skip", skip.toString());

        // Only add if they exist
        // if sort:/products?limit=10&skip=10&sortBy=price&order=asc
        if (fieldName) params.set("sortBy", String(fieldName));
        if (order) params.set("order", order);

        // building the final url
        const url = `${URL_API}/products?${params.toString()}`;

        // no-store to always have fresh data to be able to use pagination and sort
        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`Could not fetch products (${response.status})`);
        }
        //Make data in JSON format and return
        return await response.json();

    } catch (error) {
        console.error("Error while fetching products: ", error);
        throw error;
    }
}











//     try {
//         const response = await fetch(`${URL_API}/products?limit=${limit}&skip=${skip}&sortBy=${fieldName}&order=${order}`, {
//             cache: "no-store",
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










//     // NYTT
//     const url = new URL("https://dummyjson.com/products");

//     url.searchParams.set("limit", String(limit));
//     url.searchParams.set("skip", String(skip));

//     if (fieldName) {
//         url.searchParams.set("sortBy", fieldName);
//     }

//     if (order) {
//         url.searchParams.set("order", order);
//     }

//     //Loggar för att se hela min url
//     console.log("Fetching products from:", url.toString());

//     const response = await fetch(url.toString(), {
//         cache: "no-store", // viktig när du har searchParams som varierar
//     });

//     if (!response.ok) {
//         const text = await response.text().catch(() => "");
//         console.error("Fetch failed:", response.status, response.statusText, text);
//         throw new Error("Could not fetch products");
//     }

//     return response.json();
// }












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
        const response = await fetch(`${URL_API}/products/${id}`, {
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