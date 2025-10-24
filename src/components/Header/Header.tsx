import React from 'react';
import { Search, Plus } from 'lucide-react';

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchValue, onSearchChange, onAddContact }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:flex-none sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email or tag..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-field pl-10 pr-4"
              aria-label="Search contacts"
            />
          </div>
          
          {/* Add Contact Button */}
          <button
            onClick={onAddContact}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
            aria-label="Add new contact"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Contact</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </header>
  );
};
