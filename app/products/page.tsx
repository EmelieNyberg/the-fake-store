// app/products/page.tsx

import { getProducts } from "@/api/products";
import ProductCard from "@/components/product-card";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: {
        page?: string;
        sortBy?: string;
        order?: string;
    };
}) {
    const sp = searchParams;

    const page = Number(sp.page ?? 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    // validate sortBy with Product-keys. "as const" makes it readonly.
    const allowedSortFields = [
        "id",
        "title",
        "description",
        "category",
        "price",
        "images",
    ] as const;

    const fieldName = allowedSortFields.includes(sp.sortBy)
        ? sp.sortBy
        : undefined;

    // If not asc or desc order is undefind, eg if i write banana, banana will be = undefined
    const order = sp.order === "asc" || sp.order === "desc" ? sp.order : undefined;

    const productsList = await getProducts({ limit, skip, fieldName, order });

    return (
        <main className="container mx-auto">
            {/* for dev only */}
            <div>page: {page}, skip: {skip}</div>
            <ul className="mt-10 grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] auto-rows-fr">
                {productsList.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </main>
    );
}