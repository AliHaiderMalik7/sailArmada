// utils/boatTypes.ts

export interface BoatTypeOption {
    label: string;
  }
  
  // Export available boat types
  export const boatTypes: BoatTypeOption[] = [
    { label: 'All types' },
    { label: 'Sailboat' },
    { label: 'Motor boat' },
    { label: 'Catamaran' },
    { label: 'Gulet' },
  ];
  