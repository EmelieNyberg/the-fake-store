// components/products-pagination.tsx

// import { getProducts } from "@/api/products";

// export default async function ProductsPage({
//   searchParams,
// }: {
//   searchParams: { page?: string };
// }) {
//   const page = Number(searchParams.page ?? 1);
//   const limit = 10;
//   const skip = (page - 1) * limit;

//   const products = await getProducts({ limit, skip });

//   return (
//     <ul>
//       {products.map(p => (
//         <li key={p.id}>{p.title}</li>
//       ))}
//     </ul>
//   );
// }




















// "use client";

// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";

// type ProductPaginationProps = {
//     page: number;
//     totalPages: number;
// };

// export default function ProductsPagination({ page, totalPages }: ProductPaginationProps) {
//     const pathname = usePathname();
//     const searchParams = useSearchParams();

//     const createPageURL = (pageNumber: number) => {
//         const params = new URLSearchParams(searchParams.toString());

//         if (pageNumber <= 1) params.delete("page");
//         else params.set("page", pageNumber.toString());

//         const qs = params.toString();
//         return qs ? `${pathname}?${qs}` : pathname;
//     };

//     const isFirst = page <= 1;
//     const isLast = page >= totalPages;

//     return (
//         <div className="flex items-center gap-2">
//             <Link
//                 href={createPageURL(page - 1)}
//                 aria-disabled={isFirst}
//                 tabIndex={isFirst ? -1 : 0}
//                 className={`inline-flex items-center rounded-md border px-3 py-2 text-sm ${isFirst ? "pointer-events-none opacity-40" : "hover:bg-gray-50"
//                     }`}
//             >
//                 ←
//             </Link>

//             <Link
//                 href={createPageURL(page + 1)}
//                 aria-disabled={isLast}
//                 tabIndex={isLast ? -1 : 0}
//                 className={`inline-flex items-center rounded-md border px-3 py-2 text-sm ${isLast ? "pointer-events-none opacity-40" : "hover:bg-gray-50"
//                     }`}
//             >
//                 →
//             </Link>
//         </div>
//     );
// }