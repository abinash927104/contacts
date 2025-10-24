import React from 'react';
import { Users, Search } from 'lucide-react';

interface EmptyStateProps {
  hasSearch: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasSearch }) => {
  if (hasSearch) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
        <p className="text-gray-500 max-w-sm">
          Try adjusting your search terms or check the spelling.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
        <Users className="w-8 h-8 text-primary-600" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts yet</h3>
      <p className="text-gray-500 max-w-sm mb-6">
        Get started by adding your first contact to build your network.
      </p>
    </div>
  );
};
