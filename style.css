/* ------------------------------
   TaskMaster Pro - style.css
   Clean, modern, responsive
   ------------------------------ */

:root{
  --bg-dark:#1e3c72;
  --accent:#4a6cf7;
  --muted:#7b859c;
  --card:#ffffff;
  --panel:#f8f9ff;
  --danger:#f15b5b;
  --success:#27ae60;
  --glass: rgba(255,255,255,0.06);
  --radius:12px;
  --shadow: 0 10px 30px rgba(16,24,40,0.25);
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  display:flex;
  flex-direction:column;
  min-height:100vh;
  color:#1f2937;
  background: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}

/* Header */
.main-header{
  background: var(--bg-dark);
  color:#fff;
  padding:14px 20px;
  box-shadow:0 4px 12px rgba(0,0,0,0.15);
}
.header-inner{
  max-width:1100px;
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:20px;
}
.logo{font-weight:700; font-size:1.15rem; color:#fff; text-decoration:none}
.logo span{color:#9ec0ff}

/* Nav */
.nav ul{list-style:none;display:flex;gap:14px;align-items:center;margin:0;padding:0}
.nav-link{background:none;border:none;color:rgba(255,255,255,0.92);padding:8px 14px;border-radius:8px;cursor:pointer}
.nav-link:hover{background:rgba(255,255,255,0.06)}
.cta{background:var(--accent);color:#fff;padding:8px 12px;border-radius:10px;text-decoration:none;font-weight:600}
.cta:hover{background:#3a57d8}

/* Main container */
.app-main{
  padding:38px 16px;
  display:flex;
  justify-content:center;
  align-items:flex-start;
  flex:1;
}
.container{
  width:100%;
  max-width:1100px;
  background:transparent;
  border-radius:var(--radius);
  display:flex;
  flex-direction:column;
  gap:12px;
}

/* Tabs */
.app-tabs{
  display:flex;
  gap:8px;
  background:rgba(255,255,255,0.12);
  padding:8px;
  border-radius:10px;
  align-items:center;
}
.tab{
  flex:1;
  padding:10px 14px;
  border-radius:8px;
  border:none;
  background:transparent;
  color:#e6eefc;
  font-weight:600;
  cursor:pointer;
}
.btn-active, .tab.btn-active{
  background:var(--card);
  color:var(--bg-dark);
  box-shadow:var(--shadow);
}

/* Section content (card) */
.tab-content{
  display:none;
  background:var(--card);
  border-radius:12px;
  padding:18px;
  box-shadow:var(--shadow);
}
.tab-content.active{display:block}

/* Header inside section */
.section-heading{
  margin:0 0 14px;
  font-size:1.25rem;
  color:#fff;
  background:linear-gradient(90deg,var(--accent),#6e56d6);
  padding:12px;
  border-radius:10px;
  text-align:center;
}

/* Input panel */
.input-panel{
  display:flex;
  gap:12px;
  align-items:flex-start;
  padding:12px;
  border-radius:10px;
  background:var(--panel);
  margin-bottom:10px;
  flex-wrap:wrap;
}
.input-panel .col{flex:1;min-width:220px}
.input-panel .smalls{display:flex;gap:10px;flex-wrap:wrap}
.input-panel label{display:flex;flex-direction:column;font-size:12px;color:var(--muted);gap:6px}
.input-panel input[type="text"], .input-panel input[type="date"], .input-panel input[type="time"], .input-panel input[type="month"], .input-panel textarea, .input-panel select{
  padding:10px 12px;border-radius:10px;border:1px solid #e6eaf8;background:#fff;outline:none;font-size:14px;
}
.input-panel textarea{resize:vertical}

/* actions */
.actions{display:flex;gap:10px;align-items:center}
.primary{background:var(--accent);color:#fff;padding:10px 16px;border-radius:10px;border:none;cursor:pointer;font-weight:600}
.primary:hover{background:#3a57d8}
.muted{background:transparent;border:1px solid rgba(0,0,0,0.06);padding:8px 12px;border-radius:8px;cursor:pointer}

/* Task list */
.task-list-wrap{padding:10px 0}
.task-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
.task{
  background:var(--card);
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding:12px;
  border-radius:10px;
  border:1px solid #eef2ff;
  box-shadow:0 6px 20px rgba(9,30,66,0.04);
}
.task .left{display:flex;align-items:center;gap:12px;flex:1}
.task .meta{display:flex;flex-direction:column;font-size:13px;color:var(--muted)}
.task .title{font-weight:600}
.task .small{font-size:12px;color:var(--muted)}
.task .right{display:flex;align-items:center;gap:8px}
.task input[type="checkbox"]{width:18px;height:18px}

/* state styles */
.task.completed{opacity:0.75}
.task.overdue{border:2px solid var(--danger)}
.tag{padding:6px 8px;border-radius:8px;font-size:12px;color:#fff}

/* calendar */
.calendar-controls{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px}
.month-nav{display:flex;align-items:center;gap:8px}
.month-title{font-weight:700;color:#fff;padding:8px 12px;border-radius:8px;background:linear-gradient(90deg,var(--accent),#6e56d6)}
.month-nav button{background:#fff;border:none;padding:8px;border-radius:8px;cursor:pointer}
.jump-controls{display:flex;gap:8px;align-items:center}
.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;background:transparent;border-radius:8px;padding:6px}
.calendar-cell{background:rgba(255,255,255,0.95);padding:12px;border-radius:8px;min-height:80px;position:relative;cursor:pointer;border:1px solid #f2f6ff}
.day-number{font-weight:700;margin-bottom:6px}
.day-tasks-bullet{position:absolute;bottom:8px;left:8px;display:flex;gap:6px}
.bullet{width:8px;height:8px;border-radius:50%}

/* day tasks panel */
.day-tasks{margin-top:12px;padding:12px;border-radius:10px;background:var(--card);box-shadow:var(--shadow)}
.day-tasks.hidden{display:none}
.day-tasks .small{font-size:13px;color:var(--muted)}

/* history controls */
.history-controls{display:flex;gap:8px;margin-bottom:10px}
.filter{padding:8px 12px;border-radius:8px;border:none;background:#f6f7ff;cursor:pointer}
.filter.active{background:var(--accent);color:#fff}

/* footer */
.main-footer{padding:12px 20px;background:#111827;color:#fff;display:flex;justify-content:space-between;align-items:center}
.main-footer .social a{color:#cbd5e1;margin-left:10px;text-decoration:none}

/* small screens */
@media (max-width:860px){
  .header-inner{flex-direction:column;align-items:flex-start}
  .nav ul{flex-wrap:wrap}
  .input-panel{flex-direction:column}
  .calendar-grid .calendar-cell{min-height:64px}
}
