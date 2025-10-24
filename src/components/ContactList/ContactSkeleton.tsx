import React from 'react';

export const ContactSkeleton: React.FC = () => {
  return (
    <div className="card p-4 animate-pulse">
      <div className="flex items-start gap-3">
        {/* Avatar Skeleton */}
        <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
        
        {/* Content Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
          
          <div className="mt-2 flex gap-1">
            <div className="h-6 bg-gray-200 rounded-full w-16" />
            <div className="h-6 bg-gray-200 rounded-full w-20" />
          </div>
        </div>
        
        {/* Menu Button Skeleton */}
        <div className="w-6 h-6 bg-gray-200 rounded flex-shrink-0" />
      </div>
    </div>
  );
};
