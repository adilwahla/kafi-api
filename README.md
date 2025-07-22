# Kafah Injury Case API

A RESTful Node.js + Express API for managing injury case reports with authentication, Sequelize ORM, and auto-documented Swagger UI.

---

## 📦 Tech Stack

- Node.js + Express
- Sequelize (MySQL)
- Swagger (OpenAPI 3)
- JWT Authentication
- Role-based access (Admin, Super Admin, Employee)

---

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/adilwahla/kafi-api.git
cd kafi-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=kafah_db
DB_USER=root
DB_PASSWORD=yourpassword
JWT_SECRET=your_jwt_secret
```

> ✅ Replace the values with your actual MySQL credentials and desired JWT secret.

---

### 4. Run the Server

Using `nodemon`:

```bash
npm run dev
```

Or plain Node:

```bash
node server.js
```

---

## 🧪 API Documentation

Visit Swagger UI:

```
http://localhost:3000/api-docs
```

> 📘 Auto-generated from JSDoc comments using `swagger-jsdoc` and `swagger-ui-express`.

---

## ✅ Key API Endpoints

### 🔐 Mobile Authentication

| Method | Endpoint                                   | Description                          |
|--------|--------------------------------------------|--------------------------------------|
| POST   | `/api/public/v1/mobile/send-otp`           | Send OTP to mobile                   |
| POST   | `/api/public/v1/mobile/verify-otp`         | Verify OTP and get short token       |
| POST   | `/api/public/v1/mobile/complete-profile`   | Complete mobile user profile         |
| POST   | `/api/public/v1/mobile/login`              | Login with phone and password        |
| GET    | `/api/private/v1/mobile/me`                | Get logged-in mobile user profile    |

### 🦟 Injury Cases (Protected)

| Method | Endpoint                                         | Description                     |
|--------|--------------------------------------------------|---------------------------------|
| POST   | `/api/private/v1/injury-cases/create`            | Bulk create injury cases        |
| POST   | `/api/private/v1/injury-cases/assign`            | Assign cases to users           |
| GET    | `/api/private/v1/injury-cases`                   | Get injury cases with filters   |
| PATCH  | `/api/private/v1/injury-cases/{id}/submit`       | Submit an injury case           |
| PATCH  | `/api/private/v1/injury-cases/{id}/approve`      | Approve an injury case          |
| PATCH  | `/api/private/v1/injury-cases/{id}/reject`       | Reject an injury case           |
| PATCH  | `/api/private/v1/injury-cases/{id}/close`        | Close an injury case            |
| PATCH  | `/api/private/v1/injury-cases/{id}/delete`       | Soft-delete an injury case      |

---

## 📁 Folder Structure

```
kafi-api/
├── controllers/         # Route handlers
├── routes/              # Express route files
├── services/            # Business logic
├── models/              # Sequelize models
├── middlewares/         # Auth and utilities
├── docs/                # Swagger setup
├── .env                 # Environment config
├── server.js            # App entry point
```

---

## ⚙️ Scripts

```bash
npm run dev     # Runs with nodemon
npm start       # Runs with node
```

---

## 🛡️ Auth Roles

- `SUPER_ADMIN` — Full access (dashboard)
- `ADMIN` — Limited dashboard control
- `EMPLOYEE` — Can submit cases
- `FIELD_INSPECTOR` — Mobile role

---

## 🛠️ Notes

- ✅ MySQL must be running
- ✅ DB must exist (e.g. `kafah_db`)
- ✅ Avoid using `sequelize.sync({ alter: true })` in production
- ✅ Always use `.env` file to configure your local setup

---

## 📄 License

MIT © [adilwahla](https://github.com/adilwahla)