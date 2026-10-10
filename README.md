# Employee Management System

A full-stack Employee Management System built with the MERN stack to manage employee information through a simple, organized web interface. The application includes authentication and employee management operations, with a focus on practical functionality, maintainable code, and a straightforward user experience.

**Live Demo:** https://employee-management-system-ems-olive.vercel.app/

**GitHub Repository:** https://github.com/sandeep-666666/Employee-Management-System

## Overview

The Employee Management System is a web application designed to simplify basic employee record management. It provides an interface for accessing the application and performing employee-related operations without managing records manually.

The project was developed as a practical full-stack exercise, covering frontend development, backend API integration, database operations, authentication, and the use of AI-assisted development tools.

## Features

- **User Authentication:** Signup and login functionality with password hashing and JWT-based authentication.
- **Employee Management:** Create, view, update, and delete employee records.
- **Employee Information:** Manage details such as name, email, phone number, department, position, and salary, as supported by the implementation.
- **Frontend and Backend Integration:** Connect the React interface to backend APIs using Axios.
- **Input Validation:** Handle invalid inputs and application errors where implemented.
- **Database Integration:** Store and manage application data using MongoDB and Mongoose.
- **User Feedback:** Display application feedback using toast notifications where implemented.

## Technology Stack

| Layer                | Technologies                            |
| -------------------- | --------------------------------------- |
| Frontend             | React, JavaScript, Vite                 |
| Styling              | Tailwind CSS                            |
| Routing              | React Router                            |
| API Integration      | Axios                                   |
| Backend              | Node.js, Express.js                     |
| Database             | MongoDB, Mongoose                       |
| Authentication       | JSON Web Tokens (JWT), bcrypt           |
| Additional Libraries | React Hot Toast, Lucide React, date-fns |
| Development Tools    | Git, GitHub, Kiro AI                    |

## Project Structure

```text
Employee-Management-System/
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
└── README.md
```

The frontend and backend are maintained in the same repository to keep the project organized and make it easier to set up and review.

_Note: Additional source folders and configuration files may exist in the repository._

## Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js and npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/sandeep-666666/Employee-Management-System.git
cd Employee-Management-System
```

### 2. Configure the Backend

Navigate to the server directory:

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
ADMIN_EMAIL=your_admin_email
```

Replace the placeholder values with your own configuration. Do not commit real secrets or database credentials to GitHub.

Start the backend:

```bash
npm run server
```

The backend uses the `server` script defined in `server/package.json`.

### 3. Configure the Frontend

