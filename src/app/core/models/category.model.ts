export type TransactionCategory =
  | 'comida'
  | 'transporte'
  | 'entretenimiento'
  | 'salud'
  | 'compras'
  | 'hogar'
  | 'educacion'
  | 'viaje'
  | 'salario'
  | 'freelance'
  | 'inversion'
  | 'otro';

export interface CategoryMeta {
  key: TransactionCategory;
  label: string;
  icon: string;
  color: string;
  forType: 'gasto' | 'ingreso' | 'ambos';
}

export const CATEGORIES: CategoryMeta[] = [
  { key: 'comida',          label: 'Comida y bebida',  icon: 'restaurant',      color: '#FF6B6B', forType: 'gasto'   },
  { key: 'transporte',      label: 'Transporte',       icon: 'directions_car',  color: '#4ECDC4', forType: 'gasto'   },
  { key: 'entretenimiento', label: 'Entretenimiento',  icon: 'movie',           color: '#A855F7', forType: 'gasto'   },
  { key: 'salud',           label: 'Salud',            icon: 'favorite',        color: '#EF4444', forType: 'gasto'   },
  { key: 'compras',         label: 'Compras',          icon: 'shopping_bag',    color: '#F59E0B', forType: 'gasto'   },
  { key: 'hogar',           label: 'Hogar',            icon: 'home',            color: '#6366F1', forType: 'gasto'   },
  { key: 'educacion',       label: 'Educación',        icon: 'school',          color: '#0EA5E9', forType: 'gasto'   },
  { key: 'viaje',           label: 'Viaje',            icon: 'flight',          color: '#10B981', forType: 'ambos'   },
  { key: 'salario',         label: 'Salario',          icon: 'payments',        color: '#22C55E', forType: 'ingreso' },
  { key: 'freelance',       label: 'Freelance',        icon: 'laptop_mac',      color: '#84CC16', forType: 'ingreso' },
  { key: 'inversion',       label: 'Inversión',        icon: 'trending_up',     color: '#14B8A6', forType: 'ingreso' },
  { key: 'otro',            label: 'Otro',             icon: 'more_horiz',      color: '#94A3B8', forType: 'ambos'   },
];
