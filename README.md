<div align="center">
  
# 🔧 Bare Minimum Planner - Backend

### Secure & Scalable REST API for Task Management

![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-5.2.1-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.1.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-documentation">API Docs</a> •
  <a href="#-project-structure">Structure</a>
</p>

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🔐 Authentication & Security

- ✅ JWT-based authentication
- ✅ Secure password hashing (bcrypt)
- ✅ Token-based session management
- ✅ Protected route middleware
- ✅ Cookie-based auth tokens
- ✅ Email verification support

### 🛡️ Security Measures

- ✅ Rate limiting (prevents abuse)
- ✅ Helmet.js (secure HTTP headers)
- ✅ CORS configuration
- ✅ MongoDB injection prevention
- ✅ Input validation & sanitization

</td>
<td width="50%" valign="top">

### 📝 Task Management

- ✅ Create, read, update, delete tasks
- ✅ User-specific task ownership
- ✅ Task completion tracking
- ✅ Timestamp management
- ✅ Task filtering by user

### 📧 Email Services

- ✅ Password reset emails
- ✅ Welcome emails
- ✅ Nodemailer integration
- ✅ HTML email templates
- ✅ Email verification

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Core Technologies

<table>
<tr>
<td width="25%" align="center">

![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)

**Runtime**

JavaScript runtime built on Chrome's V8 engine

</td>
<td width="25%" align="center">

![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)

**Framework**

Fast, minimalist web framework for Node.js

</td>
<td width="25%" align="center">

![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)

**Database**

NoSQL database with Mongoose ODM

</td>
<td width="25%" align="center">

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

**Language**

Typed superset of JavaScript

</td>
</tr>
</table>

### 📦 Dependencies

#### Production Dependencies

| Package                | Version | Purpose                       |
| ---------------------- | ------- | ----------------------------- |
| **express**            | 5.2.1   | Web application framework     |
| **mongoose**           | 9.2.0   | MongoDB object modeling       |
| **jsonwebtoken**       | 9.0.3   | JWT authentication            |
| **bcrypt**             | 6.0.0   | Password hashing              |
| **cors**               | 2.8.6   | Cross-origin resource sharing |
| **helmet**             | 8.1.0   | Security HTTP headers         |
| **express-rate-limit** | 8.2.1   | Rate limiting middleware      |
| **nodemailer**         | 8.0.1   | Email sending                 |
| **cookie-parser**      | 1.4.7   | Parse cookie headers          |
| **morgan**             | 1.10.1  | HTTP request logger           |
| **dotenv**             | 17.3.1  | Environment variables         |
| **moment**             | 2.30.1  | Date/time manipulation        |

#### Development Dependencies

| Package        | Version | Purpose                      |
| -------------- | ------- | ---------------------------- |
| **typescript** | 5.9.3   | TypeScript compiler          |
| **tsx**        | 4.21.0  | TypeScript execution & watch |
| **@types/\***  | Latest  | TypeScript type definitions  |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
Node.js >= 18.x
npm >= 9.x
MongoDB (local or Atlas)
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/JomsCode21/Bare-Minimum-Planner-Back-End.git
cd Bare-Minimum-Planner-Back-End
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/bare-minimum-planner
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bare-minimum-planner

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=Bare Minimum Planner <noreply@bareminimumplanner.com>

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

4. **Start the development server**

```bash
npm run dev
```

The server will start on `http://localhost:5000` 🚀

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/                   # Configuration files
│   │   └── mail.config.ts        # Email configuration
│   │
│   ├── controllers/              # Route controllers (business logic)
│   │   ├── task.controller.ts    # Task CRUD operations
│   │   └── user.controller.ts    # User authentication & management
│   │
│   ├── db/                       # Database connection
│   │   └── index.ts              # MongoDB connection setup
│   │
│   ├── middlewares/              # Custom middleware functions
│   │   ├── global-error-handler.middleware.ts
│   │   ├── limiter.middleware.ts              # Rate limiting
│   │   └── verify-token.middleware.ts         # JWT authentication
│   │
│   ├── models/                   # Mongoose models (schemas)
│   │   ├── task.models.ts        # Task schema & model
│   │   └── user.model.ts         # User schema & model
│   │
│   ├── routes/                   # API route definitions
│   │   ├── taskRoutes.ts         # Task endpoints
│   │   └── userRoutes.ts         # User & auth endpoints
│   │
│   ├── utils/                    # Utility functions
│   │   ├── mail.ts               # Email sending utilities
│   │   ├── ForgotPassword.ts     # Password reset logic
│   │   └── error/
│   │       └── app-error.util.ts # Custom error handler
│   │
│   └── index.ts                  # Application entry point
│
├── .env                          # Environment variables (not in git)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### 🔐 Authentication Endpoints

<table>
<thead>
<tr>
<th width="10%">Method</th>
<th width="30%">Endpoint</th>
<th width="40%">Description</th>
<th width="20%">Auth Required</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>POST</code></td>
<td><code>/users/register</code></td>
<td>Register a new user account</td>
<td>❌ No</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/users/login</code></td>
<td>Login with email and password</td>
<td>❌ No</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/users/logout</code></td>
<td>Logout current user</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/users/check-auth</code></td>
<td>Verify authentication status</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/users/check-email</code></td>
<td>Check if email exists</td>
<td>❌ No</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/users/forgotpassword</code></td>
<td>Request password reset email</td>
<td>❌ No</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/users/:id</code></td>
<td>Update user information</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/users/</code></td>
<td>Get all users (admin)</td>
<td>❌ No</td>
</tr>
</tbody>
</table>

### 📝 Task Endpoints

<table>
<thead>
<tr>
<th width="10%">Method</th>
<th width="30%">Endpoint</th>
<th width="40%">Description</th>
<th width="20%">Auth Required</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>GET</code></td>
<td><code>/tasks</code></td>
<td>Get all tasks for authenticated user</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/tasks</code></td>
<td>Create a new task</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/tasks/:id</code></td>
<td>Update a specific task</td>
<td>✅ Yes</td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td><code>/tasks/:id</code></td>
<td>Delete a specific task</td>
<td>✅ Yes</td>
</tr>
</tbody>
</table>

---

## 📋 API Request/Response Examples

### Register User

**Request:**

```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

**Request:**

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Create Task

**Request:**

```http
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README files",
  "isCompleted": false
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "id": "507f191e810c19729de860ea",
    "title": "Complete project documentation",
    "description": "Write comprehensive README files",
    "isCompleted": false,
    "userId": "507f1f77bcf86cd799439011",
    "createdAt": "2026-02-19T10:30:00.000Z",
    "updatedAt": "2026-02-19T10:30:00.000Z"
  }
}
```

### Get All Tasks

**Request:**

```http
GET /api/tasks
Authorization: Bearer <jwt_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "count": 3,
  "tasks": [
    {
      "id": "507f191e810c19729de860ea",
      "title": "Complete project documentation",
      "description": "Write comprehensive README files",
      "isCompleted": false,
      "createdAt": "2026-02-19T10:30:00.000Z"
    }
    // ... more tasks
  ]
}
```

---

## 🔒 Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Database
    participant JWT

    Client->>API: POST /users/register
    API->>Database: Create User
    Database-->>API: User Created
    API->>JWT: Generate Token
    JWT-->>API: JWT Token
    API-->>Client: User Data + Token (Cookie)

    Client->>API: POST /users/login
    API->>Database: Verify Credentials
    Database-->>API: User Found
    API->>JWT: Generate Token
    JWT-->>API: JWT Token
    API-->>Client: User Data + Token (Cookie)

    Client->>API: GET /tasks (with token)
    API->>JWT: Verify Token
    JWT-->>API: Token Valid
    API->>Database: Fetch Tasks
    Database-->>API: Tasks Data
    API-->>Client: Tasks Response
```

