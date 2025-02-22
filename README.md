# Taskify (Task Tracker)

A CRUD application built with React and Redux Toolkit that manages tasks using JSONPlaceholder API.

## Features

### Core Features (Per Assignment Requirements)
- Complete CRUD Operations:
  - Create new tasks
  - Read/fetch tasks from JSONPlaceholder API
  - Update existing tasks
  - Delete tasks
- Redux Toolkit Implementation:
  - Centralized state management
  - Thunks for async operations
  - Proper state updates after CRUD operations
- Clean and Basic UI:
  - List view of all tasks
  - Forms for adding/editing tasks
  - Delete functionality
  - Responsive design

### Additional Features
- Infinite scrolling for efficient data loading
- Search functionality
- Filter tasks by completion status
- Task status tracking
- Enhanced UI with animations and transitions

## Technologies Used

- React + Vite
- Redux Toolkit
- JSONPlaceholder API
- Tailwind CSS
- React Icons

## Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/SahTitus/taskify.git
```

2. Navigate to project directory
```bash
cd taskify
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

5. Open `http://localhost:5173` in your browser

## Live Demo

Access the live version: [Taskify]()

## Project Structure

```
src/
├── components/   # Reusable UI components
├── constants/    # Application constants and configurations
├── store/       # Redux store and slices
├── hooks/       # Custom React hooks
├── styles/      # CSS and styling files
└── utils/       # Helper functions and utilitie
```

## Redux Implementation

- Uses Redux Toolkit for efficient state management
- Implements thunks for API operations
- Maintains proper state updates after CRUD operations
- Follows Redux best practices