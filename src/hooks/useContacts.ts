import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactsApi } from '../api/contacts';
import type {  ContactFormData } from '../types/contact';
import { useState, useCallback } from 'react';

export const useContacts = (search: string = '', page: number = 1, limit: number = 25, sort: string = 'fullName:asc') => {
  return useQuery({
    queryKey: ['contacts', search, page, limit, sort],
    queryFn: () => contactsApi.getContacts({ search, page, limit, sort }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const useContact = (id: string) => {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => contactsApi.getContact(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactData: ContactFormData) => contactsApi.createContact(contactData),
    onSuccess: () => {
      // Invalidate and refetch contacts
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ContactFormData }) => 
      contactsApi.updateContact(id, data),
    onSuccess: (updatedContact) => {
      // Update the specific contact in cache
      queryClient.setQueryData(['contact', updatedContact.id], updatedContact);
      // Invalidate contacts list
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactsApi.deleteContact(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ['contact', deletedId] });
      // Invalidate contacts list
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
};

// Custom hook for search with debouncing
export const useSearch = (initialValue: string = '') => {
  const [search, setSearch] = useState(initialValue);
  const [debouncedSearch, setDebouncedSearch] = useState(initialValue);

  const debounce = useCallback((value: string) => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  const updateSearch = useCallback((value: string) => {
    setSearch(value);
    debounce(value);
  }, [debounce]);

  return {
    search,
    debouncedSearch,
    updateSearch,
  };
};
