# Contact List Demo Guide

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** to `http://localhost:5173`

## Demo Features to Try

### 1. View Contacts
- The app loads with 5 sample contacts
- Click on any contact to view details in the right panel
- Notice the responsive design - try resizing your browser window

### 2. Search Functionality
- Use the search bar in the header to search by:
  - **Name**: Try "John" or "Jane"
  - **Email**: Try "example.com"
  - **Company**: Try "Acme" or "Tech"
  - **Tags**: Try "work" or "family"
- Notice the 300ms debounce - type quickly to see it in action

### 3. Add New Contact
- Click the "Add Contact" button
- Fill out the form with:
  - **First Name**: Required field
  - **Last Name**: Optional
  - **Email**: Valid email format required
  - **Phone**: E.164 format (e.g., +1234567890)
  - **Company**: Optional
  - **Tags**: Comma-separated (e.g., "work, colleague")
- Try submitting with invalid data to see validation

### 4. Edit Contact
- Click the three-dot menu on any contact
- Select "Edit Contact"
- Modify the information and save
- Notice the form is pre-filled with existing data

### 5. Delete Contact
- Click the three-dot menu on any contact
- Select "Delete Contact"
- Confirm the deletion in the modal
- The contact is removed from the list

### 6. Error Handling
- Try adding a contact with an existing email
- Notice the validation error message
- Try adding a contact with invalid email format
- See the field-specific error messages

### 7. Loading States
- Notice the skeleton loading when the app first loads
- Form submission shows loading indicators
- Delete operations show loading states

### 8. Responsive Design
- **Desktop**: Two-column layout with contact list and detail view
- **Tablet**: Stacked layout with full-width contact list
- **Mobile**: Single column with contact list, tap to view details

## Sample Data

The app comes with 5 sample contacts:

1. **John Doe** - john.doe@example.com - Acme Corp
2. **Jane Smith** - jane.smith@example.com - Tech Solutions  
3. **Bob Johnson** - bob.johnson@example.com - Design Studio
4. **Alice Brown** - alice.brown@example.com - Marketing Agency
5. **Charlie Wilson** - charlie.wilson@example.com - Startup Inc

## Keyboard Navigation

- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and select contacts
- **Escape**: Close modals and forms
- **Arrow Keys**: Navigate contact list (future enhancement)

## Accessibility Features

- **Screen Reader**: All elements have proper ARIA labels
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Error Announcements**: Screen readers announce errors
- **Semantic HTML**: Proper heading structure and landmarks

## Performance Notes

- **Search Debouncing**: 300ms delay prevents excessive API calls
- **Query Caching**: 5-minute cache for contact data
- **Skeleton Loading**: Better perceived performance
- **Optimistic Updates**: UI updates immediately on actions

## Browser Support

- **Chrome**: Last 2 versions
- **Firefox**: Last 2 versions  
- **Safari**: Last 2 versions
- **Edge**: Last 2 versions
- **Mobile**: iOS Safari, Chrome Mobile

## Troubleshooting

### Common Issues

1. **App won't start**: Make sure Node.js 18+ is installed
2. **Styling issues**: Check that Tailwind CSS is properly configured
3. **Type errors**: Ensure TypeScript is properly set up
4. **Build errors**: Clear node_modules and reinstall dependencies

### Development Tips

- **Hot Reload**: Changes are reflected immediately
- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Code quality and consistency
- **Tailwind**: Utility-first CSS framework

## Next Steps

- **Real API**: Replace mock data with actual backend
- **Authentication**: Add user accounts
- **Testing**: Add unit and integration tests
- **Deployment**: Deploy to production environment
