# Employee Data Management System

A modern, full-stack employee management application built with React, TypeScript, and Lovable Cloud. This CRUD application allows organizations to manage employee data with an intuitive interface and powerful analytics.

## 🌟 Features

- **Complete CRUD Operations**: Create, read, update, and delete employee records
- **Visual Analytics Dashboard**: Interactive charts showing department distribution, position breakdown, and salary trends
- **Secure Authentication**: User registration and login with Row-Level Security
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Changes reflect immediately across the application
- **Form Validation**: Client-side validation for data integrity
- **Animated UI**: Smooth animations and transitions for better user experience

## 📋 Employee Data Fields

- Name (required)
- Email (required)
- Phone
- Department (Engineering, Sales, Marketing, HR, Finance, Operations)
- Position (Manager, Senior Developer, Developer, Designer, Analyst, Coordinator, Specialist)
- Salary
- Hire Date

## 🚀 Live Demo

**URL**: https://lovable.dev/projects/e98926b4-2d58-4558-8422-5f8af5f9cab8

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL with Row-Level Security (RLS)
- **Charts**: Recharts
- **Authentication**: Supabase Auth
- **Routing**: React Router DOM
- **Build Tool**: Vite

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Environment Variables

The project uses Lovable Cloud which automatically configures:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

No manual environment setup required!

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── EmployeeDialog.tsx     # Add/Edit employee modal
│   ├── EmployeeList.tsx       # Employee table display
│   └── EmployeeAnalytics.tsx  # Charts and analytics
├── pages/
│   ├── Auth.tsx               # Login/Signup page
│   ├── Dashboard.tsx          # Main dashboard with tabs
│   ├── Intro.tsx              # Landing page
│   └── Index.tsx              # Route configuration
├── integrations/
│   └── supabase/
│       ├── client.ts          # Supabase client (auto-generated)
│       └── types.ts           # Database types (auto-generated)
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions
└── main.tsx                   # Application entry point
```

## 🎯 Usage

### For End Users

1. **Sign Up/Login**: Create an account or log in
2. **View Employees**: See all employees in the table view
3. **Add Employee**: Click "Add New Employee" button and fill in the form
4. **Edit Employee**: Click the edit icon on any employee row
5. **Delete Employee**: Click the delete icon and confirm
6. **View Analytics**: Switch to "Visual Analytics" tab to see charts

### For Developers

**Using Lovable (Recommended)**
- Visit the [Lovable Project](https://lovable.dev/projects/e98926b4-2d58-4558-8422-5f8af5f9cab8)
- Start prompting with natural language
- Changes commit automatically to the repo

**Using Your IDE**
- Clone the repo and make changes locally
- Push changes - they'll sync to Lovable automatically

**Using GitHub**
- Edit files directly in GitHub UI
- Or use GitHub Codespaces for a full dev environment

## 🚀 Deployment

### Quick Deploy with Lovable
1. Open [Lovable](https://lovable.dev/projects/e98926b4-2d58-4558-8422-5f8af5f9cab8)
2. Click Share → Publish
3. Your app is live!

### Custom Domain
Navigate to Project > Settings > Domains and click Connect Domain.

[Learn more about custom domains](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 📊 Database Schema

### Employees Table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Owner reference |
| name | text | Employee name (required) |
| email | text | Employee email (required) |
| phone | text | Contact number |
| department | text | Department name |
| position | text | Job position |
| salary | numeric | Salary amount |
| hire_date | date | Date of hire |
| created_at | timestamp | Record creation time |
| updated_at | timestamp | Last update time |

### Row-Level Security (RLS)
- Users can only view, create, update, and delete their own employees
- All operations are scoped to the authenticated user

## 🔐 Security

- **Authentication**: Secure user authentication via Supabase Auth
- **Row-Level Security**: Database-level access control
- **Input Validation**: Client-side form validation
- **HTTPS**: All connections encrypted
- **Environment Variables**: Sensitive data stored securely

## 📚 Additional Documentation

- [Project Status & Missing Features](./PROJECT_STATUS.md)
- [Feature List](./FEATURES.md)
- [Lovable Documentation](https://docs.lovable.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is built with [Lovable](https://lovable.dev) and is available for personal and commercial use.

## 🆘 Support

- [Lovable Documentation](https://docs.lovable.dev/)
- [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)
- [Report Issues](https://github.com/your-repo/issues)

## 🎓 Learning Resources

- [Lovable Quickstart Guide](https://docs.lovable.dev/user-guides/quickstart)
- [Build a Fullstack App (YouTube Playlist)](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)
- [Lovable Cloud Features](https://docs.lovable.dev/features/cloud)

---

Built with ❤️ using [Lovable](https://lovable.dev)
