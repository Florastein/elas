import { Dataset } from '../types';
import DatasetCard from './DatasetCard';
import { motion } from 'motion/react';

const MOCK_DATASETS: Dataset[] = [
  {
    id: '1',
    title: 'Global E-commerce Trends 2024',
    description: 'Comprehensive dataset of online shopping behavior across 50 countries, including category preferences and average order values.',
    category: 'Market Research',
    price: 499,
    rows: 1250000,
    format: 'CSV, JSON',
    lastUpdated: '2 days ago',
    tags: ['ecommerce', 'global', 'trends']
  },
  {
    id: '2',
    title: 'Real-time Weather Patterns (US)',
    description: 'Hourly weather data from 5,000+ stations across the United States, including temperature, humidity, and wind speed.',
    category: 'Environment',
    price: 299,
    rows: 8500000,
    format: 'Parquet',
    lastUpdated: '1 hour ago',
    tags: ['weather', 'usa', 'realtime']
  },
  {
    id: '3',
    title: 'SaaS Pricing Benchmarks',
    description: 'Detailed analysis of pricing models and feature sets from 1,000+ leading SaaS companies worldwide.',
    category: 'Business',
    price: 199,
    rows: 15000,
    format: 'XLSX, CSV',
    lastUpdated: '1 week ago',
    tags: ['saas', 'pricing', 'benchmarks']
  },
  {
    id: '4',
    title: 'Cryptocurrency Sentiment Analysis',
    description: 'Sentiment scores derived from 10M+ social media posts related to top 100 cryptocurrencies.',
    category: 'Finance',
    price: 799,
    rows: 10000000,
    format: 'JSON',
    lastUpdated: '30 mins ago',
    tags: ['crypto', 'sentiment', 'finance']
  },
  {
    id: '5',
    title: 'Global Healthcare Facilities',
    description: 'Verified locations and metadata for hospitals, clinics, and pharmacies in 120 countries.',
    category: 'Health',
    price: 599,
    rows: 450000,
    format: 'GeoJSON, CSV',
    lastUpdated: '2 weeks ago',
    tags: ['healthcare', 'global', 'locations']
  },
  {
    id: '6',
    title: 'Developer Salary Survey 2024',
    description: 'Anonymized salary data from 50,000+ software engineers across different stacks and regions.',
    category: 'Employment',
    price: 149,
    rows: 52000,
    format: 'CSV',
    lastUpdated: '3 days ago',
    tags: ['salary', 'developers', 'tech']
  }
];

export default function DatasetGrid() {
  return (
    <section className="py-20 px-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-text-main mb-4">Featured Datasets</h2>
          <p className="text-text-muted max-w-xl">
            Explore our most popular and recently updated datasets curated by industry experts.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-white border border-border text-sm font-semibold text-text-muted hover:text-primary transition-colors">
            All Categories
          </button>
          <button className="px-4 py-2 rounded-lg bg-white border border-border text-sm font-semibold text-text-muted hover:text-primary transition-colors">
            Sort by: Newest
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_DATASETS.map((dataset, index) => (
          <motion.div
            key={dataset.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <DatasetCard dataset={dataset} />
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="px-8 py-4 bg-white border border-border text-text-main rounded-xl font-bold hover:bg-bg transition-all shadow-sm">
          View All Datasets
        </button>
      </div>
    </section>
  );
}
