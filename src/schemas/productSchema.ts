import { z } from "zod";

export const createProductSchema = z.object({
     brand: z.string().min(1, "La marca es obligatoria"),
     model: z.string().min(1, "El modelo es obligatorio"),
     variant: z.string().optional(),
     ram: z.string().min(1, "La RAM es obligatoria"),
     storage: z.string().min(1, "El almacenamiento es obligatorio"),
     processor: z.string().optional(),
     display: z.string().optional(),

     // SIN coerce, solo validación
     mainCameraMp: z.number().min(0).optional(),
     frontCameraMp: z.number().min(0).optional(),
     batteryMah: z.number().min(0).optional(),

     features: z.string().optional(),
     price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
     stock: z.number().min(0, "El stock debe ser mayor o igual a 0"),
     description: z.string().optional(),
     // Permitir cadena vacía: la preprocesamos a undefined para que la validación
     // de URL no falle cuando el campo esté vacío en el formulario.
     imageUrl: z.preprocess(
          (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
          z.string().url("Debe ser una URL válida").optional()
     ),
});

export type CreateProductForm = z.infer<typeof createProductSchema> & {
     mainCameraMp?: number;
     frontCameraMp?: number;
     batteryMah?: number;
     price: number;
     stock: number;
};
