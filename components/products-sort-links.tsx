// components/products-sort-links.tsx
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// type ProductsSortLinksProps = {
//     currentSort?: "price_asc" | "price_desc";
// };

export default function ProductsSortLinks() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort");


    const createSortURL = (sort?: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // reset pagination när sort byts
        params.delete("page");

        if (!sort) {
            params.delete("sort")
        }
        else { params.set("sort", sort) };

        const qs = params.toString(); // Return här direkt
        return `${pathname}?${qs}`;
    };

    return (
        <div className="flex gap-4 pt-6">
            <Link
                href={createSortURL(undefined)}
                className={!currentSort ? "font-bold text-blue-300" : ""}
            >
                No filter
            </Link>

            <Link
                href={createSortURL("price_asc")}
                className={currentSort === "price_asc" ? "font-bold text-blue-300" : ""}
            >
                Price ↑
            </Link>

            <Link
                href={createSortURL("price_desc")}
                className={currentSort === "price_desc" ? "font-bold text-blue-300" : ""}
            >
                Price ↓
            </Link>
        </div>
    );
}