import { getPaginatedProducts } from "@/services/productService";
import { PaginatedResponse, Product } from "@/types/productosTypes";
import { useQuery } from "@tanstack/react-query";

export default function useProductsHook(businessId: string, page: number, limit: number, query: string) {
     return useQuery<PaginatedResponse<Product>, Error>({
          queryKey: ["products", businessId, page, limit, query],
          queryFn: () => getPaginatedProducts(businessId, page, limit, query),
          placeholderData: (prev) => prev,
     });
}
