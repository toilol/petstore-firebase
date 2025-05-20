export interface Servicio {
  id?: string;  // El ? indica que es opcional
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
}