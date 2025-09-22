import { api } from "@/lib/axios";
import { CreateProductRequest, CreateProductResponse, PaginatedResponse, Product } from "@/types/productosTypes";

export const getPaginatedProducts = async (businessId: string, page = 1, limit = 10, q = "") => {
     const { data } = await api.get<PaginatedResponse<Product>>(`products/${businessId}/products`, {
          params: { page, limit, q },
     });

     return data;
};

export async function createProduct(payload: CreateProductRequest) {
     const { data } = await api.post<CreateProductResponse>("/products", payload);
     return data;
}
