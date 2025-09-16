import ProductsTable from "@/components/InventoryTable";
import MainLayout from "@/layout/MainLayout";
import React from "react";

export default function page() {
     return (
          <MainLayout title="Inventario">
               <ProductsTable />
               {/* 
               Acciones rápidas
               •	Ajuste de stock: +/- N con motivo (“ingreso”, “corrección”, “venta sin boleta”, etc.).
               (Para el MVP, puedes hacer un simple patch de stock; si luego quieres bitácora, agregamos tabla StockMovement.)
               Importar/Exportar (opcional MVP)
               •	CSV/Excel (brand, model, ram, storage, price, stock, …).
               •	Validación de columnas mínimas (brand, model, ram, storage, price, stock).
               */}
          </MainLayout>
     );
}
