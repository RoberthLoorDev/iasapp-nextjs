import React from "react";

export default function page() {
     return (
          <div>
               Ventas
               {/* 4) Ventas (registro y listado)
                    Objetivo: registrar ventas con línea(s) de producto y ver historial básico.
                */}
               {/* 

               4.1 Registrar venta (form principal)
                    •	Cliente: customerCedula, customerName, customerPhone.
                    •	Items: buscador de productos (auto-complete por brand/model), seleccionar quantity, unitPrice precargado desde Product.price (editable).
                    •	Totales: calcular subtotal = Σ (qty*unitPrice), ivaAmount = subtotal * ivaRate, total = subtotal + ivaAmount.
                            -	ivaRate: seleccionar (config de negocio) o predefinir en formulario (se guarda en Sale.ivaRate).
                    •	paymentMethod: texto/selector (efectivo, tarjeta, transferencia).
                    •	invoiceNumber: opcional (si no, se puede asignar luego).
                    •	status: default "completed"; permitir "voided" para anuladas.
               */}
               {/* 
               
               Al guardar:
                    1.	Crea Sale con totales y datos de cliente.
                    2.	Crea SaleItem[].
               */}
               {/* 
               
               4.2 Historial de ventas (tabla)
                    •	Columnas: fecha, invoiceNumber, customerName, items (#), subtotal, ivaAmount, total, paymentMethod, status.
                    •	Filtros: rango fechas, método de pago, status, cliente.
                    •	Ver detalle: muestra SaleItem[] con Product.brand/model, cantidad y precios.

               */}
          </div>
     );
}
