import React from 'react';
import { Loader2, Inbox, AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export function LoadingState({ message = "Loading data...", className }: { message?: string, className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center space-y-4", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 italic">{message}</p>
    </div>
  );
}

export function EmptyState({ 
  title = "No data found", 
  description = "There are no records to display at this time.",
  icon: Icon = Inbox,
  action,
  className
}: { 
  title?: string, 
  description?: string, 
  icon?: any,
  action?: { label: string, onClick: () => void },
  className?: string 
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-16 text-center space-y-6 bg-slate-950/20 border border-dashed border-slate-800 rounded-xl", className)}>
      <div className="p-4 bg-slate-900 rounded-full text-slate-500">
        <Icon size={32} />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-200">{title}</h3>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{description}</p>
      </div>
      {action && (
        <Button 
          onClick={action.onClick}
          variant="outline"
          className="rounded-lg text-[10px] uppercase font-bold tracking-widest border-slate-800 hover:bg-slate-900"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({ 
  title = "Something went wrong", 
  description = "We encountered an error while fetching the data. Please try again.",
  onRetry,
  className
}: { 
  title?: string, 
  description?: string, 
  onRetry?: () => void,
  className?: string 
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center space-y-6 border border-red-900/20 bg-red-950/5 rounded-xl", className)}>
      <div className="p-4 bg-red-950/20 rounded-full text-red-500">
        <AlertTriangle size={32} />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-widest text-red-400">{title}</h3>
        <p className="text-xs text-red-900/60 max-w-xs leading-relaxed">{description}</p>
      </div>
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="ghost"
          className="text-red-400 hover:text-red-300 hover:bg-red-950/20 space-x-2 text-[10px] uppercase font-bold tracking-widest"
        >
          <RefreshCcw size={14} />
          <span>Retry Operation</span>
        </Button>
      )}
    </div>
  );
}
