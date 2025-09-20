# Todo Pro 📝

A modern, feature-rich Todo application built with React, TypeScript, and Redux Toolkit. Manage your tasks efficiently with advanced filtering, sorting, and a beautiful dark mode interface.

## ✨ Features

### 🔐 Authentication
- **User Registration** - Create new accounts with validation
- **Secure Login** - JWT-based authentication
- **Auto Logout** - Automatic session management with token expiry
- **Protected Routes** - Secure access to todo management

### 📋 Todo Management
- **Full CRUD Operations** - Create, Read, Update, and Delete todos
- **Rich Todo Fields**:
  - Title (required)
  - Description (optional)
  - Status (Todo, In Progress, Done)
  - Priority (1-5 scale)
  - Due Date
  - Tags for organization
- **Real-time Updates** - Optimistic updates for better UX

### 🔍 Advanced Filtering & Search
- **Status Filter** - Filter by todo status
- **Text Search** - Search in titles and descriptions
- **Smart Sorting** - Sort by creation date, due date, or priority
- **Pagination** - Efficient loading with 10 items per page

### 🎨 User Experience
- **Dark Mode Toggle** - Switch between light and dark themes
- **Responsive Design** - Works perfectly on mobile and desktop
- **Loading States** - Beautiful skeleton loaders
- **Error Handling** - Graceful error messages and recovery
- **Toast Notifications** - Real-time feedback for actions
- **Confirmation Dialogs** - Safe deletion with confirmation

### ♿ Accessibility
- **Screen Reader Support** - Proper ARIA labels and semantics
- **Keyboard Navigation** - Full keyboard accessibility
- **High Contrast** - Accessible color schemes
- **Focus Management** - Proper focus indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raselj71/redux-todo.git
   cd redux-todo
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
   - Navigate to `http://localhost:5173`
   - The app will automatically open with hot reload enabled

## 📱 How to Use

### Getting Started

1. **First Visit**
   - Open the app in your browser
   - You'll be redirected to the login page

2. **Create Account**
   - Click "Register" if you're a new user
   - Fill in your name, email, and password
   - Click "Register" to create your account

3. **Login**
   - Use the demo account: `demo@todo.pro` / `password`
   - Or login with your registered account

### Managing Todos

#### Creating a New Todo
1. Click the **"Add Todo"** button on the main page
2. Fill in the todo details:
   - **Title**: What needs to be done (required)
   - **Description**: Additional details (optional)
   - **Status**: Choose from Todo, In Progress, or Done
   - **Priority**: Set importance level (1-5, where 1 is highest)
   - **Due Date**: When it should be completed
   - **Tags**: Organize with comma-separated tags
3. Click **"Create Todo"** to save

#### Viewing Your Todos
- All todos are displayed in a clean table format
- See title, status, priority, due date, and tags at a glance
- Status is color-coded for quick identification
- Use pagination to navigate through large lists

#### Editing Todos
1. Find the todo you want to edit
2. Click the **Edit** button (pencil icon)
3. Modify any fields as needed
4. Click **"Update Todo"** to save changes

#### Deleting Todos
1. Click the **Delete** button (trash icon) next to any todo
2. Confirm deletion in the popup dialog
3. The todo will be permanently removed

### Advanced Features

#### Filtering and Search
- **Search Bar**: Type to search in titles and descriptions
- **Status Filter**: Dropdown to filter by Todo, In Progress, or Done
- **Sort Options**: 
  - Sort by: Creation date, Due date, or Priority
  - Order: Ascending or Descending
- All filters work together for powerful todo discovery

#### Dark Mode
- Click the **theme toggle** button in the top navigation
- Your preference is automatically saved
- Interface adapts with proper contrast and colors

#### Keyboard Shortcuts
- `Tab` - Navigate through elements
- `Enter` - Submit forms or activate buttons
- `Escape` - Close dialogs and dropdowns
- `Space` - Toggle checkboxes and buttons

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Redux Toolkit** - Efficient state management
- **RTK Query** - Powerful data fetching
- **React Router** - Client-side routing
- **React Hook Form** - Performant forms
- **Zod** - Runtime type validation

### UI/UX
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **React Toastify** - Toast notifications

### Development
- **Vite** - Lightning fast build tool
- **ESLint** - Code quality linting
- **TypeScript** - Static type checking
- **MSW** - API mocking for development

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components
│   └── ProtectedRoute/  # Route protection
├── pages/               # Page components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Home.tsx
│   └── TodoForm.tsx
├── redux/               # State management
│   ├── store.ts         # Redux store configuration
│   ├── auth/            # Authentication slice
│   └── todo/            # Todo API slice
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── mockServer/          # MSW mock API
└── styles/              # Global styles
```

## 🔧 Configuration

### Environment Variables
The app works out of the box with mock data. For production, you can configure:

```env
VITE_API_URL=your-api-endpoint
VITE_JWT_SECRET=your-jwt-secret
```

### Customization
- **Colors**: Modify theme colors in `tailwind.config.js`
- **API**: Update endpoints in `src/redux/todo/todoApi.ts`
- **Validation**: Adjust schemas in `src/types/zod/ZodSchema.ts`

## 📊 Demo Account

For quick testing, use the built-in demo account:
- **Email**: `demo@todo.pro`
- **Password**: `password`

This account comes with sample todos to explore all features.

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Automatic Logout** - Sessions expire for security
- **Protected Routes** - Unauthorized access prevention
- **Input Validation** - Client and server-side validation
- **XSS Protection** - Safe rendering of user content

## 🚀 Performance

- **Code Splitting** - Lazy loading for optimal bundle size
- **Memoization** - Optimized re-renders with useMemo
- **Virtual Scrolling** - Efficient handling of large lists
- **Optimistic Updates** - Instant UI feedback
- **Caching** - Smart data caching with RTK Query

## 🐛 Troubleshooting

### Common Issues

**App won't start**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Login issues**
- Check console for authentication errors
- Ensure mock server is running properly
- Try the demo account credentials

**Todos not loading**
- Verify you're logged in
- Check network tab for API errors
- Refresh the page to reset state

**Styling issues**
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS rules
- Verify Radix UI theme provider is set up

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure you're using Node.js 18+
4. Try clearing localStorage and refreshing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) - For accessible components
- [Tailwind CSS](https://tailwindcss.com/) - For utility-first styling
- [Redux Toolkit](https://redux-toolkit.js.org/) - For state management
- [React Hook Form](https://react-hook-form.com/) - For form handling
- [MSW](https://mswjs.io/) - For API mocking

---

**Built with ❤️ by [Rasel](https://github.com/Raselj71)**

*Happy task managing! 🎉*