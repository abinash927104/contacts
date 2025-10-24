# Contact List Application

A modern, responsive React application for managing contacts with a clean, intuitive interface.

## 🚀 Live Demo

**Try the application live:** [https://contacts-tawny-three.vercel.app/](https://contacts-tawny-three.vercel.app/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/contact-list)

## Features

### Core Functionality
- **View Contacts**: Browse through your contact list with a clean, organized interface
- **Search Contacts**: Real-time search by name, email, company, or tags with 300ms debouncing
- **Add Contacts**: Create new contacts with comprehensive form validation
- **Edit Contacts**: Update existing contact information
- **Delete Contacts**: Remove contacts with confirmation dialog

### Technical Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG AA compliant with proper ARIA labels and keyboard navigation
- **Error Handling**: Comprehensive error states with retry mechanisms
- **Loading States**: Skeleton loading and smooth transitions
- **Form Validation**: Client-side and server-side validation with helpful error messages

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Routing**: React Router DOM (ready for future expansion)

## Project Structure

```
src/
├── api/
│   └── contacts.ts          # Mock API implementation
├── components/
│   ├── Header/             # Application header with search
│   ├── ContactList/        # Contact list and items
│   ├── ContactDetail/     # Contact detail view
│   ├── ContactForm/       # Add/Edit contact form
│   └── ErrorBanner/       # Error display component
├── hooks/
│   └── useContacts.ts     # Custom hooks for data fetching
├── types/
│   └── contact.ts         # TypeScript type definitions
├── App.tsx                # Main application component
└── main.tsx              # Application entry point
```

## Getting Started

### Prerequisites
- Node.js 18+ (tested with 18.18.2)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ContactList
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## App-wide Assumptions

### Data Model
- **Contact ID**: Unique string identifier (UUID format in production)
- **Name Fields**: First name required (1-64 chars), last name optional (0-64 chars)
- **Email**: Optional, validated format, unique constraint
- **Phone**: Optional, E.164 format recommended (+1234567890)
- **Company**: Optional, free text
- **Tags**: Array of strings for categorization
- **Timestamps**: ISO 8601 format for created/updated dates

### API Assumptions
- **Mock Implementation**: Currently uses in-memory mock data
- **Response Format**: Consistent JSON envelope with `data` and `meta` fields
- **Error Handling**: Structured error responses with field-specific validation
- **Pagination**: 25 items per page by default
- **Search**: Full-text search across name, email, company, and tags

### User Experience
- **Responsive Breakpoints**: Mobile-first design with desktop enhancements
- **Search Behavior**: 300ms debounce to prevent excessive API calls
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Skeleton loading for better perceived performance
- **Error Recovery**: Retry mechanisms for network and server errors

### Accessibility
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Error Announcements**: Screen reader announcements for errors

### Browser Support
- **Modern Browsers**: Last 2 versions of Chrome, Firefox, Edge, Safari
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features Used**: ES2020+, CSS Grid, Flexbox, CSS Custom Properties

## Development Notes

### Mock Data
The application includes 5 sample contacts with realistic data for demonstration purposes. In a production environment, this would be replaced with actual API endpoints.

### State Management
- **Server State**: Managed by TanStack Query for caching, synchronization, and background updates
- **Client State**: Local React state for UI interactions (modals, forms, selections)
- **Error Boundaries**: Ready for implementation of React Error Boundaries

### Performance Optimizations
- **Query Caching**: 5-minute stale time for contact data
- **Debounced Search**: Prevents excessive API calls during typing
- **Lazy Loading**: Images use lazy loading attributes
- **Code Splitting**: Ready for route-based code splitting

### Security Considerations
- **Input Sanitization**: All user inputs are validated and sanitized
- **XSS Prevention**: No innerHTML usage, proper text content handling
- **CSRF Protection**: Ready for CSRF tokens in production API
- **HTTPS**: Required for production deployment

## Future Enhancements

### Planned Features
- **Authentication**: User accounts and contact privacy
- **Contact Import/Export**: CSV, vCard support
- **Advanced Search**: Filters by date, tags, company
- **Contact Groups**: Organize contacts into custom groups
- **Bulk Operations**: Select multiple contacts for batch actions
- **Contact Sharing**: Share contacts with other users
- **Mobile App**: React Native version

### Technical Improvements
- **Real API Integration**: Replace mock with actual backend
- **Offline Support**: Service worker for offline functionality
- **Push Notifications**: Real-time updates
- **Analytics**: User interaction tracking
- **Testing**: Comprehensive test suite
- **Internationalization**: Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@contactlist.app or create an issue in the repository.