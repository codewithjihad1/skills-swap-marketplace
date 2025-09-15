# Contributing to Skill Share Hub 🚀

Welcome to the Skill Share Hub project! This guide will help you get started with contributing to our team project.

## 📋 Table of Contents

-   [Mentor Requirements](#mentor-requirements)
-   [Project Overview](#project-overview)
-   [Tech Stack](#tech-stack)
-   [Getting Started](#getting-started)
-   [Development Workflow](#development-workflow)
-   [Code Standards](#code-standards)
-   [Commit Guidelines](#commit-guidelines)
-   [Pull Request Process](#pull-request-process)
-   [Project Structure](#project-structure)
-   [Common Tasks](#common-tasks)
-   [Troubleshooting](#troubleshooting)

## 🎯 Mentor Requirements

### 📅 Weekly Tasks (This must be done every week)

-   **Individual Commits**: Each team member must maintain a minimum of **10 individual meaningful commits per week**
-   **Conflict Resolution**: The GitHub/project manager will handle and resolve all conflict issues by sitting with individuals or the team when required
-   **Documentation Updates**:
    -   Team leader will update SRS project documentation with functionality, technologies, and progress
    -   Every team member will update documentation with weekly tasks and contributions individually
-   **Technology Learning**: Every team must research and learn at least **one new technology** and implement it within the project
    -   Examples: TypeScript, Redux, Prisma, Next.js, Mongoose, Socket.io, WebSocket, WebRTC

### 🏁 Milestone-1: Let the Search Begin (Requirement Analysis & Planning)

#### 📋 Requirements Checklist

-   [ ] **SRS Documentation**: Create a complete SRS (Software Requirement Specification) with:

    -   Project name, goal, and purpose
    -   Detailed features
    -   Conclusion
    -   _This will be the main documentation of the project_

-   [ ] **Project Management**: Set up Jira and add manager as admin

-   [ ] **Version Control**: GitHub setup with:

    -   Proper branching strategy
    -   All team members as contributors
    -   Repository managed by GitHub/Project Manager

-   [ ] **UI/UX Design**: Design responsive pages with:

    -   Homepage + 2 other relevant pages (Product, Details, Dashboard, Profile, etc.)
    -   Both wireframe and code implementation

-   [ ] **Deployment**: Deploy basic homepage with live link (Vercel, Netlify, etc.)

-   [ ] **Unique Features**: Research and identify **at least 10 unique features** that address user problems overlooked by similar websites

-   [ ] **First Presentation**: Prepare 6-minute team presentation covering:

    -   Project explanation
    -   Key features
    -   Unique selling points
    -   MVP demonstration

-   [ ] **Feature Implementation**: Each team member must research and implement **at least 3 fully functional major features** throughout the project

### 📊 Progress Tracking

#### Weekly Contribution Log Template

```markdown
## Week [X] - [Date Range]

### [Your Name]

**Commits This Week**: [X/10]
**New Technology Learned**: [Technology Name]
**Features Worked On**:

-   Feature 1: [Description]
-   Feature 2: [Description]

**Documentation Updates**:

-   [List updates made]

**Challenges Faced**:

-   [Any blockers or difficulties]

**Next Week Goals**:

-   [Planned tasks]
```

## 🎯 Project Overview

Skill Share Hub is a full-stack application built with a monorepo architecture:

-   **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
-   **Backend**: Express.js with MongoDB/Mongoose
-   **Architecture**: Monorepo structure with separate frontend and backend directories

## 🛠 Tech Stack

### Frontend

-   **Framework**: Next.js 15.5.3
-   **UI Library**: React 19.1.0
-   **Styling**: Tailwind CSS 4
-   **Language**: TypeScript 5
-   **Build Tool**: Turbopack
-   **Linting**: ESLint

### Backend

-   **Runtime**: Node.js
-   **Framework**: Express.js 5.1.0
-   **Database**: MongoDB with Mongoose 8.18.1
-   **Environment**: dotenv for configuration
-   **CORS**: Enabled for cross-origin requests

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   MongoDB (local or cloud instance)
-   Git

### 1. Clone the Repository

```bash
git clone https://github.com/codewithjihad1/skill-share-hub.git
cd skill-share-hub
```

### 2. Install Dependencies

#### Frontend Setup

```bash
cd frontend
npm install
```

#### Backend Setup

```bash
cd ../backend
npm install
```

### 3. Environment Configuration

#### Backend Environment

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillsharehub
# or use MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillsharehub

# Add other environment variables as needed
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

#### Frontend Environment (if needed)

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

#### Terminal 1 - Backend

```bash
cd backend
npm start
```

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

The application will be available at:

-   Frontend: http://localhost:3000
-   Backend API: http://localhost:5000

## 🔄 Development Workflow

### Branch Strategy

1. **main**: Production-ready code
2. **dev**: Integration branch for features
3. **feature/[feature-name]**: Individual feature branches

### Workflow Steps

1. **Pull latest changes**

    ```bash
    git checkout main
    git pull origin main
    ```

2. **Create branch with your name**

    ```bash
    git checkout -b name
    ```

3. **Make your changes**

    - Follow code standards
    - Write tests if applicable
    - Update documentation

4. **Test your changes**

    ```bash
    # Frontend
    cd frontend
    npm run lint
    npm run build

    # Backend
    cd backend
    npm start
    ```

5. **Commit and push**

    ```bash
    git add .
    git commit -m "feat: add your feature description"
    git push origin name
    ```

6. **Create Pull Request**

## 📝 Code Standards

### TypeScript/JavaScript

-   Use TypeScript for all new code
-   Follow ESLint configuration
-   Use async/await instead of callbacks
-   Implement proper error handling

### React/Next.js

-   Use functional components with hooks
-   Follow React best practices
-   Use TypeScript interfaces for props
-   Implement proper SEO meta tags

### Backend

-   Use Express.js middleware patterns
-   Implement proper validation
-   Use Mongoose schemas for data modeling
-   Follow RESTful API conventions

### General

-   Use meaningful variable and function names
-   Write comments for complex logic
-   Keep functions small and focused
-   Follow DRY (Don't Repeat Yourself) principle

## 💬 Commit Guidelines

Use conventional commits format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

-   `feat`: New feature
-   `fix`: Bug fix
-   `docs`: Documentation changes
-   `style`: Code style changes (formatting, etc.)
-   `refactor`: Code refactoring
-   `test`: Adding or updating tests
-   `chore`: Maintenance tasks

### Examples

```bash
feat(frontend): add user authentication page
fix(backend): resolve database connection issue
docs: update API documentation
style(frontend): format components with prettier
```

## 🔍 Pull Request Process

### Before Creating PR

1. Ensure your branch is up to date with main
2. Run all tests and linting
3. Build both frontend and backend successfully
4. Test your changes thoroughly

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

-   [ ] Bug fix
-   [ ] New feature
-   [ ] Breaking change
-   [ ] Documentation update

## Testing

-   [ ] Frontend builds successfully
-   [ ] Backend starts without errors
-   [ ] Manual testing completed
-   [ ] No lint errors

## Screenshots (if applicable)

Add screenshots of UI changes

## Checklist

-   [ ] Code follows project standards
-   [ ] Self-review completed
-   [ ] Documentation updated
```

## 📁 Project Structure

```
skill-share-hub/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utility functions
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── utils/          # Utility functions
│   └── package.json
├── doc/                    # Documentation
└── README.md
```

## 🛠 Common Tasks

### Adding a New API Endpoint

1. Create route in `backend/src/routes/`
2. Add controller in `backend/src/controllers/`
3. Update model if needed in `backend/src/models/`
4. Test the endpoint

### Adding a New Frontend Page

1. Create page in `frontend/src/app/`
2. Add necessary components in `frontend/src/components/`
3. Update navigation if needed
4. Test responsive design

### Database Operations

```javascript
// Example Mongoose model
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});
```

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error

```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Ensure MongoDB is running locally or check your connection string.

#### Port Already in Use

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**: Kill the process or use a different port.

#### Module Resolution Error

```bash
Module not found: Can't resolve 'module-name'
```

**Solution**: Install the missing dependency or check import paths.

### Getting Help

1. Check existing issues on GitHub
2. Search in team chat/Discord
3. Ask team members for help
4. Create a detailed issue with error logs

## 🤝 Team Communication

### Code Reviews

-   All PRs require at least one review
-   Be constructive in feedback
-   Suggest improvements, don't just point out problems
-   Approve when ready to merge

### Meetings

-   Weekly standup meetings
-   Feature planning sessions
-   Code review sessions

## 📚 Resources

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Express.js Guide](https://expressjs.com/)
-   [MongoDB Manual](https://docs.mongodb.com/)
-   [TypeScript Handbook](https://www.typescriptlang.org/docs/)
-   [React Documentation](https://react.dev/)

## 📞 Contact

-   **Project Lead**: MD Jihad Hossain
-   **Repository**: https://github.com/codewithjihad1/skill-share-hub
-   **Issues**: Create GitHub issues for bugs and feature requests

---

Happy coding! 🎉 Let's build something amazing together!
