Email Classifier AI - MagicSlides Assignment

This project is a full-stack web application that allows users to log in with their Google account, fetch their 15 most recent emails, and then use AI to classify them into categories (Important, Promotions, Social, etc.).

Features

Google OAuth 2.0: Secure login using Passport.js to get permission to read emails.

Gmail API Integration: Fetches the user's last 15 emails, including subject, sender, and snippet.

AI Classification: Uses LangChain.js to manage and parse responses from an AI model, sorting emails by category.

Secure Auth: Uses http-only session cookies for secure, professional-grade authentication.

Email Caching: Stores fetched emails in localStorage to reduce API calls, as per the assignment.

Tech Stack

Frontend: React (Vite), Tailwind CSS

Backend: Express.js, Passport.js, Google APIs

AI: LangChain.js (@langchain/google-genai)

Project Structure

This repository is a monorepo containing two separate projects:

/frontendEmailClassifier: The React frontend application.

/backendEmailClassifier: The Express.js backend server.

Setup & Installation

You must set up both the backend and frontend separately.

Prerequisites

Node.js (v18 or higher)

A Google Cloud Platform project

A Google AI Studio (Gemini) API Key

1. Google Cloud Console Setup (Critical)

Before starting, you must get your Google credentials.

Go to the Google Cloud Console.

Create a new project.

Go to APIs & Services > Credentials.

Click Create Credentials > OAuth client ID.

Select Web application.

Under Authorized redirect URIs, add your backend callback URL:

http://localhost:5000/auth/google/callback

Click Create. You will get your Client ID and Client Secret. Save these.

Go to APIs & Services > OAuth consent screen.

Under Test users, click Add Users and add the required test account:

theindianappguy@gmail.com

Go to APIs & Services > Library and ensure the Gmail API is enabled.

2. Google AI Studio Setup

Go to Google AI Studio (formerly MakerSuite).

Create a new API key. Save this key.

3. Backend Setup

Navigate to the backend folder:

cd backendEmailClassifier


Install dependencies:

npm install


Create a .env file in this folder:

touch .env


Add your credentials to the .env file:

# Google OAuth Credentials (from Step 1)
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_SECRET

# Google AI Studio Key (from Step 2)
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

# A random string for session security
SESSION_SECRET=myrandomsecretkey12345


4. Frontend Setup

Open a new terminal and navigate to the frontend folder:

cd frontendEmailClassifier


Install dependencies:

npm install


Create a .env file for your Vite environment:

touch .env


Add the path to your backend server:

# This must match the port in your backend's server.js
VITE_BACKEND_URL=http://localhost:5000


Running the Application

Start the Backend:
In your first terminal (in /backendEmailClassifier):

npm run dev


(This assumes you have a dev script for nodemon in your package.json)

Start the Frontend:
In your second terminal (in /frontendEmailClassifier):

npm run dev


Open your browser and go to http://localhost:5173.

Note on Tech Stack (Assignment Requirement)

This project fully implements the assignment's logic. It meets the requirement to use LangChain.js for handling AI classification.

Due to expired OpenAI trial credits, LangChain.js has been connected to the Google Gemini API (gemini-2.5-flash-lite) instead of GPT-4o. This change maintains the core requirement of using LangChain for prompt management and reliable JSON output parsing (StructuredOutputParser) while utilizing the free tier of the Gemini API.