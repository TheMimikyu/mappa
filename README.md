# Mappa - AI Powered Mind Map Visualization

A [Next.js](https://nextjs.org) application for mind map visualization powered by [React Flow](https://reactflow.dev/). Built with [shadcn](https://ui.shadcn.com/) and [Magic UI](https://magicui.design/).

Generate mind maps using [Ollama](https://ollama.com/) local models and interact with them through an intuitive interface.

## Demo

[![Demo](https://raw.githubusercontent.com/TheMimikyu/mappa/refs/heads/main/public/demo.png)](https://raw.githubusercontent.com/TheMimikyu/mappa/refs/heads/main/public/demo.mp4)


## Features

- Interactive mind map visualization
- Node details sidebar
- Export to Markdown or JSON
- Local model support via Ollama

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Configure Model:
- In `route.ts`, specify your Ollama model (default: `llama3.2`)
- Note: Local models are slower than cloud-based ones
- See [Ollama docs](https://github.com/ollama/ollama/blob/main/README.md#quickstart) for model setup

3. Start server:
```bash
npm run dev
```

4. Access application:
- Open [http://localhost:3000](http://localhost:3000)
- Begin creating mind maps

## Configuration

Mind map generation prompts are configured in `prompts.ts` under `defaultLocalPrompt` variable.

## Usage

### Creating a Mind Map
1. Enter a topic in the input field
2. Wait for the AI to generate the initial mind map
3. Click nodes to view details in the sidebar
4. Use the expand button (➡️) to generate subtopics
5. Toggle subtopics using the arrow buttons

### Navigation
- Pan: Drag empty space
- Zoom: Mouse wheel or pinch gesture
- Select: Click on nodes
- Move: Drag nodes (if enabled)
- Expand: Click arrow button on nodes

### Exporting
- Download as Markdown: Creates a hierarchical document
- Download as JSON: Preserves full mind map structure

### Project Structure

```
├── README.md
├── app
│   ├── api
│   │   └── generate
│   │       └── route.ts
│   ├── components
│   │   ├── CreateMindMap.tsx
│   │   ├── CreateMindMapForm.tsx
│   │   ├── Credits.tsx
│   │   ├── Hero.tsx
│   │   ├── LoadingMindMap.tsx
│   │   ├── MindMap.tsx
│   │   ├── MindMapContainer.tsx
│   │   └── MindMapLegend.tsx
│   ├── favicon.ico
│   ├── fonts
│   ├── globals.css
│   ├── hooks
│   │   └── useMindMapData.ts
│   ├── layout.tsx
│   ├── lib
│   │   ├── prompts.ts
│   │   └── schemas.ts
│   └── page.tsx
├── components
│   └── ui
├── components.json
├── lib
│   └── utils.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   └── demo.mp4
├── tailwind.config.ts
└── tsconfig.json
```
