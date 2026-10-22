"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownToLine, ArrowUpRight, Bell, Boxes, CheckCircle2,
  ChevronDown, CircleHelp, Cloud, Code2, ExternalLink, GitBranch,
  Github, Globe2, LayoutDashboard, LifeBuoy, Menu, Plus, Search,
  Settings, ShieldCheck, Sparkles, TerminalSquare, X, Zap
} from "lucide-react";

type Project = {
  name: string;
  repo: string;
  branch: string;
  framework: string;
  status: "Ready" | "Building";
  domain: string;
  updated: string;
};

const initialProjects: Project[] = [
  { name: "ansh-portfolio", repo: "anshmaurya/ansh-portfolio", branch: "main", framework: "Next.js", status: "Ready", domain: "ansh-portfolio.vercel.app", updated: "12 min ago" },
  { name: "telegram-tools", repo: "anshmaurya/telegram-tools", branch: "main", framework: "Node.js", status: "Ready", domain: "telegram-tools.vercel.app", updated: "Yesterday" },
  { name: "cloud-dashboard", repo: "anshmaurya/cloud-dashboard", branch: "main", framework: "Next.js", status: "Building", domain: "—", updated: "Just now" },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [query, setQuery] = useState("");
  const [showConnect, setShowConnect] = useState(false);
  const [repoUrl, setRepoUrl] = useState("");
  const [notice, setNotice] = useState("Demo mode: connect a GitHub OAuth app and deployment backend to enable real deployments.");
  const [mobileNav, setMobileNav] = useState(false);

  const filtered = useMemo(() => projects.filter(p =>
    `${p.name} ${p.repo} ${p.framework}`.toLowerCase().includes(query.toLowerCase())
  ), [projects, query]);

  function connectRepo() {
    const value = repoUrl.trim();
    if (!value || !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(value)) {
      setNotice("Enter a valid public GitHub repository URL, for example https://github.com/owner/repository.");
      return;
    }
    const parts = value.replace(/\/$/, "").split("/");
    const owner = parts[parts.length - 2];
    const name = parts[parts.length - 1].replace(/\.git$/, "");
    setProjects(prev => [{
      name,
      repo: `${owner}/${name}`,
      branch: "main",
      framework: "Detect on import",
      status: "Building",
      domain: "Pending real deployment",
      updated: "Just now",
    }, ...prev]);
    setRepoUrl("");
    setShowConnect(false);
    setNotice(`Added ${owner}/${name} to the demo project list. Real deployment is not active until the backend is configured.`);
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Cloud size={23} /></div>
          <div><strong>ANSH<span>CLOUD</span></strong><small>DEPLOYMENT PLATFORM</small></div>
          <button className="mobile-close" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={19}/></button>
        </div>
        <div className="workspace"><div className="workspace-icon">A</div><div><b>Personal Workspace</b><small>Free plan</small></div><ChevronDown size={16}/></div>
        <p className="nav-label">WORKSPACE</p>
        <nav>
          <a className="nav-item active" href="#"><LayoutDashboard size={18}/> Overview</a>
          <a className="nav-item" href="#projects"><Boxes size={18}/> Projects <span className="nav-count">{projects.length}</span></a>
          <a className="nav-item" href="#activity"><Activity size={18}/> Deployments</a>
          <a className="nav-item" href="#domains"><Globe2 size={18}/> Domains</a>
        </nav>
        <p className="nav-label">SETTINGS</p>
        <nav>
          <a className="nav-item" href="#github"><Github size={18}/> Git integrations</a>
          <a className="nav-item" href="#settings"><Settings size={18}/> Settings</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><LifeBuoy size={17}/></div><b>Need a hand?</b><p>Read the setup guide to connect your deployment provider.</p><a href="#setup">View guide <ArrowUpRight size={14}/></a></div>
          <div className="user-row"><div className="avatar">AN</div><div><b>ANSH Admin</b><small>Starter workspace</small></div><ChevronDown size={16}/></div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={21}/></button>
          <div className="crumb">Workspace <span>/</span> <b>Overview</b></div>
          <div className="top-actions"><span className="status-pill"><span className="live-dot"/> All systems normal</span><button className="icon-btn" aria-label="Notifications" onClick={() => setNotice("You’re all caught up.")}><Bell size={18}/></button><div className="avatar top-avatar">AN</div></div>
        </header>

        <div className="content">
          <div className="welcome-row">
            <div><div className="eyebrow"><Sparkles size={14}/> YOUR CLOUD WORKSPACE</div><h1>Ship something <span>great.</span></h1><p>Deploy, manage, and monitor your projects from one place.</p></div>
            <button className="primary-btn" onClick={() => setShowConnect(true)}><Plus size={18}/> Add New Project</button>
          </div>

          {notice && <div className="notice"><CircleHelp size={17}/><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss notice"><X size={16}/></button></div>}

          <div className="stats-grid">
            <div className="stat-card"><div className="stat-top"><span>Total Projects</span><div className="stat-icon purple"><Boxes size={18}/></div></div><div className="stat-value">{projects.length.toString().padStart(2, "0")}<small> projects</small></div><div className="stat-foot"><span className="muted">Across your workspace</span></div></div>
            <div className="stat-card"><div className="stat-top"><span>Successful Deploys</span><div className="stat-icon green"><CheckCircle2 size={18}/></div></div><div className="stat-value">{projects.filter(p => p.status === "Ready").length.toString().padStart(2, "0")}<small> ready</small></div><div className="stat-foot"><span className="positive"><Activity size={13}/> Demo data</span><span className="muted">not live metrics</span></div></div>
            <div className="stat-card"><div className="stat-top"><span>Hosting Plan</span><div className="stat-icon blue"><Zap size={18}/></div></div><div className="stat-value">Free <small>tier</small></div><div className="stat-foot"><span className="muted">Provider limits apply</span><a href="#setup">Learn more <ArrowUpRight size={12}/></a></div></div>
          </div>

          <section className="section" id="projects">
            <div className="section-heading"><div><h2>Your Projects</h2><p>Repositories and deployment status in one view.</p></div><button className="outline-btn" onClick={() => setShowConnect(true)}><Github size={16}/> Import Git Repository</button></div>
            <div className="project-toolbar"><div className="searchbox"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search projects..." /></div><span className="project-total">{filtered.length} projects</span></div>
            <div className="project-list">
              {filtered.map((project, i) => <article className="project-card" key={`${project.repo}-${i}`}>
                <div className="project-logo"><Code2 size={21}/></div>
                <div className="project-main"><div className="project-title">{project.name} <span className={`badge ${project.status === "Ready" ? "badge-ready" : "badge-building"}`}><span/> {project.status}</span></div><div className="repo-line"><Github size={13}/>{project.repo}<span className="dot-sep">·</span><GitBranch size={13}/>{project.branch}</div><div className="framework">{project.framework}</div></div>
                <div className="project-meta"><small>Last updated</small><span>{project.updated}</span></div>
                <div className="project-actions">{project.domain.includes(".vercel.app") ? <a className="open-link" href={`https://${project.domain}`} target="_blank" rel="noreferrer">Visit <ExternalLink size={14}/></a> : <span className="pending">Not deployed</span>}<button className="more-btn" onClick={() => setNotice(`${project.name}: connect the deployment API to enable real build and redeploy actions.`)} aria-label={`More options for ${project.name}`}>•••</button></div>
              </article>)}
              {filtered.length === 0 && <div className="empty-state">No projects match “{query}”. Try another search.</div>}
            </div>
          </section>

          <div className="bottom-grid">
            <section className="panel" id="activity"><div className="panel-heading"><div><h2>Recent Activity</h2><p>Latest workspace events</p></div><button className="text-btn" onClick={() => setNotice("Activity shown here is sample data until connected to a backend.")}>View all <ArrowUpRight size={14}/></button></div>
              <div className="activity-item"><div className="activity-symbol green"><CheckCircle2 size={16}/></div><div><b>ansh-portfolio</b><p>Deployment ready on main</p><small>12 minutes ago</small></div><span className="tiny-status">Ready</span></div>
              <div className="activity-item"><div className="activity-symbol blue"><GitBranch size={16}/></div><div><b>cloud-dashboard</b><p>Deployment queued</p><small>Just now</small></div><span className="tiny-status queued">Queued</span></div>
              <div className="activity-item"><div className="activity-symbol purple"><Github size={16}/></div><div><b>Git integration</b><p>Waiting for OAuth setup</p><small>Setup required</small></div><span className="tiny-status queued">Pending</span></div>
            </section>
            <section className="panel quick-panel" id="setup"><div className="panel-heading"><div><h2>Quick Start</h2><p>Get your cloud ready</p></div><div className="quick-bolt"><Zap size={18}/></div></div>
              <a className="quick-step" href="https://github.com" target="_blank" rel="noreferrer"><div className="step-number">1</div><div><b>Connect GitHub</b><p>Prepare your repositories</p></div><ArrowUpRight size={16}/></a>
              <a className="quick-step" href="https://vercel.com/new" target="_blank" rel="noreferrer"><div className="step-number">2</div><div><b>Deploy dashboard</b><p>Import this project to Vercel</p></div><ArrowUpRight size={16}/></a>
              <a className="quick-step" href="https://vercel.com/docs" target="_blank" rel="noreferrer"><div className="step-number">3</div><div><b>Configure deployment API</b><p>Follow provider documentation</p></div><ArrowUpRight size={16}/></a>
            </section>
          </div>

          <footer><span>© 2026 ANSH CLOUD</span><span><ShieldCheck size={14}/> Starter dashboard · Secure your API keys</span><a href="https://vercel.com/docs" target="_blank" rel="noreferrer">Documentation <ArrowUpRight size={12}/></a></footer>
        </div>
      </section>

      {showConnect && <div className="modal-backdrop" onClick={() => setShowConnect(false)}><div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowConnect(false)} aria-label="Close"><X size={18}/></button>
        <div className="modal-logo"><Github size={25}/></div><h2>Import Git Repository</h2><p>Add a GitHub repository to your ANSH CLOUD project list.</p>
        <label htmlFor="repo">GitHub repository URL</label><input id="repo" className="modal-input" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://github.com/owner/repository"/>
        <div className="modal-hint">Example: https://github.com/vercel/next.js</div>
        <button className="primary-btn modal-submit" onClick={connectRepo}><ArrowDownToLine size={17}/> Add Repository</button>
        <div className="modal-warning">Demo only: this adds a project card. OAuth, repository permissions, build workers, and real deployments must be configured separately.</div>
      </div></div>}
    </main>
  );
}
