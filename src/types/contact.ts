export interface Contact {
  id: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  email?: string;
  phone?: string;
  company?: string;
  avatarUrl?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  tags?: string[];
}

export interface ContactsResponse {
  data: Contact[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ApiError {
  error: string;
  details?: Record<string, string>;
}
