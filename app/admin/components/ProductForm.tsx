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
      await saveProduct({ ...data, id: initialData?.id });
      alert("✅ Guardado con éxito");
      window.location.reload();
    } catch (error) {
      alert("❌ Error al guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-8 rounded-[32px] border border-zinc-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-bold text-zinc-700">Marca / Servicio</Label>
          <Input {...register("brand")} placeholder="Netflix, Disney+..." className="rounded-xl border-zinc-200" />
        </div>
        <div className="space-y-2">
          <Label className="font-bold text-zinc-700">Precio (MXN)</Label>
          <Input type="number" {...register("priceMXN", { valueAsNumber: true })} className="rounded-xl border-zinc-200" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-bold text-zinc-700">Plan</Label>
          <Input {...register("plan")} placeholder="1 Mes, Cuenta completa..." className="rounded-xl border-zinc-200" />
        </div>
        <div className="space-y-2">
          <Label className="font-bold text-zinc-700">Estado</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="rounded-xl border-zinc-200">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DISPONIBLE">Disponible ✅</SelectItem>
                  <SelectItem value="AGOTADO">Agotado ❌</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="font-bold text-zinc-700">Detalles e Instrucciones (Emojis ✅)</Label>
        <Textarea 
          {...register("description")} 
          placeholder="✅ Entrega inmediata&#10;✅ Garantía total..."
          className="min-h-[150px] rounded-2xl border-zinc-200 resize-none p-4 text-sm"
        />
      </div>

      <Button type="submit" className="w-full bg-zinc-900 text-white rounded-2xl py-6 font-bold hover:bg-black transition-all">
        {initialData ? "Actualizar Producto" : "Crear Producto"}
      </Button>
    </form>
  );
}