---

## 🛡️ Security Features

### Password Security

```typescript
// Passwords are hashed using bcrypt with salt rounds
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
```

### JWT Authentication

```typescript
// JWT tokens are signed and verified with a secret key
const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
  expiresIn: "7d",
});
```

### Rate Limiting

```typescript
// Prevents brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP",
});
```

### Security Headers (Helmet)

- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
- X-Download-Options
- X-DNS-Prefetch-Control

---

## 📝 Available Scripts

| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | 🔥 Start development server with hot reload and auto-restart |
| `npm run typecheck` | 🔍 Run TypeScript type checking without emitting files       |

### Development Workflow

```bash
# Start development server
npm run dev

# The server will:
# ✅ Watch for file changes
# ✅ Auto-reload on changes
# ✅ Load environment variables from .env
# ✅ Show detailed error messages
# ✅ Log all HTTP requests (morgan)
```

---

## 🗄️ Database Models

### User Model

```typescript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model

```typescript
{
  title: String (required),
  description: String,
  isCompleted: Boolean (default: false),
  userId: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Configuration

### MongoDB Connection

The application automatically connects to MongoDB on startup:

```typescript
// Local MongoDB
mongodb://localhost:27017/bare-minimum-planner

// MongoDB Atlas
mongodb+srv://<username>:<password>@cluster.mongodb.net/bare-minimum-planner
```

### CORS Configuration

```typescript
cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow cookies
});
```

### Environment Variables

| Variable         | Required | Default | Description                 |
| ---------------- | -------- | ------- | --------------------------- |
| `PORT`           | No       | 5000    | Server port                 |
| `MONGODB_URI`    | Yes      | -       | MongoDB connection string   |
| `JWT_SECRET`     | Yes      | -       | Secret key for JWT signing  |
| `JWT_EXPIRES_IN` | No       | 7d      | JWT expiration time         |
| `EMAIL_HOST`     | Yes      | -       | SMTP host                   |
| `EMAIL_PORT`     | Yes      | -       | SMTP port                   |
| `EMAIL_USER`     | Yes      | -       | Email account               |
| `EMAIL_PASSWORD` | Yes      | -       | Email password/app password |
| `FRONTEND_URL`   | Yes      | -       | Frontend application URL    |

---

## 🐛 Error Handling

The API uses a global error handler that returns consistent error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400,
    "stack": "Error stack trace (development only)"
  }
}
```

### Common HTTP Status Codes

| Code | Meaning                               |
| ---- | ------------------------------------- |
| 200  | Success                               |
| 201  | Created                               |
| 400  | Bad Request                           |
| 401  | Unauthorized                          |
| 403  | Forbidden                             |
| 404  | Not Found                             |
| 409  | Conflict (e.g., email already exists) |
| 429  | Too Many Requests (rate limit)        |
| 500  | Internal Server Error                 |

---

## 🧪 Testing

### Manual API Testing

You can test the API using tools like:

- **Postman** - [Download](https://www.postman.com/downloads/)
- **Insomnia** - [Download](https://insomnia.rest/download)
- **Thunder Client** - VS Code Extension
- **cURL** - Command line

### Example cURL Request

```bash
# Register a new user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'

# Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'

# Create a task (with auth token)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test Task",
    "description": "Task description"
  }'
```

---

## 🚀 Deployment

### Prerequisites for Production

- Node.js hosting (Heroku, Railway, Render, DigitalOcean, AWS, etc.)
- MongoDB Atlas (cloud database)
- Environment variables configured on hosting platform

### Environment Setup

1. **Set up MongoDB Atlas**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Get your connection string
   - Whitelist your application's IP

2. **Configure Environment Variables**
   - Set all required `.env` variables on your hosting platform
   - Use production-grade secrets for `JWT_SECRET`
   - Update `FRONTEND_URL` to your production domain

3. **Deploy**

```bash
# Build TypeScript (if needed)
npm run build

# Start production server
npm start
```

### Deployment Platforms

<table>
<tr>
<td align="center" width="33%">

#### Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

Fast, easy deployment with built-in PostgreSQL/MongoDB support

</td>
<td align="center" width="33%">

#### Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

Free tier available with automatic HTTPS

</td>
<td align="center" width="33%">

#### Heroku

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com)

Classic PaaS with extensive add-ons

</td>
</tr>
</table>

---

## 🔍 Troubleshooting

<details>
<summary><strong>Server won't start</strong></summary>

```bash
# Check if port is already in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                  # macOS/Linux

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

</details>

<details>
<summary><strong>Database connection failed</strong></summary>

1. Verify MongoDB is running (local):

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

2. Check connection string format
3. Verify network access (MongoDB Atlas)
4. Check firewall settings
</details>

<details>
<summary><strong>JWT authentication errors</strong></summary>

1. Ensure `JWT_SECRET` is set in `.env`
2. Check token expiration time
3. Verify Authorization header format: `Bearer <token>`
4. Clear cookies and login again
</details>

<details>
<summary><strong>Email not sending</strong></summary>

1. Verify SMTP credentials
2. For Gmail: Enable "Less secure app access" or use App Password
3. Check email service provider's sending limits
4. Verify network connectivity
</details>

<details>
<summary><strong>CORS errors</strong></summary>

1. Verify `FRONTEND_URL` matches exactly
2. Include trailing slash if necessary
3. Check credentials configuration
4. Ensure frontend sends credentials
</details>

---

## 📚 Additional Resources

### Documentation

- 📘 [Express.js Documentation](https://expressjs.com/)
- 🍃 [Mongoose Documentation](https://mongoosejs.com/docs/)
- 🔐 [JWT.io](https://jwt.io/)
- 📧 [Nodemailer Documentation](https://nodemailer.com/)
- 🛡️ [Helmet.js](https://helmetjs.github.io/)

### Learning Resources

- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB University](https://university.mongodb.com/)

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. ✍️ Commit your changes
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. 📤 Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. 🔃 Open a Pull Request

### Contribution Guidelines

- Write clear, descriptive commit messages
- Follow existing code style and patterns
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👥 Team

<table>
<tr>
<td align="center">
<a href="https://github.com/JomsCode21">
<img src="https://github.com/JomsCode21.png" width="100px;" alt="JomsCode21"/>
<br />
<sub><b>JomsCode21</b></sub>
</a>
<br />
🔧 💻 📖
</td>
</tr>
</table>

---

## 🙏 Acknowledgments

- 💚 **Express.js Team** - For the robust web framework
- 🍃 **MongoDB Team** - For the flexible NoSQL database
- 🔒 **Node.js Security Community** - For security best practices
- 📧 **Nodemailer Team** - For email functionality
- 🌟 **Open Source Community** - For amazing packages and support

---

## 🔗 Related Projects

- 🎨 [Frontend Repository](https://github.com/JomsCode21/Bare-Minimum-Planner-Front-End)
- 📝 [API Documentation](https://github.com/JomsCode21/Bare-Minimum-Planner-Back-End/wiki)
- 🐛 [Report Issues](https://github.com/JomsCode21/Bare-Minimum-Planner-Back-End/issues)
- 💬 [Discussions](https://github.com/JomsCode21/Bare-Minimum-Planner-Back-End/discussions)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Built with 💙 and ☕ by the Bare Minimum Planner Team**

[⬆ Back to Top](#-bare-minimum-planner---backend)

</div>
