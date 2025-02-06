export interface Bike {
  id: string;
  modelo: string;
  nombre: string;
  precioCompra?: number;
  fechaCompra?: string;
  coordenadas?: {
    latitud: number;
    longitud: number;
  };
}
