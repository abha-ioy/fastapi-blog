# 📝 FastAPI Blog

A simple blog app built with FastAPI, SQLAlchemy, and Jinja2 templates. You can create users, write posts, and view everything on a clean web interface.

---

## 🚀 Getting Started

### 1. Create a virtual environment

```bash
python -m venv .venv
```

### 2. Activate it

**Windows:**
```bash
source .\.venv\Scripts\activate
```

**Linux / macOS:**
```bash
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the app

If you have `uv` installed:
```bash
uv run fastapi dev main.py
```

Otherwise:
```bash
fastapi dev main.py
```

Then open your browser and go to `http://localhost:8000`

---

## 🗂️ Project Structure

```
.
│   main.py           ← App entry point, page routes, error handlers
│   models.py         ← Database models (User, Post)
│   schemas.py        ← Pydantic schemas for request/response
│   database.py       ← DB setup and session
│   auth.py           ← JWT auth helpers
│   config.py         ← App settings (.env loader)
│
├───routers/
│       users.py      ← User API routes
│       posts.py      ← Post API routes
│
├───templates/
│   │   base.html                     ← Base layout (extended by all pages)
│   ├───includes/
│   │       header.html
│   │       sidebar.html
│   ├───layouts/
│   │       blank.html
│   │       login-register-layout.html
│   ├───modals/
│   │       create-post.html
│   │       delete-modal.html
│   │       edit-post.html
│   │       post-feedback.html
│   └───pages/
│           home.html
│           post.html
│           user_posts.html
│           login.html
│           register.html
│           error.html
│
├───static/
│   ├───css/
│   │       styles.css
│   │       tailwind.css
│   └───js/
│           utils.js
│
└───media/
    └───profile_pics/
            default.jpg
```

---

## 🗃️ Database Models

### User
```
User
├── id           (int, primary key)
├── username     (string, unique)
├── email        (string, unique)
├── password_hash
├── image_file   (optional profile pic filename)
└── posts        → list of Post (one-to-many)
```

### Post
```
Post
├── id           (int, primary key)
├── title        (string)
├── content      (text)
├── date_posted  (datetime, auto-set)
├── user_id      → FK to User
└── author       → User (relationship)
```

---

## 🌐 Pages (Browser Routes)

| URL | What you see |
|-----|--------------|
| `/` or `/posts` | All posts (home feed) |
| `/posts/{id}` | Single post page |
| `/users/{id}/posts` | All posts by a user |
| `/login` | Login page |
| `/register` | Register page |

---

## 🔌 API Routes

### Users — `/api/users`

| Method | Endpoint | What it does |
|--------|----------|--------------|
| `POST` | `/api/users` | Register a new user |
| `POST` | `/api/users/token` | Login, get JWT token |
| `GET` | `/api/users/me` | Get logged-in user info |
| `GET` | `/api/users/{id}` | Get a user by ID |
| `PATCH` | `/api/users/{id}` | Update user info |
| `DELETE` | `/api/users/{id}` | Delete a user |
| `GET` | `/api/users/{id}/posts` | Get all posts by a user |

### Posts — `/api/posts`

| Method | Endpoint | What it does |
|--------|----------|--------------|
| `POST` | `/api/posts` | Create a new post |
| `GET` | `/api/posts` | Get all posts |
| `GET` | `/api/posts/{id}` | Get a single post |
| `PUT` | `/api/posts/{id}` | Replace a post fully |
| `PATCH` | `/api/posts/{id}` | Update part of a post |
| `DELETE` | `/api/posts/{id}` | Delete a post |

---

## 🔐 Auth (How it works — roughly)

```
# Register
POST /api/users  →  hashes password  →  saves user to DB

# Login
POST /api/users/token  →  checks email + password  →  returns JWT token

# Protected route
GET /api/users/me  →  reads token from header  →  returns user info
```

JWT tokens are created with an expiry time set in your `.env` file.

---

## ⚙️ Environment Variables

Create a `.env` file in the root folder:

```env
DATABASE_URL=sqlite+aiosqlite:///./blog.db
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## 📦 Main Dependencies

| Package | Version | What it's for |
|---------|---------|---------------|
| `fastapi` | 0.135.1 | The web framework |
| `uvicorn` | 0.41.0 | ASGI server that runs the app |
| `sqlalchemy` | 2.0.48 | Async database ORM |
| `aiosqlite` | 0.22.1 | Async SQLite driver |
| `jinja2` | 3.1.6 | HTML templating |
| `pydantic` | 2.12.5 | Data validation and schemas |
| `pydantic-settings` | 2.13.1 | Loads settings from `.env` |
| `python-dotenv` | 1.2.2 | Reads the `.env` file |
| `python-multipart` | 0.0.22 | Handles form data (login forms etc.) |
| `email-validator` | 2.3.0 | Validates email fields |
| `httpx` | 0.28.1 | HTTP client (used internally) |
| `rich` | 14.3.3 | Pretty terminal output |

> Everything else in `requirements.txt` are supporting libraries that get pulled in automatically.

---

## 📌 Notes

- The database file (`blog.db`) is created automatically on first run.
- Profile pictures go into `media/profile_pics/`. A `default.jpg` is already there.
- API docs are available at `http://localhost:8000/docs` (auto-generated by FastAPI).
- Error pages (404, 422, etc.) are handled with a custom `error.html` template.
