import React from 'react';
import type { Contact } from '../../types/contact';
import { ContactItem } from './ContactItem.tsx';
import { ContactSkeleton } from './ContactSkeleton.tsx';
import { EmptyState } from './EmptyState.tsx';

interface ContactListProps {
  contacts: Contact[];
  selectedContactId?: string;
  onContactSelect: (contact: Contact) => void;
  onContactEdit: (contact: Contact) => void;
  onContactDelete: (contact: Contact) => void;
  isLoading: boolean;
  hasSearch: boolean;
}

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContactId,
  onContactSelect,
  onContactEdit,
  onContactDelete,
  isLoading,
  hasSearch
}) => {
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <ContactSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        <EmptyState hasSearch={hasSearch} />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-2 p-4">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            isSelected={selectedContactId === contact.id}
            onSelect={() => onContactSelect(contact)}
            onEdit={() => onContactEdit(contact)}
            onDelete={() => onContactDelete(contact)}
          />
        ))}
      </div>
    </div>
  );
};
