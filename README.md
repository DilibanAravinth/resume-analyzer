# Resume Analyzer (Woolf Assessment – Full-Stack Engineer)

A full-stack project that uses **Node.js**, **tRPC**, and **React** to analyze a candidate's resume against a job description using **Gemini 1.5 Flash**. It compares two PDF documents—CV and Job Description—and provides insights such as strengths, weaknesses, and how well the candidate fits the job.

---

## ✨ Features

- Upload a **CV** and a **Job Description** in PDF format.
- Sends both files to Gemini 1.5 Flash for AI analysis.
- Outputs:
  - Candidate strengths
  - Candidate weaknesses
  - Alignment/match summary
- Built with:
  - **tRPC** for end-to-end type-safe APIs
  - **React** + **Tailwind CSS** for a clean and minimal UI
- Great **developer experience (DX)**: easy to run, test, and extend

---

## 🛠 Tech Stack

| Layer      | Technology                       |
|------------|----------------------------------|
| Frontend   | React, Tailwind CSS, tRPC client |
| Backend    | Node.js, tRPC,   |
| AI Service | Gemini 1.5 Flash (via REST API)  |
| Utilities  | Zod (validation), Vite (dev server) |

---

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone <your-repo-url>
cd resume-analyzer-main
2. Install Dependencies

# At root
npm install

# Server dependencies
cd server
npm install

# Client dependencies
cd client
npm install
```

### 2. 🔐 Environment Variables
Create a .env file in the server/ folder:

```bash
env
PORT=3000 //default
GEMINI_API_URL=https://intertest.woolf.engineering/invoke
GEMINI_API_KEY=<your-authorization-token>
```

### 3. 📦 Running the App
Run the command from the root of the folder
```bash
npm run dev
```

📁 Usage Instructions

Open the web app at http://localhost:5173

1. Upload a CV (PDF)

2. Upload a Job Description (PDF)

3. Click Analyze

##### View AI-powered analysis including:

1. Key strengths

2. Identified weaknesses

3. Fitment report

### 🧪 Testing Tips
Use PDF files under 5 MB.

Check browser devtools → network tab to inspect the request payload.

Ensure your .env has the correct API URL and token.

Logs will help verify if Gemini API returns data correctly.


📂 Project Structure

```bash
Edit
resume-analyzer-main/
├── server/                 # Node.js server with tRPC
│   ├── src/
│   │   ├── constants/      # Prompt and type constants
│   │   └── routers/        # tRPC routes
│   ├── index.ts            # Express + tRPC integration
│   └── .env                # Secrets for Gemini API
├── src/                    # React frontend with tRPC client
│   └── pages/              # Main UI components
├── public/                 # Static assets
├── package.json            # Root project config
├── README.md               # This file
```

📄 License
This project is intended for Woolf’s Full-Stack Engineer assessment.

yaml
Copy
Edit

---

Let me know if you'd like me to:
- Save this to your codebase (`resume-analyzer-main/README.md`)
- Add screenshots
- Convert it to PDF format  
- Include badges or deploy instructions (e.g. Vercel + Render)

Just say the word!