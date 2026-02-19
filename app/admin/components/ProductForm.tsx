"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Asegúrate de que este archivo existe
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { saveProduct } from "../actions"; // Ajusta la ruta a tu archivo actions.ts

export function ProductForm({ initialData }: { initialData?: any }) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: initialData || {
      brand: "",
      plan: "",
      priceMXN: 0,
      description: "", // CAMPO CLAVE PARA LOS DETALLES
      group: "PERFILES",
      status: "DISPONIBLE",
      category: "",
      durationMonths: 1
    }
  });

  const onSubmit = async (data: any) => {
    try {
      await saveProduct({ ...data, id: initialData?.id });
      alert("Producto guardado con éxito");
    } catch (error) {
      alert("Error al guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-zinc-700 font-bold">Marca</Label>
          <Input {...register("brand")} placeholder="Ej: Netflix" className="rounded-xl" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-zinc-700 font-bold">Precio (MXN)</Label>
          <Input type="number" {...register("priceMXN")} className="rounded-xl" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-700 font-bold">Plan</Label>
        <Input {...register("plan")} placeholder="Ej: Premium 4K" className="rounded-xl" />
      </div>

      {/* --- EL APARTADO QUE TE FALTABA --- */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-zinc-700 font-bold">Detalles y Recomendaciones</Label>
          <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded font-bold uppercase">Soporta Emojis ✅</span>
        </div>
        <Textarea 
          {...register("description")} 
          placeholder="📌 Incluye:&#10;✅ Pantalla individual...&#10;⚠️ No cambiar datos..."
          className="min-h-[250px] rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500/10 transition-all resize-none p-4 text-sm leading-relaxed"
        />
        <p className="text-[11px] text-zinc-400 italic">
          Los saltos de línea (Enters) se verán reflejados exactamente igual en la vista del cliente.
        </p>
      </div>

      <Button type="submit" className="w-full bg-zinc-900 text-white rounded-2xl py-7 text-lg font-bold hover:bg-black transition-all">
        Guardar Cambios
      </Button>
    </form>
  );
}