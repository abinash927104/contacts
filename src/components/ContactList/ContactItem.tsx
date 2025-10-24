import React, { useState } from 'react';
import type { Contact } from '../../types/contact';
import { MoreVertical, Mail, Phone, Building } from 'lucide-react';

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  isSelected,
  onSelect,
  onEdit,
  onDelete
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    onDelete();
  };

  return (
    <div
      className={`card p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:bg-gray-50'
      }`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      aria-label={`Select contact ${contact.fullName}`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {contact.avatarUrl ? (
            <img
              src={contact.avatarUrl}
              alt={`${contact.fullName} avatar`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-medium text-sm">
                {getInitials(contact.fullName)}
              </span>
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">{contact.fullName}</h3>
          
          <div className="mt-1 space-y-1">
            {contact.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{contact.email}</span>
              </div>
            )}
            
            {contact.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{contact.phone}</span>
              </div>
            )}
            
            {contact.company && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{contact.company}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {contact.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {contact.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
              {contact.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{contact.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Menu Button */}
        <div className="flex-shrink-0 relative">
          <button
            onClick={handleMenuToggle}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label={`More options for ${contact.fullName}`}
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-8 z-20 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Edit Contact
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  Delete Contact
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
