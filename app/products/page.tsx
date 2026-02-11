// app/products/page.tsx

import { getProducts } from "@/api/products";
import ProductCard from "@/components/product-card";
// import ProductsSortLinks from "@/components/products-sort-links";


export default async function ProductsPage() {

    const productsList = await getProducts();

    return (
        <main className="container mx-auto">
            {/* <ProductsSortLinks currentSort={sort} /> */}

            <ul className="mt-10 grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] auto-rows-fr">
                {productsList.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </main>
    );
}








// // app/products/page.tsx
// import { getProducts } from "@/api/products";
// import ProductCard from "@/components/product-card";
// import ProductsSortLinks from "@/components/products-sort-links";
// import ProductsPagination from "@/components/products-pagination";
// import { Product } from "@/types/product";

// const PER_PAGE = 8;

// function getString(value: string | string[] | undefined) {
//     if (!value) return undefined;
//     return Array.isArray(value) ? value[0] : value;
// }

// function getPositiveInt(value: string | string[] | undefined, fallback: number) {
//     const s = getString(value);
//     const n = s ? Number(s) : NaN;
//     return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
// }

// function sortProducts(products: Product[], sort?: string) {
//     const list = [...products];

//     if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
//     if (sort === "price_desc") list.sort((a, b) => b.price - a.price);

//     return list;
// }

// export default async function ProductsPage({
//     searchParams,
// }: {
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }) {
//     const sp = await searchParams;

//     const sort = getString(sp.sort);
//     const page = getPositiveInt(sp.page, 1);

//     const productsList = await getProducts(4);
//     const sorted = sortProducts(productsList, sort);

//     const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));

//     // ⭐ DENNA ÄR NYCKELN
//     const safePage = Math.min(Math.max(page, 1), totalPages);

//     const start = (safePage - 1) * PER_PAGE;
//     const paginated = sorted.slice(start, start + PER_PAGE);

//     return (
//         <main className="container mx-auto">
//             <ProductsSortLinks />

//             <div className="mt-4 flex items-center justify-between">
//                 <p className="text-sm text-gray-600">
//                     Page {safePage} of {totalPages}
//                 </p>

//                 {/* ⭐ safePage skickas in */}
//                 <ProductsPagination page={safePage} totalPages={totalPages} />
//             </div>

//             <ul className="mt-6 grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] auto-rows-fr">
//                 {paginated.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                 ))}
//             </ul>
//         </main>
//     );
// }