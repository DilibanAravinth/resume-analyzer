# Woolf Assessment: Full-Stack Engineer

This repository implements a full-stack solution for analyzing a candidate's CV against a job description using Node.js, tRPC, and React.

## Features

- Upload a CV and job description (PDF)
- AI-powered analysis using Gemini 1.5 Flash
- Clear summary of candidate strengths, weaknesses, and alignment
- Modern React UI, easy to test and use

## Stack

- **Backend:** Node.js, Express, tRPC
- **Frontend:** Next.js, React, tRPC client
- **PDF Parsing:** `pdf-parse`
- **AI API:** Gemini 1.5 Flash

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd woolf-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**

   Copy `.env.example` to `.env` in `apps/server/` and add your Gemini authorization token:
   ```
   GEMINI_API_KEY=your_token_here
   ```

4. **Run the development servers**

   In one terminal:
   ```bash
   npm run dev:server
   ```

   In another:
   ```bash
   npm run dev:web
   ```

5. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000) to use the UI.

## Testing

- The backend has basic integration tests (see `apps/server/tests`).
- The frontend can be tested using Playwright or Cypress (see `apps/web/__tests__`).

## Usage

1. Upload a job description and a CV in PDF format.
2. Wait for the AI-powered analysis.
3. View the strengths, weaknesses, and alignment results.

---

**Rate limits:** 20 requests/minute, 300 requests/hour to Gemini endpoint.

**AI API:** Follows VertexAI `GenerateContentRequest` format.

---

## DX

- Fast refresh, typed APIs, and clear error messages
- All code and config in TypeScript
- Easy to adapt for other AI endpoints or PDF parsers

---

## License

MIT