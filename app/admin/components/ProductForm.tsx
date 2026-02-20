"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; 
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { saveProduct } from "../actions";

export function ProductForm({ initialData }: { initialData?: any }) {
  // Inicializamos el formulario con los valores que ya tienes en tu base de datos
  const { register, handleSubmit, control } = useForm({
    defaultValues: initialData || {
      brand: "",
      plan: "",
      priceMXN: 0,
      description: "", 
      group: "PERFILES",
      status: "DISPONIBLE",
      category: "Streaming",
      durationMonths: 1
    }
  });

  const onSubmit = async (data: any) => {
    try {
      // Enviamos los datos al servidor incluyendo la descripción con emojis
      await saveProduct({ ...data, id: initialData?.id });
      alert("✅ Producto guardado con éxito");
      window.location.reload(); // Recargamos para ver los cambios
    } catch (error) {
      alert("❌ Error al guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-8 rounded-[32px] border border-zinc-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <Label className="text-zinc-700 font-bold text-sm">Marca / Servicio</Label>
          <Input {...register("brand")} placeholder="Ej: Netflix" className="rounded-xl border-zinc-200" />
        </div>
        
        <div className="space-y-2">
          <Label className="text-zinc-700 font-bold text-sm">Precio (MXN)</Label>
          <Input type="number" {...register("priceMXN", { valueAsNumber: true })} className="rounded-xl border-zinc-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-2">
          <Label className="text-zinc-700 font-bold text-sm">Plan</Label>
          <Input {...register("plan")} placeholder="Ej: Premium 4K" className="rounded-xl border-zinc-200" />
        </div>

        <div className="space-y-2">
          <Label className="text-zinc-700 font-bold text-sm">Estado</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="rounded-xl border-zinc-200">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DISPONIBLE">Disponible</SelectItem>
                  <SelectItem value="AGOTADO">Agotado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* SECCIÓN DE DETALLES: Crucial para evitar el 404 y mostrar info */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-zinc-700 font-bold text-sm">Instrucciones y Beneficios (Emojis)</Label>
        </div>
        <Textarea 
          {...register("description")} 
          placeholder="✅ Pantalla original&#10;✅ Garantía total..."
          className="min-h-[200px] rounded-2xl border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500/10 transition-all resize-none p-4 text-sm leading-relaxed"
        />
        <p className="text-[10px] text-zinc-400 italic">
          Esto es lo que verá el cliente al presionar "Ver todos los detalles".
        </p>
      </div>

      <Button type="submit" className="w-full bg-zinc-900 text-white rounded-2xl py-6 text-base font-bold hover:bg-black transition-all active:scale-[0.98]">
        {initialData ? "Actualizar Producto" : "Crear Producto"}
      </Button>
    </form>
  );
}