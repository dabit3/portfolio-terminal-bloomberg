# Terminal Portfolio

A Bloomberg Terminal-inspired portfolio website built with Next.js. Visitors interact with your portfolio through a command-line interface, typing commands to learn about you, your projects, and how to get in touch.

## Features

- **Terminal UI** — Full-screen terminal with macOS window controls, scrollable output, and blinking cursor
- **Commands** — `help`, `banner`, `about`, `projects`, `contact`, `clear`
- **Keyboard Shortcuts** — Tab autocomplete, arrow key history navigation, Escape to clear input
- **Typewriter Animations** — Staggered output with CSS-driven typewriter effects
- **Fully Configurable** — All content, colors, and fonts controlled via `config.json`

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the terminal.

## Configuration

Edit `config.json` to personalize:

- **identity** — Page title, terminal prompt username/hostname, greeting message
- **content.ascii** — ASCII art banner displayed on load
- **content.social** — Email, GitHub, LinkedIn, X, and Substack links
- **content.projects** — Portfolio projects with name, description, and URL
- **theme.colors** — Background, foreground, accent colors, link styles
- **theme.font** — Font family and fallbacks

## Commands

| Command   | Description                          |
|-----------|--------------------------------------|
| `help`    | List available commands              |
| `banner`  | Display ASCII art welcome banner     |
| `about`   | Show bio and social links            |
| `projects`| Browse portfolio projects            |
| `contact` | View contact information             |
| `clear`   | Clear terminal output                |

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript
