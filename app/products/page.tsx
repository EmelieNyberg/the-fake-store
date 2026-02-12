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
    const sp = await searchParams;

    ////// PAGINATION //////

    const page = Number(sp.page ?? 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    ////// SORT BY //////

    // validate sortBy with Product-keys. "as const" makes it readonly.
    const allowedSortFields = [
        "id",
        "title",
        "description",
        "category",
        "price",
        "images",
    ] as const;

    // NYTT
    type SortField = typeof allowedSortFields[number]; //=> "id" | "title" | "description"...(https://mimo.org/glossary/typescript/typeof-type-operator)

    // TS req that we check unknown values before it allows the value, therefore this function (returns true | false).
    // value: unknown (needed since anyhing can be put in the url, eg sortBy=title sortBy=banana sortBy=123)
    // value is SortField (promise to TS "if this function ends with true, I promise value is a SortField")
    // typeof checks type eg "string" "number" "undefined"
    // allowedSortFields.includes(value) checks if array includes value
    // as readonly string[] = pure TS promise
    // If typeof value is a string and the value is included in allowedSortFields = true
    function isSortField(value: unknown): value is SortField {
        return (
            typeof value === "string" && (allowedSortFields as readonly string[]).includes(value)
        );
    }

    const sortBy = sp.sortBy;

    // NYTT
    // if isSortField = true, fieldName=sortBy otherwise fieldName=undefined
    const fieldName: SortField | undefined = isSortField(sortBy)
        ? sortBy
        : undefined;

    ////// ORDER //////

    // If not asc or desc order is undefind, eg if I write banana, banana will be = undefined
    const order = sp.order === "asc" || sp.order === "desc" ? sp.order : undefined;

    const productsList = await getProducts({ limit, skip, fieldName, order });

    return (
        <main className="container mx-auto">
            {/* for dev only */}
            <div>page: {page}, skip: {skip}, fieldname: {fieldName}, order: {order}</div>
            <ul className="mt-10 grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] auto-rows-fr">
                {productsList.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </main>
    );
}