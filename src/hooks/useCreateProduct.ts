import { createProduct } from "@/services/productService";
import { CreateProductRequest, CreateProductResponse } from "@/types/productosTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateProduct() {
     const queryClient = useQueryClient();

     return useMutation<CreateProductResponse, Error, CreateProductRequest>({
          mutationFn: (payload) => createProduct(payload),
          onSuccess: () => {
               // refetch products after a product is created
               queryClient.invalidateQueries({ queryKey: ["products"] });
          },
     });
}
