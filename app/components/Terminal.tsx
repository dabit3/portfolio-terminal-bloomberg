'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import config from '../../config.json';

type OutputLine = {
  content: string | React.ReactNode;
  type: 'text' | 'command' | 'error' | 'banner' | 'link';
  delay?: number;
};

type HistoryEntry = {
  command: string;
  output: OutputLine[];
};

const COMMANDS = ['help', 'banner', 'about', 'projects', 'contact', 'clear'];

function SocialLink({ platform, value }: { platform: string; value: string }) {
  const urls: Record<string, string> = {
    email: `mailto:${value}`,
    github: `https://github.com/${value}`,
    linkedin: `https://linkedin.com/in/${value}`,
    twitter: `https://x.com/${value}`,
    substack: `https://${value}`,
  };

  const labels: Record<string, string> = {
    email: '✉ EMAIL',
    github: '⚡ GITHUB',
    linkedin: '💼 LINKEDIN',
    twitter: '𝕏 TWITTER',
    substack: '📝 SUBSTACK',
  };

  return (
    <a
      href={urls[platform]}
      target={platform === 'email' ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="social-link"
    >
      <span className="link-label">{labels[platform]}</span>
      <span className="link-value">{value}</span>
    </a>
  );
}

function ProjectCard({ name, description, link }: { name: string; description: string; link: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
    >
      <div className="project-name">{name}</div>
      <div className="project-desc">{description}</div>
      <div className="project-link">{link.replace('https://', '')}</div>
    </a>
  );
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [draftInput, setDraftInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Show banner on initial load
  useEffect(() => {
    const bannerOutput = getBannerOutput();
    setHistory([{ command: '', output: bannerOutput }]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  function getBannerOutput(): OutputLine[] {
    return config.content.ascii.map((line, i) => ({
      content: line,
      type: 'banner' as const,
      delay: i * 40,
    }));
  }

  function getHelpOutput(): OutputLine[] {
    return [
      { content: '┌─────────────────────────────────────────────────────────────┐', type: 'text' },
      { content: '│  COMMAND          │  DESCRIPTION                           │', type: 'text' },
      { content: '├───────────────────┼─────────────────────────────────────────┤', type: 'text' },
      { content: '│  help             │  Show this help menu                   │', type: 'text' },
      { content: '│  banner           │  Display the welcome banner            │', type: 'text' },
      { content: '│  about            │  Learn about me                        │', type: 'text' },
      { content: '│  projects         │  View my projects                      │', type: 'text' },
      { content: '│  contact          │  Get my contact information            │', type: 'text' },
      { content: '│  clear            │  Clear the terminal                    │', type: 'text' },
      { content: '└─────────────────────────────────────────────────────────────┘', type: 'text' },
      { content: '', type: 'text' },
      { content: '┌─────────────────────────────────────────────────────────────┐', type: 'text' },
      { content: '│  SHORTCUT         │  ACTION                                │', type: 'text' },
      { content: '├───────────────────┼─────────────────────────────────────────┤', type: 'text' },
      { content: '│  Tab              │  Auto-complete command                 │', type: 'text' },
      { content: '│  ↑ / ↓            │  Navigate command history              │', type: 'text' },
      { content: '│  Esc / Cmd+C      │  Clear current input                   │', type: 'text' },
      { content: '│  Enter            │  Execute command                       │', type: 'text' },
      { content: '└─────────────────────────────────────────────────────────────┘', type: 'text' },
    ];
  }

  function getAboutOutput(): OutputLine[] {
    return [
      { content: '╔══════════════════════════════════════════════════════════════╗', type: 'text' },
      { content: '║  ABOUT                                                       ║', type: 'text' },
      { content: '╚══════════════════════════════════════════════════════════════╝', type: 'text' },
      { content: '', type: 'text' },
      { content: config.identity.greeting, type: 'text' },
      { content: '', type: 'text' },
      { content: 'I build things with code, write about emerging tech, and help', type: 'text' },
      { content: 'developers ship products faster. Currently focused on AI, Web3,', type: 'text' },
      { content: 'and the future of developer tooling.', type: 'text' },
      { content: '', type: 'text' },
      { content: '───────────────────────────────────────────────────────────────', type: 'text' },
      { content: '', type: 'text' },
      {
        content: (
          <div className="social-grid">
            {Object.entries(config.content.social).map(([platform, value]) => (
              <SocialLink key={platform} platform={platform} value={value} />
            ))}
          </div>
        ),
        type: 'link',
      },
    ];
  }

  function getProjectsOutput(): OutputLine[] {
    return [
      { content: '╔══════════════════════════════════════════════════════════════╗', type: 'text' },
      { content: '║  PROJECTS                                                    ║', type: 'text' },
      { content: '╚══════════════════════════════════════════════════════════════╝', type: 'text' },
      { content: '', type: 'text' },
      {
        content: (
          <div className="projects-grid">
            {config.content.projects.map((project) => (
              <ProjectCard
                key={project.name}
                name={project.name}
                description={project.description}
                link={project.link}
              />
            ))}
          </div>
        ),
        type: 'link',
      },
    ];
  }

  function getContactOutput(): OutputLine[] {
    return [
      { content: '╔══════════════════════════════════════════════════════════════╗', type: 'text' },
      { content: '║  CONTACT                                                     ║', type: 'text' },
      { content: '╚══════════════════════════════════════════════════════════════╝', type: 'text' },
      { content: '', type: 'text' },
      { content: 'Feel free to reach out! I\'m always happy to chat about new', type: 'text' },
      { content: 'projects, collaborations, or just to say hello.', type: 'text' },
      { content: '', type: 'text' },
      {
        content: (
          <div className="social-grid">
            {Object.entries(config.content.social).map(([platform, value]) => (
              <SocialLink key={platform} platform={platform} value={value} />
            ))}
          </div>
        ),
        type: 'link',
      },
    ];
  }

  function getErrorOutput(cmd: string): OutputLine[] {
    return [
      { content: `Command not found: ${cmd}`, type: 'error' },
      { content: 'Type \'help\' to see available commands.', type: 'text' },
    ];
  }

  function executeCommand(cmd: string) {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    let output: OutputLine[];
    
    switch (trimmedCmd) {
      case 'help':
        output = getHelpOutput();
        break;
      case 'banner':
        output = getBannerOutput();
        break;
      case 'about':
        output = getAboutOutput();
        break;
      case 'projects':
        output = getProjectsOutput();
        break;
      case 'contact':
        output = getContactOutput();
        break;
      case '':
        output = [];
        break;
      default:
        output = getErrorOutput(trimmedCmd);
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Tab auto-complete
    if (e.key === 'Tab') {
      e.preventDefault();
      const matches = COMMANDS.filter((cmd) => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
      return;
    }

    // Enter to execute
    if (e.key === 'Enter') {
      executeCommand(input);
      setHistoryIndex(-1);
      setDraftInput('');
      setInput('');
      return;
    }

    // Escape or Cmd+C to clear input
    if (e.key === 'Escape' || (e.key === 'c' && e.metaKey)) {
      e.preventDefault();
      setInput('');
      return;
    }

    // Arrow up - previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commandHistory = history.filter((h) => h.command).map((h) => h.command);
      if (commandHistory.length === 0) return;
      
      if (historyIndex === -1) {
        setDraftInput(input);
      }
      
      const newIndex = historyIndex + 1;
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
      return;
    }

    // Arrow down - next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const commandHistory = history.filter((h) => h.command).map((h) => h.command);
      
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput(draftInput);
      }
      return;
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="terminal-wrapper" ref={terminalRef} onClick={focusInput}>
      {/* Header Bar */}
      <header className="terminal-header">
        <div className="header-left">
          <div className="window-controls">
            <span className="control close"></span>
            <span className="control minimize"></span>
            <span className="control maximize"></span>
          </div>
          <div className="header-title">
            <span className="title-primary">NADER DABIT</span>
            <span className="title-divider">│</span>
            <span className="title-secondary">TERMINAL v1.0</span>
          </div>
        </div>
        <div className="header-center">
          <div className="status-indicators">
            <span className="status-dot active"></span>
            <span className="status-text">CONNECTED</span>
            <span className="status-divider">│</span>
            <span className="status-text">SESSION ACTIVE</span>
          </div>
        </div>
        <div className="header-right">
          <span className="header-time">{formatTime(currentTime)}</span>
          <span className="header-date">{formatDate(currentTime)}</span>
        </div>
      </header>

      {/* Main Terminal Area */}
      <main className="terminal-main">
        {/* Side Panel - Stats */}
        <aside className="terminal-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-header">SYSTEM</div>
            <div className="sidebar-content">
              <div className="stat-row">
                <span className="stat-label">UPTIME</span>
                <span className="stat-value blink">●</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">SHELL</span>
                <span className="stat-value">ZSH</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">NODE</span>
                <span className="stat-value">v20.x</span>
              </div>
            </div>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-header">QUICK CMDS</div>
            <div className="sidebar-content">
              {COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  className="quick-cmd"
                  onClick={(e) => {
                    e.stopPropagation();
                    executeCommand(cmd);
                  }}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
          <div className="sidebar-section">
            <div className="sidebar-header">LINKS</div>
            <div className="sidebar-content links">
              <a href={`https://github.com/${config.content.social.github}`} target="_blank" rel="noopener noreferrer">
                ◈ GitHub
              </a>
              <a href={`https://x.com/${config.content.social.twitter}`} target="_blank" rel="noopener noreferrer">
                ◈ Twitter
              </a>
              <a href={`https://${config.content.social.substack}`} target="_blank" rel="noopener noreferrer">
                ◈ Substack
              </a>
            </div>
          </div>
        </aside>

        {/* Terminal Output */}
        <div className="terminal-output-wrapper">
          <div className="output-header">
            <span>OUTPUT</span>
            <span className="output-scroll-indicator">↓ SCROLL</span>
          </div>
          <div className="terminal-output" ref={outputRef} aria-label="Terminal output">
            {history.map((entry, entryIndex) => (
              <div key={entryIndex} className="history-entry">
                {entry.command && (
                  <div className="command-line">
                    <span className="prompt">
                      <span className="prompt-user">{config.identity.username}</span>
                      <span className="prompt-at">@</span>
                      <span className="prompt-host">{config.identity.hostname}</span>
                      <span className="prompt-symbol"> $ </span>
                    </span>
                    <span className="command-text">{entry.command}</span>
                  </div>
                )}
                <div className="output-lines">
                  {entry.output.map((line, lineIndex) => (
                    <div
                      key={lineIndex}
                      className={`output-line ${line.type} typewriter`}
                      style={{ animationDelay: `${(line.delay || lineIndex * 40)}ms` }}
                    >
                      {line.content}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="terminal-input-area">
            <div className="input-line">
              <label className="prompt" aria-label="Command prompt">
                <span className="prompt-user">{config.identity.username}</span>
                <span className="prompt-at">@</span>
                <span className="prompt-host">{config.identity.hostname}</span>
                <span className="prompt-symbol"> $ </span>
              </label>
              <div className="input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  className="terminal-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
                <span className={`cursor ${showCursor ? 'visible' : ''}`}>█</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="terminal-footer">
        <div className="footer-left">
          <span className="footer-hint">TAB</span> autocomplete
          <span className="footer-divider">│</span>
          <span className="footer-hint">↑↓</span> history
          <span className="footer-divider">│</span>
          <span className="footer-hint">ESC</span> clear
        </div>
        <div className="footer-right">
          <span className="footer-status">● READY</span>
        </div>
      </footer>
    </div>
  );
}
