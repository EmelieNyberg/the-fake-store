// app/products/[id]/page.tsx
import { getProduct } from "@/api/products";
import ProductBuyBtn from "@/components/product-buy-btn";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const product = await getProduct({ id });

    if (!product) notFound();

    return (
        <main className="container mx-auto py-3">
            <Link href="/products" className="inline-block text-white font-bold transition-transform duration-200 hover:-translate-x-1">← Back</Link>
            <article>
                <div className="py-3 grid gap-10 md:grid-cols-2 md:items-center md:pt-10">
                    <div className="relative h-[50vh] w-full">
                        <Image
                            src={product.images[0]}
                            alt={product.title}
                            className="object-cover rounded"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className="grid gap-10">
                        <h1 className="text-4xl font-bold">{product.title}</h1>
                        <p className="text-3xl font-bold">$ {product.price}</p>
                        <p className="text-pretty">{product.description}</p>
                        <p>Category: {product.category}</p>

                        <ProductBuyBtn />

                    </div>
                </div>
                <div className="flex gap-3">
                    {/* Fortsätt här */}
                    {product.images.map((image, index) => (
                        <Image
                            key={index}
                            src={image}
                            alt={product.title}
                            width={300}
                            height={300}
                            className="w-30" />
                    ))}
                </div>
            </article>
        </main>
    );
};