// app/products/[id]/page.tsx
import { getProducts } from "@/api/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const productsList = await getProducts();
    const product = productsList.find((product) => product.id === +id);

    if (!product) notFound();

    return (
        <main className="container mx-auto">
            <Link href="/products" className="text-white font-bold">⬅ Back</Link>
            <article className="grid gap-10 md:grid-cols-2 md:items-center md:pt-10">
                <div className="relative h-[50vh] w-full md:order-2">
                    <Image
                        src={product.category.image}
                        alt={product.title}
                        className="object-cover border-10 border-white md:order-2"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <h1 className="text-4xl text-center font-bold md:order-1">{product.title}</h1>
                <p className="text-pretty md:col-span-2 md:order-3">{product.description}</p>
            </article>
        </main>
    );
};