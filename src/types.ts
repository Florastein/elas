export interface Dataset {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rows: number;
  format: string;
  lastUpdated: string;
  tags: string[];
  sampleData?: any[];
}
