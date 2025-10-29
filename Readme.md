## Live Link - https://email-classifier-tau.vercel.app
**You need to wait if you are using first time as using free cloud service it takes upto one min to start backend**

An intelligent web application that allows users to **log in with Google OAuth**, **fetch their last X emails from Gmail**, and **classify them into categories** like *Important*, *Promotions*, *Social*, *Marketing*, *Spam*, or *General* — powered by **OpenAI GPT-4o** and **Gemini AI**.

---

## 🚀 Overview

This project is built as part of the **Full-Stack Engineer Intern Assignment** for **MagicSlides.app**.
It demonstrates my ability to design, build, and deploy a full-stack AI-integrated application using modern tools and best practices.

### ✨ Key Features

* 🔐 **Google OAuth 2.0 Authentication** – Secure login with Gmail.
* 📬 **Fetch Emails from Gmail API** – Retrieves last X emails (default: 15).
* 🤖 **AI-Powered Classification** – Uses GPT-4o (via OpenAI API) for intelligent categorization.
* 💾 **Local Data Persistence** – Emails stored in browser’s `localStorage` (no DB required).
* 🪄 **Responsive UI** – Built with React + TailwindCSS for smooth UX.
* ⚙️ **MERN Backend** – Express.js API for authentication and email routes.
* 🌐 **Deployed Setup** – Frontend on **Vercel**, Backend on **Render**.

---

## 🏗️ Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Frontend   | React (Vite) / TailwindCSS           |
| Backend    | Node.js + Express.js                 |
| Auth       | Google OAuth 2.0 (Passport.js)       |
| AI Model   | Gemini API                           |
| Email API  | Gmail API                            |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## ⚙️ Architecture Overview

```
Frontend (React + Tailwind)
│
├── Google Login → Redirects to Backend (/auth/google)
│
├── Receives user session + stores OpenAI API key in localStorage
│
├── Fetch Emails (Gmail API) → Display in Dashboard
│
└── Classify Emails using GPT-4o → Display results in categorized tabs
```

Backend (Express + Passport + Session)

```
- Handles Google OAuth login/logout
- Issues session cookies (secure in production)
- Routes:
  • /auth/google → Login with Google
  • /auth/google/callback → Auth redirect
  • /api/emails/fetch → Fetch Gmail emails (using user token)
  • /api/emails/classify → Classify using OpenAI GPT-4o
```

---

## 🧠 How Email Classification Works

Each fetched email (subject + snippet/body) is passed to GPT-4o with the following prompt:

> “Classify this email as one of the following: Important, Promotions, Social, Marketing, Spam, or General.”

The model returns the label, which is displayed in categorized sections on the dashboard.

---

## 🧰 Environment Variables

Create a `.env` file in the backend root directory with:

```
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_CALLBACK_URL=<your_backend_url>/auth/google/callback
SESSION_SECRET=<any_random_secret>
GEMINI_API_KEY=<your_gemini_or_openai_key>
FRONTEND_URL=<your_frontend_url>
PORT=5000
NODE_ENV=development
```

For local testing:

```
FRONTEND_URL=http://localhost:5173
```

For production:

```
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## 🧩 Installation & Setup

### 🖥️ 1. Clone the Repository

```bash
git clone https://github.com/SaqibDar112/email-classifier.git
cd email-classifier
```

### ⚙️ 2. Backend Setup

```bash
cd backendEmailClassifier
npm install
```

Create `.env` file (see above), then run:

```bash
npm run dev
```

### 💻 3. Frontend Setup

```bash
cd frontendEmailClassifier
npm install
```

Add your backend URL in `.env`:

```
VITE_BACKEND_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Visit:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🌍 Deployment

* **Frontend:** Deploy to [Vercel](https://vercel.com/)
  Example: `https://emailclassifier.vercel.app`
* **Backend:** Deploy to [Render](https://render.com/)
  Example: `https://emailclassifier.onrender.com`

Make sure to set environment variables on both platforms.

---

## 🔒 Authentication Notes

Due to Google’s verification policies:

> You must add **[theindianappguy@gmail.com](mailto:theindianappguy@gmail.com)** as a test user in your Google Cloud OAuth credentials.

Steps:

1. Go to [Google Cloud Console → APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials).
2. Select your OAuth Client ID.
3. Add `theindianappguy@gmail.com` under “Test Users”.
4. Save and redeploy your backend.

---

## 🧪 Testing Locally

1. Start backend: `npm run dev` (port 5000)
2. Start frontend: `npm run dev` (port 5173)
3. Go to `http://localhost:5173`
4. Log in with Google → Fetch emails → Classify with AI
5. Results appear in category cards.

---

## 🧠 Example Classifications

| Category       | Description                              |
| -------------- | ---------------------------------------- |
| **Important**  | Work/personal emails needing attention   |
| **Promotions** | Sales, discounts, campaigns              |
| **Social**     | From friends, family, or social networks |
| **Marketing**  | Newsletters, brand notifications         |
| **Spam**       | Unwanted or unsolicited mail             |
| **General**    | Anything that doesn’t fit above          |

---

## 🪄 Future Enhancements

* ✉️ Paginated email fetching
* 🧭 Search & filter support
* 💾 Optional database storage for analytics
* 📊 Classification accuracy tracking
* 🌙 Dark mode

---

## 🧑‍💻 Author

**Saqib Dar**
Full Stack Developer | MERN + AI Integrations
🔗 [GitHub](https://github.com/SaqibDar112)
📧 [darsaqib4979@gmail.com](mailto:darsaqib4979@gmail.com)

---

## 🧾 License

This project is licensed under the **MIT License**.

---

✅ *Built with passion, precision, and clean code for MagicSlides.app.*



