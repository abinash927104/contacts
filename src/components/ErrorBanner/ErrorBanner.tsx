import React from 'react';
import { AlertTriangle, RefreshCw, X } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  type?: 'network' | 'server' | 'validation';
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  onRetry,
  onDismiss,
  type = 'server'
}) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'network':
        return 'bg-red-50 border-red-200';
      case 'validation':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-red-50 border-red-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'network':
        return 'text-red-800';
      case 'validation':
        return 'text-yellow-800';
      default:
        return 'text-red-800';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'network':
        return 'text-red-400';
      case 'validation':
        return 'text-yellow-400';
      default:
        return 'text-red-400';
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 ${getBackgroundColor()}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${getIconColor()}`} />
        
        <div className="flex-1">
          <p className={`font-medium ${getTextColor()}`}>
            {type === 'network' ? 'Network Error' : 'Error'}
          </p>
          <p className={`text-sm mt-1 ${getTextColor()}`}>
            {message}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                type === 'network'
                  ? 'bg-red-100 hover:bg-red-200 text-red-800'
                  : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
              }`}
              aria-label="Retry action"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          )}
          
          {onDismiss && (
            <button
              onClick={onDismiss}
              className={`p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors duration-200 ${getTextColor()}`}
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
