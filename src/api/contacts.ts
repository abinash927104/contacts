import type { Contact, ContactFormData, ContactsResponse } from '../types/contact';

// Mock data for development
const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    company: 'Acme Corp',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    tags: ['work', 'colleague'],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-0124',
    company: 'Tech Solutions',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    tags: ['family', 'friend'],
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    fullName: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1-555-0125',
    company: 'Design Studio',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    tags: ['work', 'client'],
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    firstName: 'Alice',
    lastName: 'Brown',
    fullName: 'Alice Brown',
    email: 'alice.brown@example.com',
    phone: '+1-555-0126',
    company: 'Marketing Agency',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    tags: ['work', 'partner'],
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '5',
    firstName: 'Charlie',
    lastName: 'Wilson',
    fullName: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    phone: '+1-555-0127',
    company: 'Startup Inc',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    tags: ['work', 'mentor'],
    createdAt: '2024-01-19T11:30:00Z',
    updatedAt: '2024-01-19T11:30:00Z'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone format (basic E.164)
const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

export const contactsApi = {
  // Get contacts with search, pagination, and sorting
  async getContacts(params: {
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
  } = {}): Promise<ContactsResponse> {
    await delay(300); // Simulate network delay

    const { search = '', page = 1, limit = 25, sort = 'fullName:asc' } = params;
    
    let filteredContacts = [...mockContacts];

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredContacts = filteredContacts.filter(contact => 
        contact.fullName.toLowerCase().includes(searchLower) ||
        contact.email?.toLowerCase().includes(searchLower) ||
        contact.company?.toLowerCase().includes(searchLower) ||
        contact.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    const [sortField, sortOrder] = sort.split(':');
    filteredContacts.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (sortField) {
        case 'fullName':
          aValue = a.fullName;
          bValue = b.fullName;
          break;
        case 'createdAt':
          aValue = a.createdAt;
          bValue = b.createdAt;
          break;
        default:
          aValue = a.fullName;
          bValue = b.fullName;
      }

      if (sortOrder === 'desc') {
        return bValue.localeCompare(aValue);
      }
      return aValue.localeCompare(bValue);
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

    return {
      data: paginatedContacts,
      meta: {
        page,
        limit,
        total: filteredContacts.length
      }
    };
  },

  // Get single contact by ID
  async getContact(id: string): Promise<Contact> {
    await delay(200);
    
    const contact = mockContacts.find(c => c.id === id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  },

  // Create new contact
  async createContact(contactData: ContactFormData): Promise<Contact> {
    await delay(500);

    // Validation
    if (!contactData.firstName || contactData.firstName.trim().length === 0) {
      throw new Error('First name is required');
    }
    if (contactData.firstName.length > 64) {
      throw new Error('First name must be 64 characters or less');
    }
    if (contactData.lastName && contactData.lastName.length > 64) {
      throw new Error('Last name must be 64 characters or less');
    }
    if (contactData.email && !isValidEmail(contactData.email)) {
      throw new Error('Invalid email format');
    }
    if (contactData.phone && !isValidPhone(contactData.phone)) {
      throw new Error('Invalid phone format. Use E.164 format (e.g., +1234567890)');
    }

    // Check for duplicate email
    if (contactData.email) {
      const existingContact = mockContacts.find(c => c.email === contactData.email);
      if (existingContact) {
        throw new Error('Contact with this email already exists');
      }
    }

    const now = new Date().toISOString();
    const newContact: Contact = {
      id: generateId(),
      firstName: contactData.firstName.trim(),
      lastName: contactData.lastName?.trim(),
      fullName: `${contactData.firstName.trim()}${contactData.lastName ? ` ${contactData.lastName.trim()}` : ''}`,
      email: contactData.email?.trim(),
      phone: contactData.phone?.trim(),
      company: contactData.company?.trim(),
      avatarUrl: contactData.avatarUrl,
      tags: contactData.tags || [],
      createdAt: now,
      updatedAt: now
    };

    mockContacts.push(newContact);
    return newContact;
  },

  // Update existing contact
  async updateContact(id: string, contactData: ContactFormData): Promise<Contact> {
    await delay(500);

    const contactIndex = mockContacts.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      throw new Error('Contact not found');
    }

    // Validation (same as create)
    if (!contactData.firstName || contactData.firstName.trim().length === 0) {
      throw new Error('First name is required');
    }
    if (contactData.firstName.length > 64) {
      throw new Error('First name must be 64 characters or less');
    }
    if (contactData.lastName && contactData.lastName.length > 64) {
      throw new Error('Last name must be 64 characters or less');
    }
    if (contactData.email && !isValidEmail(contactData.email)) {
      throw new Error('Invalid email format');
    }
    if (contactData.phone && !isValidPhone(contactData.phone)) {
      throw new Error('Invalid phone format. Use E.164 format (e.g., +1234567890)');
    }

    // Check for duplicate email (excluding current contact)
    if (contactData.email) {
      const existingContact = mockContacts.find(c => c.email === contactData.email && c.id !== id);
      if (existingContact) {
        throw new Error('Contact with this email already exists');
      }
    }

    const updatedContact: Contact = {
      ...mockContacts[contactIndex],
      firstName: contactData.firstName.trim(),
      lastName: contactData.lastName?.trim(),
      fullName: `${contactData.firstName.trim()}${contactData.lastName ? ` ${contactData.lastName.trim()}` : ''}`,
      email: contactData.email?.trim(),
      phone: contactData.phone?.trim(),
      company: contactData.company?.trim(),
      avatarUrl: contactData.avatarUrl,
      tags: contactData.tags || [],
      updatedAt: new Date().toISOString()
    };

    mockContacts[contactIndex] = updatedContact;
    return updatedContact;
  },

  // Delete contact
  async deleteContact(id: string): Promise<void> {
    await delay(300);

    const contactIndex = mockContacts.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      throw new Error('Contact not found');
    }

    mockContacts.splice(contactIndex, 1);
  }
};
