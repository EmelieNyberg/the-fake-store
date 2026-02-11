// components/product-card.tsx

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <li>
            <Link href={`/products/${product.id}`}>
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    height={500}
                    width={500}
                    className="rounded"
                />
                <h3 className="font-bold truncate">{product.title}</h3>
                <p>$ {product.price}</p>
            </Link>
        </li>
    );
}