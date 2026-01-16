# Terminal Portfolio Website

Build a terminal-styled personal portfolio website. The site should look and feel like a command-line terminal where visitors type commands to learn about you.

The design should mimic Bloomberg Terminal or look like a bloomberg terminal themed or style.

## Core Features

### Terminal UI

- Full-screen terminal card with macOS-style window controls (red/yellow/green dots)
- Header bar with decorative dividers 
- Scrollable output area for command history
- Fixed input line at bottom with `username@hostname $` prompt format
- Auto-focus input on page load and when clicking anywhere on terminal
- Auto-scroll to latest output after each command

### Commands

- `help` - List all commands with descriptions and keyboard shortcuts
- `banner` - Display ASCII art banner and welcome message (shows on initial load)
- `about` - Personal greeting with social links (email, GitHub, LinkedIn, X, Substack)
- `projects` - List portfolio projects with name, description, and clickable link
- `contact` - Display contact information and social links
- `clear` - Clear terminal output and reset state

### Keyboard Shortcuts

- Enter: Execute command
- Tab: Auto-complete command names
- Escape / Cmd+C: Clear current input
- Arrow Up/Down: Navigate command history (preserve draft input when navigating)

### Animations

- Typewriter effect on output lines using CSS `clip-path` with `steps()` timing
- Staggered 40ms delays between output lines
- Fade-in and rise-in animations on initial load
- Respect `prefers-reduced-motion` preference

## Configuration

All content and theming via a single `config.json` file:

```json
{
  "identity": {
    "title": "Page title for browser tab",
    "username": "prompt-username",
    "hostname": "prompt-hostname",
    "greeting": "Personal greeting for about command"
  },
  "content": {
    "ascii": ["array", "of", "ASCII", "art", "lines"],
    "social": {
      "email": "email@example.com",
      "github": "username",
      "linkedin": "username",
      "twitter": "username",
      "substack": "subdomain.substack.com"
    },
    "projects": [
      { "name": "Project Name", "description": "Description", "link": "https://..." }
    ]
  },
  "theme": {
    "colors": {
      "background": "#somecolor",
      "foreground": "#somecolor",
      "banner": "#somecolor",
      "border": { "visible": true, "color": "#somecolor" },
      "prompt": { "default": "#somecolor", "user": "#somecolor", "host": "#somecolor", "input": "#somecolor" },
      "link": { "text": "#somecolor", "highlightColor": "#somecolor", "highlightText": "#somecolor" },
      "commands": { "textColor": "#somecolor" }
    },
    "font": { "family": "TBD", "fallback": "TBD" }
  }
}
```

## Technical Requirements

- Use CSS variables for dynamic theming (inject from config at runtime)
- Use TailwindCSS when it makes sense
- Responsive design with 600px breakpoint (smaller fonts/padding on mobile)
- ARIA labels on prompt and input for accessibility
- Social links normalize usernames to full URLs (e.g., "dabit3" → "github.com/dabit3")
- Unknown commands show friendly error with help suggestion

## Visual Design

- Bloomberg Terminal theme or design to look like "Bloomber Terminal" is the main goal
- Information density done right – Packed with data, multiple panels, and columns that feel busy but organized; the kind of interface where every pixel is working and nothing is wasted.
- Functional ugliness as a feature – It's not trying to be pretty, it's trying to be useful; that utilitarian roughness becomes its own kind of cool, like a cockpit or a trading floor.
- Monospace everything – That terminal-native typography where every character aligns in a grid, giving it that hacker-screen, command-line authenticity.
- High-contrast data hierarchy – Bright text on dark backgrounds, color-coded information chunks, numbers and labels that pop so your eye can scan quickly.
- Always-on energy – It feels alive and real-time, like something is happening right now; blinking cursors, timestamps, status indicators that make a portfolio feel like mission control instead of a static brochure.
- Dotted underline on links that becomes solid background on hover
- Visible focus states with ring outline
