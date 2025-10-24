import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header/Header';
import { ContactList } from './components/ContactList/ContactList';
import { ContactDetail } from './components/ContactDetail/ContactDetail';
import { ContactForm } from './components/ContactForm/ContactForm';
import { ErrorBanner } from './components/ErrorBanner/ErrorBanner';
import { useContacts, useSearch, useCreateContact, useUpdateContact, useDeleteContact } from './hooks/useContacts';
import type { Contact } from './types/contact';
import type { ContactFormData } from './types/contact';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppContent: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Contact | null>(null);
  const [sortBy] = useState('fullName:asc');
  const [page] = useState(1);
  const [dismissedErrors, setDismissedErrors] = useState<Set<string>>(new Set());

  const { search, debouncedSearch, updateSearch } = useSearch();
  const { data: contactsData, isLoading, error, refetch } = useContacts(debouncedSearch, page, 25, sortBy);
  
  const createContactMutation = useCreateContact();
  const updateContactMutation = useUpdateContact();
  const deleteContactMutation = useDeleteContact();

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setIsFormOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleDeleteContact = (contact: Contact) => {
    setShowDeleteConfirm(contact);
  };

  const handleFormSubmit = async (formData: ContactFormData) => {
    try {
      if (editingContact) {
        await updateContactMutation.mutateAsync({ id: editingContact.id, data: formData });
      } else {
        await createContactMutation.mutateAsync(formData);
      }
      setIsFormOpen(false);
      setEditingContact(null);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleDeleteConfirm = async () => {
    if (showDeleteConfirm) {
      try {
        await deleteContactMutation.mutateAsync(showDeleteConfirm.id);
        setShowDeleteConfirm(null);
        if (selectedContact?.id === showDeleteConfirm.id) {
          setSelectedContact(null);
        }
      } catch (error) {
        // Error is handled by the mutation
      }
    }
  };

  const handleRetry = () => {
    refetch();
  };

  const handleDismissError = (errorKey: string) => {
    setDismissedErrors(prev => new Set([...prev, errorKey]));
  };

  const getErrorMessage = () => {
    if (error) return 'Failed to load contacts. Please try again.';
    if (createContactMutation.error) return 'Failed to create contact. Please try again.';
    if (updateContactMutation.error) return 'Failed to update contact. Please try again.';
    if (deleteContactMutation.error) return 'Failed to delete contact. Please try again.';
    return null;
  };

  const getErrorType = () => {
    if (error) return 'network';
    return 'server';
  };

  const showError = getErrorMessage() && !dismissedErrors.has('main');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        searchValue={search}
        onSearchChange={updateSearch}
        onAddContact={handleAddContact}
      />

      {/* Error Banner */}
      {showError && (
        <div className="px-4 py-2">
          <ErrorBanner
            message={getErrorMessage()!}
            onRetry={handleRetry}
            onDismiss={() => handleDismissError('main')}
            type={getErrorType() as 'network' | 'server'}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex h-[calc(100vh-80px)]">
          {/* Contact List */}
          <div className="w-full lg:w-1/2 xl:w-2/5 border-r border-gray-200">
            <ContactList
              contacts={contactsData?.data || []}
              selectedContactId={selectedContact?.id}
              onContactSelect={handleContactSelect}
              onContactEdit={handleEditContact}
              onContactDelete={handleDeleteContact}
              isLoading={isLoading}
              hasSearch={!!debouncedSearch}
            />
          </div>

          {/* Contact Detail */}
          <div className="hidden lg:block lg:w-1/2 xl:w-3/5 p-6">
            {selectedContact ? (
              <ContactDetail
                contact={selectedContact}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-gray-400">👤</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a contact</h3>
                  <p className="text-gray-500">Choose a contact from the list to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm
        contact={editingContact || undefined}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingContact(null);
        }}
        onSubmit={handleFormSubmit}
        isLoading={createContactMutation.isPending || updateContactMutation.isPending}
        error={createContactMutation.error?.message || updateContactMutation.error?.message}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowDeleteConfirm(null)} />
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Contact</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{showDeleteConfirm.fullName}</strong>? 
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleteContactMutation.isPending}
                  className="btn-danger flex-1 flex items-center justify-center gap-2"
                >
                  {deleteContactMutation.isPending && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;