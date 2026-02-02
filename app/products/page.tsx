// app/products/page.tsx
import { getProducts } from "@/api/products";
import ProductCard from "@/components/product-card";

export default async function ProductsPage() {
    const productsList = await getProducts();

    return (
        <main>
            <ul className="mt-10 grid gap-8 grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] auto-rows-fr">
                {productsList.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </main>
    )
}