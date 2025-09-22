export interface Product {
     id: string;
     businessId: string;
     brand: string;
     model: string;
     variant?: string;
     ram: string;
     storage: string;
     processor?: string;
     display?: string;
     mainCameraMp?: number;
     frontCameraMp?: number;
     batteryMah?: number;
     features?: string;
     price: string;
     stock: number;
     description?: string;
     imageUrl?: string;
     createdAt: string;
     updatedAt: string;
}

export interface PaginationMeta {
     total: number;
     totalPages: number;
     currentPage: number;
     pageSize: number;
}

export interface PaginatedResponse<T> {
     data: T[];
     meta: PaginationMeta;
}

export interface CreateProductRequest {
     brand: string;
     model: string;
     variant?: string;
     ram: string;
     storage: string;
     processor?: string;
     display?: string;
     mainCameraMp?: number;
     frontCameraMp?: number;
     batteryMah?: number;
     features?: string;
     price: number;
     stock: number;
     description?: string;
     imageUrl?: string;
}

export type CreateProductResponse = Product;