Open a new terminal from the project root:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_BASE_URL=http://localhost:5000
```

Set `VITE_BASE_URL` to the backend's actual base URL, including any API prefix required by the application.

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal by Vite.

### 4. Database Configuration

Ensure that MongoDB is running or that your MongoDB Atlas cluster is accessible. Configure `MONGODB_URI` with the appropriate connection string.

If the application uses seeded data, review `server/seed.js` before running the seed command:

```bash
npm run seed
```

Run this command only when the seed script is appropriate for your database. Avoid unintentionally creating duplicate records or overwriting existing data.

## Environment Variables

| Variable        | Purpose                               |
| --------------- | ------------------------------------- |
| `PORT`          | Port on which the backend server runs |
| `MONGODB_URI`   | MongoDB connection string             |
| `JWT_SECRET`    | Secret used to sign and verify JWTs   |
| `ADMIN_EMAIL`   | Admin email configuration             |
| `VITE_BASE_URL` | Backend base URL used by the frontend |

Environment variable names and their usage should match the application's current source code and deployment configuration.

## Demo Access

**Admin demo account**

- Email: `admin@example.com`
- Password: `admin123`

Use these credentials only if they remain active in the deployed demo. They are for demonstration purposes, not production use.

For a separate employee account, use the credentials provided for the demo environment or create an account through the available signup flow.

Please do not use personal account credentials or expose real user passwords in this repository.

## Verification Guide

A reviewer can use the following steps to evaluate the application:

1. Open the live demo.
2. Test the available signup and login flows.
3. Verify that invalid login details are handled appropriately.
4. Access the employee management interface.
5. Add an employee record and verify that it appears in the list.
6. Update an existing employee and verify the changes.
7. Delete a test employee and confirm the result.
8. Check the application's behavior when invalid or incomplete data is submitted.
9. Verify that protected functionality behaves as expected when a user is not authenticated.

The exact steps depend on the features available in the deployed version. These are verification scenarios, not a claim that every scenario has already passed an automated test suite.

## Kiro AI-Assisted Development

Kiro AI was used as an AI-assisted development tool during the project. The intention was to use it for focused development tasks while reviewing and validating the resulting code.

The prompts below document the intended workflow. Retain only prompts that were actually submitted to Kiro, and adjust the descriptions to reflect the results you personally reviewed.

### 1. Component Generation

**Prompt:**

> Review the existing React project structure and create a reusable employee card component that displays the employee information available in the application. Follow the existing coding conventions, keep the component readable, handle optional values appropriately, and avoid changing unrelated files. Explain the component's props and how it should be integrated into the existing employee listing.

**Purpose:** Generate a reusable UI component that fits the existing frontend structure.

### 2. Input Validation and Error Handling

**Prompt:**

> Review the employee creation and update forms. Identify missing required-field validation, invalid email or numeric input handling, and unclear error messages. Suggest focused changes that match the current project structure. Handle API failures gracefully and provide useful feedback to the user. Do not invent backend endpoints or modify unrelated functionality.

**Purpose:** Review form validation and improve error handling without unnecessarily restructuring the application.

### 3. Authentication Testing

**Prompt:**

> Review the existing signup, login, and authentication flow. Identify important test scenarios for valid credentials, invalid credentials, missing fields, incorrect passwords, and unauthenticated access to protected functionality. Create clear test cases with preconditions, steps, and expected results. Do not claim that any test has passed unless it has actually been executed and verified.

**Purpose:** Identify authentication edge cases and create a practical verification checklist.

### 4. Code Review

**Prompt:**

> Act as a senior full-stack developer and review this Employee Management System. Focus on correctness, maintainability, API integration, authentication, input validation, error handling, and potential security issues. Report findings with file references and explain why each issue matters. Suggest minimal, practical fixes and do not claim that changes have been applied unless they are actually implemented.

**Purpose:** Use AI assistance for a structured review and evaluate suggested improvements before applying them.

### Development Approach

AI-generated suggestions should be reviewed against the existing codebase before being accepted. The application should be verified manually or with executable tests after relevant changes.

The prompts above describe development and review tasks; they do not, by themselves, establish that a component was merged, a vulnerability was fixed, or a test passed.

## Testing

The project can be checked through the live application and local development environment using the verification scenarios above.

The backend's current npm test script is a placeholder rather than a configured automated test suite. Automated test coverage should therefore not be inferred from the presence of the script or from the Kiro prompts.

## Security Considerations

- Keep `.env` files out of version control.
- Use strong, private secrets for JWT signing.
- Do not use demonstration credentials in a production deployment.
- Validate user input on the backend, not only in the frontend.
- Review authentication and authorization rules before deploying the application for real users.
- Never publish real database credentials or private user information.

## Future Improvements

Potential improvements include:

- Automated unit and integration tests.
- More comprehensive role-based access control.
- Search, filtering, sorting, and pagination for employee records.
- Improved form accessibility and validation.
- Better API documentation and centralized error handling.
- Stronger deployment and security checks.

These are possible future enhancements, not claims about features already implemented.

## Author

**Sandeep Kumar Sahoo**

Full Stack Developer | MERN Stack

GitHub: https://github.com/sandeep-666666

Portfolio: https://portfolio-chi-lac-49.vercel.app/

---

Thank you for reviewing this project. Feedback on its implementation, code quality, and opportunities for improvement is welcome.
