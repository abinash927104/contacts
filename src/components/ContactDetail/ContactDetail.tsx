import React from 'react';
import type { Contact } from '../../types/contact';
import { Mail, Phone, Building, Calendar, Tag, Edit, Trash2 } from 'lucide-react';

interface ContactDetailProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export const ContactDetail: React.FC<ContactDetailProps> = ({
  contact,
  onEdit,
  onDelete
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {contact.avatarUrl ? (
            <img
              src={contact.avatarUrl}
              alt={`${contact.fullName} avatar`}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-medium text-xl">
                {getInitials(contact.fullName)}
              </span>
            </div>
          )}
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{contact.fullName}</h1>
            {contact.company && (
              <p className="text-gray-600 mt-1">{contact.company}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(contact)}
            className="btn-secondary flex items-center gap-2"
            aria-label={`Edit ${contact.fullName}`}
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => onDelete(contact)}
            className="btn-danger flex items-center gap-2"
            aria-label={`Delete ${contact.fullName}`}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        {contact.email && (
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                {contact.email}
              </a>
            </div>
          </div>
        )}

        {contact.phone && (
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <a
                href={`tel:${contact.phone}`}
                className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                {contact.phone}
              </a>
            </div>
          </div>
        )}

        {contact.company && (
          <div className="flex items-center gap-3">
            <Building className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Company</p>
              <p className="text-gray-900">{contact.company}</p>
            </div>
          </div>
        )}

        {contact.tags.length > 0 && (
          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {contact.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="text-gray-900">{formatDate(contact.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
