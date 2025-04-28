export interface PaginatedYachtResponse {
  count: number; // Total number of yachts available
  next: string | null; // URL for the next page of results, if available
  previous: string | null; // URL for the previous page of results, if available
  results: YachtDetails[]; // Array of yachts on the current page
}

export interface YachtDetails {
  yachtId: number;
  yacht: YachtInfo;
  startBaseId: number;
  endBaseId: number;
  startBase: string;
  endBase: string;
  dateFrom: string;
  dateTo: string;
  status: number;
  product: string;
  price: number;
  currency: string;
  startPrice: number;
  obligatoryExtrasPrice: number;
  obligatoryExtras: ObligatoryExtra[];
  paymentPlan: PaymentPlan[];
  securityDeposit: number;
  commissionPercentage: number;
  commissionValue: number;
  discountPercentage: number;
  location: Location;
}

export interface YachtInfo {
  id: number;
  kind: string;
  name: string;
  model: string;
  model_id: string;
  year: number;
  certificate: string;
  home_base_name: string;
  company_name: string;
  draught: number;
  beam: number;
  length: number;
  water_capacity: number;
  fuel_capacity: number;
  engine: string;
  deposit: string;
  deposit_with_waiver: string;
  currency: string;
  commission_percentage: number;
  max_discount_from_commission_percentage: number;
  wc: number;
  berths: number;
  cabins: number;
  wc_note: string;
  berths_note: string;
  cabins_note: string;
  main_sail_area: string | null;
  genoa_area: string | null;
  transit_log: string | null;
  main_sail_type: string;
  genoa_type: string;
  required_skipper_license: number;
  default_check_in_day: number;
  all_check_in_days: number[];
  default_check_in_time: string;
  default_check_out_time: string;
  minimum_charter_duration: number;
  maximum_charter_duration: number;
  max_people_on_board: number | null;
  equipment_json: Equipment[];
  images: YachtImage[];
  products: Product[];
  descriptions: Description[];
  crew: CrewMember[];
  home_base: number;
  company: number;
  equipment: number[];
}

export interface Equipment {
  id: number;
  value: string;
}

export interface YachtImage {
  id: number;
  url: string;
  name: string;
  sortOrder: number;
  description: string;
}

export interface Product {
  name: string;
  extras: ProductExtra[];
  crewedByDefault: boolean;
  isDefaultProduct: boolean;
}

export interface ProductExtra {
  id: number;
  name: string;
  unit: string;
  price: number;
  currency: string;
  obligatory: boolean;
  description: string;
  validDateTo: string;
  validDaysTo: number;
  payableInBase: boolean;
  sailingDateTo: string;
  validDateFrom: string;
  validDaysFrom: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  includedExtras: any[];
  availableInBase: number;
  sailingDateFrom: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validSailingAreas: any[];
  includesDepositWaiver: boolean;
}

export interface Description {
  text: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  documents: any[];
}

export interface CrewMember {
  age: number;
  name: string;
  roles: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[];
  licenses: string;
  languages: string[];
  description: string;
  nationality: string;
}

export interface ObligatoryExtra {
  id: number;
  name: string;
  price: number;
  currency: string;
  payableInBase: boolean;
  description: string;
}

export interface PaymentPlan {
  date: string;
  amount: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

