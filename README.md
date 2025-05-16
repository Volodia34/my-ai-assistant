# AI Assistant (Next.js, TypeScript, Tailwind CSS, Gemini API)

This project is an AI assistant web application built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and integration with the **Google Gemini API**.  
The application allows users to conduct multiple chats with an AI, receive responses including formatted code blocks, and stores chat history in `localStorage`.


## 🔗 Live Demo

Check out the live app here: [my-ai-assistant](https://my-ai-assistant-mu.vercel.app/)
---

## 🔑 Key Features

### 💬 Chat Interface
- Modern and responsive interface for interacting with the AI.

### 🗂 Chat Management
- Create new chats.
- Switch between active chats.
- Display a list of chats.

### 🤖 AI Interaction (Gemini API)
- Send user requests to the Gemini API via a secure server-side proxy route.
- Display AI responses.

### 🧠 Code Formatting
- Automatic detection and formatting of code blocks in AI responses with a "Copy code" button.

### 📝 Markdown Processing
- Basic text formatting (bold, italic, inline code, line breaks) in AI responses.

### ⌛ AI Typing Indicator
- Visual indicator while awaiting a response from the AI.

### 💾 State Persistence
- Chat history and the active chat are stored in the browser's `localStorage`, allowing session restoration after a page reload.

### 📱 Responsive Design
- The interface adapts to different screen sizes.

---

## 🛠 Technologies Used

### Frontend:
- Next.js (with App Router)
- React
- TypeScript
- Tailwind CSS

### API:
- Google Gemini API

### State Management:
- React Context API

### Deployment (Recommended):
- Vercel

---

## 📁 Project Structure (with `src` directory)

```
my-ai-assistant/
├── src/
│   ├── app/
│   │   ├── (main)/             # Main layout and chat page
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── gemini-proxy/   # Server-side proxy for Gemini API
│   │   │       └── route.ts
│   │   ├── globals.css         # Global styles (Tailwind)
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── chat/               # Components for the chat area
│   │   ├── layout/             # Layout components (e.g., Sidebar)
│   │   └── sidebar/            # Components for the sidebar
│   ├── context/                # React Context for state management
│   │   └── ChatContext.tsx
│   ├── hooks/                  # Custom React hooks (if any)
│   ├── lib/                    # Helper functions
│   └── types/                  # TypeScript types and interfaces
│       └── chat.ts
├── public/                     # Static files
├── .env.local.example          # Example file for environment variables
├── .gitignore
├── next.config.mjs
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 Installation and Setup

### Clone the repository:
```bash
git clone <YOUR_REPOSITORY_URL>
cd my-ai-assistant
```

### Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Set up environment variables:

Copy the `.env.local.example` file (if available) to `.env.local`:
```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your Gemini API key:
```env
GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY_HERE
```

### Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at:  
👉 `http://localhost:3000`

---

## 🏗 Production Build

```bash
npm run build
npm run start
```

---

## ☁️ Deployment

Deployment to **Vercel** is recommended.

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the Next.js settings.
3. **Important**: Add `GEMINI_API_KEY` as an environment variable in your project settings on Vercel.

---

## 🌟 Potential Future Enhancements

- Add syntax highlighting for code blocks (e.g., using `highlight.js` or `prism.js`).
- Ability to edit/delete messages.
- Save chats on a server instead of `localStorage` for cross-device synchronization.
- More advanced error handling.
- Configuration of generation parameters for the Gemini API (temperature, max tokens, etc.).
- Add tests.
- Internationalization (i18n).

---

Hope this README is helpful for your project! 🙌
