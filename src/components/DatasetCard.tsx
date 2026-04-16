import { Dataset } from '../types';
import { FileText, Layers, Calendar, ArrowRight } from 'lucide-react';

interface DatasetCardProps {
  dataset: Dataset;
}

export default function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <div className="card-sleek p-6 hover:border-primary/30 transition-all group cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-primary-soft text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
          {dataset.category}
        </span>
        <span className="text-xl font-bold text-text-main">
          ${dataset.price}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
        {dataset.title}
      </h3>
      
      <p className="text-text-muted text-sm mb-6 line-clamp-2 leading-relaxed">
        {dataset.description}
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-text-muted">
          <Layers className="w-4 h-4" />
          <span className="text-xs font-medium">{dataset.rows.toLocaleString()} rows</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <FileText className="w-4 h-4" />
          <span className="text-xs font-medium uppercase">{dataset.format}</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border flex items-center justify-between">
        <div className="flex gap-1">
          {dataset.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] text-text-muted font-medium">#{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-primary font-bold text-sm">
          Details
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
