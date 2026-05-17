# AI Code Assistant

AI Code Assistant is a Next.js application that helps users work with code faster using Google Gemini. It can explain code, debug code, and generate fresh code from a prompt in the programming language the user chooses.

## Features

- Explain user code with a summary, step-by-step breakdown, and improvement suggestions
- Debug user code by analyzing the source code and optional error message
- Generate code from a plain-English description
- Support different programming languages for generated output
- API-based structure that is easy to extend with a custom frontend

## Core Capabilities

### 1. Explain Code
Send a code snippet and the app returns:

- What the code does
- A step-by-step explanation
- Possible issues or improvements

Endpoint:

```http
POST /api/explain
```

Example request:

```json
{
  "code": "function add(a, b) { return a + b; }"
}
```

### 2. Debug Code
Send code with an optional error message and the app returns:

- The likely cause of the error
- A step-by-step fix
- Corrected code guidance
- Tips to avoid the same issue later

Endpoint:

```http
POST /api/debug
```

Example request:

```json
{
  "code": "console.log(user.name)",
  "errorMessage": "Cannot read properties of undefined"
}
```

### 3. Generate Code
Describe what you want to build and choose a programming language. The app returns:

- Generated code
- A short explanation
- Example usage when relevant

Endpoint:

```http
POST /api/generate
```

Example request:

```json
{
  "programmingLanguage": "TypeScript",
  "description": "Create a function that groups an array of users by role."
}
```

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Google Gemini via `@google/generative-ai`
- Tailwind CSS 4

## Project Structure

```text
app/
  api/
    explain/route.ts
    debug/route.ts
    generate/route.ts
  components/
  types/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- The AI routes use the `gemini-2.5-flash` model
- `GEMINI_API_KEY` is required for all AI features to work
- The backend feature routes are implemented and ready to connect to a richer UI

## Future Improvements

- Add a full interactive frontend for submitting code and prompts
- Save prompt and response history
- Add syntax highlighting for input and output
- Let users upload files instead of pasting code manually
- Add copy, export, and share actions for generated results

## License

This project is for learning and personal development use unless you choose to add your own license.
