const seedState = {
  activeRole: "employee",
  currentEmployeeId: "e1",
  selectedQuarter: "Q1",
  employees: [
    { id: "e1", name: "Aarav Mehta", title: "Area Sales Lead", department: "Sales", managerId: "m1" },
    { id: "e2", name: "Nisha Rao", title: "Ops Excellence Lead", department: "Operations", managerId: "m1" },
    { id: "e3", name: "Kabir Sethi", title: "Customer Success", department: "Service", managerId: "m2" }
  ],
  managers: [
    { id: "m1", name: "Priya Iyer", department: "Commercial" },
    { id: "m2", name: "Rohan Shah", department: "Service" }
  ],
  cycles: [
    { label: "Phase 1 - Goal Setting", opens: "1 May", action: "Goal Creation, Submission & Approval" },
    { label: "Q1 Check-in", opens: "July", action: "Progress Update - Planned vs. Actual" },
    { label: "Q2 Check-in", opens: "October", action: "Progress Update - Planned vs. Actual" },
    { label: "Q3 Check-in", opens: "January", action: "Progress Update - Planned vs. Actual" },
    { label: "Q4 / Annual", opens: "March / April", action: "Final Achievement Capture" }
  ],
  goals: [
    {
      id: "g1",
      employeeId: "e1",
      thrustArea: "Revenue Growth",
      title: "Drive premium fan revenue",
      description: "Grow premium BLDC fan revenue across top distributor clusters.",
      uom: "Min",
      target: 12500000,
      targetLabel: "INR 1.25 Cr",
      weightage: 25,
      status: "On Track",
      locked: true,
      submitted: true,
      approved: true,
      actuals: { Q1: 3200000, Q2: 0, Q3: 0, Q4: 0 }
    },
    {
      id: "g2",
      employeeId: "e1",
      thrustArea: "Channel Health",
      title: "Improve active dealer coverage",
      description: "Increase billed active dealers in priority districts.",
      uom: "Min",
      target: 180,
      targetLabel: "180 dealers",
      weightage: 20,
      status: "On Track",
      locked: true,
      submitted: true,
      approved: true,
      actuals: { Q1: 48, Q2: 0, Q3: 0, Q4: 0 }
    },
    {
      id: "g3",
      employeeId: "e1",
      thrustArea: "Customer Experience",
      title: "Reduce escalated installation TAT",
      description: "Bring escalated installation turnaround time below target.",
      uom: "Max",
      target: 48,
      targetLabel: "48 hours",
      weightage: 15,
      status: "On Track",
      locked: true,
      submitted: true,
      approved: true,
      actuals: { Q1: 54, Q2: 0, Q3: 0, Q4: 0 }
    },
    {
      id: "g4",
      employeeId: "e1",
      thrustArea: "Safety",
      title: "Zero field safety incidents",
      description: "Maintain zero reportable safety incidents in the field team.",
      uom: "Zero",
      target: 0,
      targetLabel: "0 incidents",
      weightage: 10,
      status: "Completed",
      locked: true,
      submitted: true,
      approved: true,
      actuals: { Q1: 0, Q2: 0, Q3: 0, Q4: 0 },
      sharedGroupId: "sg1",
      primaryOwner: true
    },
    {
      id: "g5",
      employeeId: "e1",
      thrustArea: "People",
      title: "Complete sales capability certification",
      description: "Complete certification for all assigned sales executives before deadline.",
      uom: "Timeline",
      target: "2026-08-31",
      targetLabel: "31 Aug 2026",
      weightage: 15,
      status: "Not Started",
      locked: true,
      submitted: true,
      approved: true,
      actuals: { Q1: "", Q2: "", Q3: "", Q4: "" }
    },
    {
      id: "g6",
      employeeId: "e1",
      thrustArea: "Process",
      title: "Improve forecast accuracy",
      description: "Raise monthly rolling forecast accuracy for key SKUs.",
      uom: "Min",
      target: 85,
      targetLabel: "85%",
      weightage: 15,
      status: "On Track",
      locked: true,
      submitted: true,
      approved: true,
      actuals: { Q1: 78, Q2: 0, Q3: 0, Q4: 0 }
    },
    {
      id: "g7",
      employeeId: "e2",
      thrustArea: "Productivity",
      title: "Reduce warehouse dispatch cost",
      description: "Lower per-unit dispatch cost for regional warehouse operations.",
      uom: "Max",
      target: 42,
      targetLabel: "INR 42/unit",
      weightage: 35,
      status: "On Track",
      locked: false,
      submitted: true,
      approved: false,
      actuals: { Q1: 45, Q2: 0, Q3: 0, Q4: 0 }
    },
    {
      id: "g8",
      employeeId: "e2",
      thrustArea: "Quality",
      title: "Cut repeat service defects",
      description: "Reduce repeat defects within 30 days of service closure.",
      uom: "Max",
      target: 2.5,
      targetLabel: "2.5%",
      weightage: 30,
      status: "Not Started",
      locked: false,
      submitted: true,
      approved: false,
      actuals: { Q1: 3.2, Q2: 0, Q3: 0, Q4: 0 }
    },
    {
      id: "g9",
      employeeId: "e2",
      thrustArea: "Safety",
      title: "Zero field safety incidents",
      description: "Maintain zero reportable safety incidents in the field team.",
      uom: "Zero",
      target: 0,
      targetLabel: "0 incidents",
      weightage: 35,
      status: "Completed",
      locked: false,
      submitted: true,
      approved: false,
      actuals: { Q1: 0, Q2: 0, Q3: 0, Q4: 0 },
      sharedGroupId: "sg1",
      primaryOwner: false
    }
  ],
  checkins: [
    { id: "c1", employeeId: "e1", managerId: "m1", quarter: "Q1", comment: "Good early revenue traction. Keep focus on installation TAT recovery.", completed: true, updatedAt: "2026-07-22 14:10" }
  ],
  auditLogs: [
    { id: "a1", actor: "Admin HR", when: "2026-05-12 09:30", detail: "Unlocked Aarav Mehta goal sheet for target correction after approval." },
    { id: "a2", actor: "Priya Iyer", when: "2026-05-12 10:15", detail: "Changed forecast accuracy target from 80% to 85% after calibration." }
  ],
  escalations: [
    { employeeId: "e3", issue: "Goal sheet not submitted within 5 days of cycle open", level: "Employee reminder", status: "Open" },
    { employeeId: "e2", issue: "Manager approval pending for 3 days", level: "Manager reminder", status: "In progress" }
  ]
};

let state = structuredClone(seedState);

const views = {
  dashboard: document.querySelector("#dashboardView"),
  goals: document.querySelector("#goalsView"),
  approvals: document.querySelector("#approvalsView"),
  checkins: document.querySelector("#checkinsView"),
  admin: document.querySelector("#adminView")
};

const pageTitle = document.querySelector("#pageTitle");
const alertHost = document.querySelector("#alertHost");
const authView = document.querySelector("#authView");
const userName = document.querySelector("#userName");
const userRole = document.querySelector("#userRole");
const logoutBtn = document.querySelector("#logoutBtn");

document.addEventListener("DOMContentLoaded", async () => {
  await refreshState();
  wireAuth();
  wireNavigation();
  wireGlobalActions();
  renderAll();
});

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({ error: "Request failed." }));
    throw new Error(payload.error || "Request failed.");
  }
  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("application/json") ? response.json() : response.text();
}

async function refreshState() {
  try {
    state = await api("/api/state");
  } catch {
    state = structuredClone(seedState);
    flash("Backend is not reachable. Run npm start and open http://localhost:3002.", "error");
  }
}

function setState(nextState) {
  state = nextState.state || nextState;
  renderAll();
}

async function runAction(action, successMessage) {
  try {
    const nextState = await action();
    setState(nextState);
    if (successMessage) flash(successMessage, "success");
  } catch (error) {
    flash(error.message, "error");
  }
}

function wireNavigation() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      Object.values(views).forEach((view) => view.classList.remove("active"));
      views[button.dataset.view].classList.add("active");
      pageTitle.textContent = button.textContent;
      renderAll();
    });
  });

}

function wireAuth() {
  document.querySelectorAll(".auth-tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".auth-tab").forEach((tab) => tab.classList.remove("active"));
      button.classList.add("active");
      document.querySelector("#loginForm").classList.toggle("hidden", button.dataset.authTab !== "login");
      document.querySelector("#signupForm").classList.toggle("hidden", button.dataset.authTab !== "signup");
    });
  });

  document.querySelector("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    runAction(() => api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: form.get("email"), password: form.get("password") })
    }), "Logged in successfully.");
  });

  document.querySelector("#signupForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    runAction(() => api("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
        role: form.get("role")
      })
    }), "Account created and logged in.");
  });

  logoutBtn.addEventListener("click", () => {
    runAction(() => api("/api/auth/logout", { method: "POST", body: "{}" }), "Logged out.");
  });
}

function wireGlobalActions() {
  document.querySelector("#seedBtn").addEventListener("click", () => {
    runAction(() => api("/api/reset", { method: "POST", body: "{}" }), "Demo data has been reset.");
  });

  document.querySelector("#exportBtn").addEventListener("click", exportCsv);
}

function renderAll() {
  renderAuthState();
  if (!currentUser()) return;
  renderDashboard();
  renderGoals();
  renderApprovals();
  renderCheckins();
  renderAdmin();
  applyRoleVisibility();
}

function applyRoleVisibility() {
  const role = state.activeRole;
  document.querySelector('[data-view="goals"]').classList.toggle("hidden", role !== "employee" && role !== "admin");
  document.querySelector('[data-view="approvals"]').classList.toggle("hidden", role === "employee");
  document.querySelector('[data-view="admin"]').classList.toggle("hidden", role !== "admin");
  if (role === "employee" && document.querySelector('[data-view="approvals"]').classList.contains("active")) {
    activateView("dashboard");
  }
  if (role === "manager" && document.querySelector('[data-view="goals"]').classList.contains("active")) {
    activateView("dashboard");
  }
  if (role !== "admin" && document.querySelector('[data-view="admin"]').classList.contains("active")) {
    activateView("dashboard");
  }
}

function renderAuthState() {
  const user = currentUser();
  document.body.classList.toggle("auth-open", !user);
  userName.textContent = user?.name || "Guest";
  userRole.textContent = user ? roleLabel(user.role) : "Not logged in";
}

function currentUser() {
  return state.users?.find((user) => user.id === state.currentUserId) || null;
}

function roleLabel(role) {
  return { employee: "Employee", manager: "Manager L1", admin: "Admin / HR" }[role] || role;
}

function activateView(name) {
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === name));
  Object.values(views).forEach((view) => view.classList.remove("active"));
  views[name].classList.add("active");
  pageTitle.textContent = document.querySelector(`[data-view="${name}"]`).textContent;
}

function renderDashboard() {
  const totalEmployees = state.employees.length;
  const submitted = new Set(state.goals.filter((goal) => goal.submitted).map((goal) => goal.employeeId)).size;
  const approved = new Set(state.goals.filter((goal) => goal.approved).map((goal) => goal.employeeId)).size;
  const qComplete = state.checkins.filter((item) => item.quarter === state.selectedQuarter && item.completed).length;

  views.dashboard.innerHTML = `
    <div class="stat-grid">
      ${statCard("Employees", totalEmployees, "Mapped to current org hierarchy")}
      ${statCard("Goal sheets submitted", `${submitted}/${totalEmployees}`, "Validation requires 100% total weightage")}
      ${statCard("Approved sheets", `${approved}/${totalEmployees}`, "Approved goals are locked")}
      ${statCard(`${state.selectedQuarter} check-ins`, `${qComplete}/${totalEmployees}`, "Manager comments captured")}
    </div>
    <div class="grid cols-2">
      <section class="panel">
        <h2>Completion Dashboard</h2>
        ${renderCompletionTable()}
      </section>
      <section class="panel">
        <h2>Cycle Windows</h2>
        <div class="timeline">
          ${state.cycles.map((cycle) => `
            <div class="timeline-item">
              <div class="timeline-date">${cycle.opens}</div>
              <div><strong>${cycle.label}</strong><p class="muted">${cycle.action}</p></div>
            </div>
          `).join("")}
        </div>
      </section>
    </div>
    <section class="panel">
      <h2>Analytics Snapshot</h2>
      <div class="grid cols-3">
        ${analyticsCard("QoQ trend", "Q1 average progress is " + averageProgress("Q1") + "% across approved goals.")}
        ${analyticsCard("Goal distribution", distribution("thrustArea"))}
        ${analyticsCard("Manager effectiveness", managerEffectiveness())}
      </div>
    </section>
  `;
}

function statCard(label, value, hint) {
  return `<div class="stat"><span class="muted">${label}</span><strong>${value}</strong><p class="small muted">${hint}</p></div>`;
}

function analyticsCard(title, copy) {
  return `<div class="panel tight"><h3>${title}</h3><p class="muted">${copy}</p></div>`;
}

function renderCompletionTable() {
  const rows = state.employees.map((employee) => {
    const goals = state.goals.filter((goal) => goal.employeeId === employee.id);
    const checkin = state.checkins.find((item) => item.employeeId === employee.id && item.quarter === state.selectedQuarter);
    const totalWeight = goals.reduce((sum, goal) => sum + Number(goal.weightage), 0);
    return `<tr>
      <td><strong>${employee.name}</strong><br><span class="muted">${employee.department}</span></td>
      <td>${goals.some((goal) => goal.submitted) ? "Submitted" : "Draft"}</td>
      <td>${goals.every((goal) => goal.approved) && goals.length ? "Approved" : "Pending"}</td>
      <td>${totalWeight}%</td>
      <td>${checkin?.completed ? "Completed" : "Pending"}</td>
    </tr>`;
  }).join("");
  return `<div class="table-wrap"><table><thead><tr><th>Employee</th><th>Goals</th><th>Approval</th><th>Weightage</th><th>${state.selectedQuarter}</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderGoals() {
  const employee = employeeById(state.currentEmployeeId);
  const goals = state.goals.filter((goal) => goal.employeeId === employee.id);
  const totalWeight = goals.reduce((sum, goal) => sum + Number(goal.weightage), 0);
  const locked = goals.some((goal) => goal.locked);
  const canEdit = state.activeRole !== "employee" || !locked;

  views.goals.innerHTML = `
    <div class="grid cols-2">
      <section class="panel">
        <div class="progress-head">
          <div>
            <h2>${employee.name}'s Goal Sheet</h2>
            <p class="muted">${employee.title} · ${employee.department}</p>
          </div>
          <span class="tag ${locked ? "locked" : ""}">${locked ? "Locked" : "Editable"}</span>
        </div>
        <div class="goal-list">${goals.map(renderGoalCard).join("")}</div>
        <div class="button-row">
          <button class="primary" id="submitGoalsBtn">Submit for approval</button>
          <span class="muted">Total weightage: <strong>${totalWeight}%</strong></span>
        </div>
      </section>
      <section class="panel">
        <h2>Create Goal</h2>
        <form id="goalForm" class="form-grid">
          ${goalFormFields(canEdit)}
          <button class="primary wide" ${canEdit ? "" : "disabled"}>Add goal</button>
        </form>
      </section>
    </div>
  `;

  document.querySelector("#goalForm").addEventListener("submit", addGoal);
  document.querySelector("#submitGoalsBtn").addEventListener("click", submitGoals);
  views.goals.querySelectorAll("[data-delete-goal]").forEach((button) => {
    button.addEventListener("click", () => deleteGoal(button.dataset.deleteGoal));
  });
}

function goalFormFields(enabled) {
  const disabled = enabled ? "" : "disabled";
  return `
    <label class="field"><span>Thrust Area</span><input name="thrustArea" required ${disabled} placeholder="Revenue Growth" /></label>
    <label class="field"><span>Goal Title</span><input name="title" required ${disabled} placeholder="Improve dealer coverage" /></label>
    <label class="field wide"><span>Description</span><textarea name="description" required ${disabled}></textarea></label>
    <label class="field"><span>UoM</span><select name="uom" ${disabled}><option value="Min">Numeric / % - higher is better</option><option value="Max">Numeric / % - lower is better</option><option value="Timeline">Timeline</option><option value="Zero">Zero-based</option></select></label>
    <label class="field"><span>Target</span><input name="target" required ${disabled} placeholder="100 or 2026-08-31" /></label>
    <label class="field"><span>Target Label</span><input name="targetLabel" required ${disabled} placeholder="100%" /></label>
    <label class="field"><span>Weightage %</span><input name="weightage" type="number" min="10" max="100" required ${disabled} /></label>
  `;
}

function renderGoalCard(goal) {
  const percent = progressScore(goal, state.selectedQuarter);
  const statusClass = goal.status.toLowerCase().replaceAll(" ", "-");
  return `
    <article class="goal-row">
      <div class="goal-main">
        <div class="row-head">
          <span class="tag thrust">${goal.thrustArea}</span>
          <span class="tag uom">${goal.uom}</span>
          <span class="tag status-${statusClass}">${goal.status}</span>
          ${goal.sharedGroupId ? '<span class="tag shared">Shared</span>' : ""}
        </div>
        <h3>${goal.title}</h3>
        <p>${goal.description}</p>
      </div>
      <div class="goal-meta">
        <div class="meta-line"><span>Target</span><strong>${goal.targetLabel}</strong></div>
        <div class="meta-line"><span>Weightage</span><strong>${goal.weightage}%</strong></div>
        <div class="meta-line"><span>${state.selectedQuarter} actual</span><strong>${formatActual(goal.actuals[state.selectedQuarter])}</strong></div>
        <div class="progress-head"><span>Progress score</span><strong>${percent}%</strong></div>
        <div class="progress-bar"><span style="width:${Math.min(percent, 100)}%"></span></div>
        ${goal.locked ? "" : `<button class="danger" data-delete-goal="${goal.id}">Remove</button>`}
      </div>
    </article>
  `;
}

function addGoal(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  runAction(() => api("/api/goals", {
    method: "POST",
    body: JSON.stringify({
    employeeId: state.currentEmployeeId,
    thrustArea: form.get("thrustArea").trim(),
    title: form.get("title").trim(),
    description: form.get("description").trim(),
    uom: form.get("uom"),
      target: form.get("target"),
    targetLabel: form.get("targetLabel").trim(),
      weightage: Number(form.get("weightage"))
    })
  }), "Goal added to draft sheet.");
}

function submitGoals() {
  runAction(() => api("/api/goals/submit", {
    method: "POST",
    body: JSON.stringify({ employeeId: state.currentEmployeeId })
  }), "Goal sheet submitted to Manager L1.");
}

function deleteGoal(goalId) {
  runAction(() => api(`/api/goals/${encodeURIComponent(goalId)}`, { method: "DELETE" }), "Draft goal removed.");
}

function renderApprovals() {
  const pending = state.goals.filter((goal) => goal.submitted && !goal.approved);
  views.approvals.innerHTML = `
    <section class="panel">
      <h2>Manager Approval Workflow</h2>
      <p class="muted">Edit targets or weightage inline, approve and lock, or return a sheet for rework.</p>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Employee</th><th>Goal</th><th>Target</th><th>Weightage</th><th>Action</th></tr></thead>
          <tbody>${pending.map(renderApprovalRow).join("") || `<tr><td colspan="5">No pending approvals.</td></tr>`}</tbody>
        </table>
      </div>
    </section>
    <section class="panel">
      <h2>Shared Departmental KPI</h2>
      <form id="sharedGoalForm" class="form-grid">
        <label class="field"><span>Title</span><input name="title" required value="Zero field safety incidents" /></label>
        <label class="field"><span>Thrust Area</span><input name="thrustArea" required value="Safety" /></label>
        <label class="field wide"><span>Description</span><textarea name="description" required>Maintain zero reportable safety incidents in the field team.</textarea></label>
        <label class="field"><span>UoM</span><select name="uom"><option value="Zero">Zero-based</option><option value="Min">Numeric / % - higher is better</option><option value="Max">Numeric / % - lower is better</option></select></label>
        <label class="field"><span>Target</span><input name="target" required value="0" /></label>
        <label class="field"><span>Target Label</span><input name="targetLabel" required value="0 incidents" /></label>
        <label class="field"><span>Default Weightage</span><input name="weightage" type="number" min="10" value="10" required /></label>
        <button class="secondary wide">Push to all employees</button>
      </form>
    </section>
  `;

  views.approvals.querySelectorAll("[data-approve]").forEach((button) => {
    button.addEventListener("click", () => approveEmployee(button.dataset.approve));
  });
  views.approvals.querySelectorAll("[data-return]").forEach((button) => {
    button.addEventListener("click", () => returnForRework(button.dataset.return));
  });
  views.approvals.querySelectorAll("[data-field]").forEach((input) => {
    input.addEventListener("change", updateApprovalField);
  });
  document.querySelector("#sharedGoalForm").addEventListener("submit", pushSharedGoal);
}

function renderApprovalRow(goal) {
  const employee = employeeById(goal.employeeId);
  return `<tr>
    <td><strong>${employee.name}</strong><br><span class="muted">${employee.department}</span></td>
    <td>${goal.title}${goal.sharedGroupId ? '<br><span class="tag shared">Shared title and target read-only to recipients</span>' : ""}</td>
    <td><input data-field="target" data-goal="${goal.id}" value="${goal.target}" ${goal.sharedGroupId && !goal.primaryOwner ? "disabled" : ""}></td>
    <td><input data-field="weightage" data-goal="${goal.id}" type="number" min="10" value="${goal.weightage}"></td>
    <td><div class="button-row"><button class="primary" data-approve="${goal.employeeId}">Approve sheet</button><button class="ghost" data-return="${goal.employeeId}">Return</button></div></td>
  </tr>`;
}

function updateApprovalField(event) {
  runAction(() => api("/api/goals/approval-field", {
    method: "PATCH",
    body: JSON.stringify({
      goalId: event.target.dataset.goal,
      field: event.target.dataset.field,
      value: event.target.value
    })
  }));
}

function approveEmployee(employeeId) {
  runAction(() => api("/api/goals/approve", {
    method: "POST",
    body: JSON.stringify({ employeeId })
  }), "Goal sheet approved and locked.");
}

function returnForRework(employeeId) {
  runAction(() => api("/api/goals/return", {
    method: "POST",
    body: JSON.stringify({ employeeId })
  }), "Goal sheet returned for rework.");
}

function pushSharedGoal(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  runAction(() => api("/api/goals/shared", {
    method: "POST",
    body: JSON.stringify({
      thrustArea: form.get("thrustArea"),
      title: form.get("title"),
      description: form.get("description"),
      uom: form.get("uom"),
      target: form.get("target"),
      targetLabel: form.get("targetLabel"),
      weightage: Number(form.get("weightage"))
    })
  }), "Shared KPI pushed to all employees. Recipients can adjust weightage only.");
}

function renderCheckins() {
  const rows = state.employees.map((employee) => {
    const goals = state.goals.filter((goal) => goal.employeeId === employee.id);
    const checkin = state.checkins.find((item) => item.employeeId === employee.id && item.quarter === state.selectedQuarter);
    return `<tr>
      <td><strong>${employee.name}</strong><br><span class="muted">${employee.title}</span></td>
      <td>${goals.map((goal) => `${goal.title}: ${goal.targetLabel} vs ${formatActual(goal.actuals[state.selectedQuarter])}`).join("<br>")}</td>
      <td>${goals.map((goal) => `${goal.title}: ${progressScore(goal, state.selectedQuarter)}%`).join("<br>")}</td>
      <td><textarea data-comment="${employee.id}" placeholder="Structured check-in comment">${checkin?.comment || ""}</textarea></td>
      <td><button class="primary" data-save-checkin="${employee.id}">Complete</button></td>
    </tr>`;
  }).join("");

  views.checkins.innerHTML = `
    <div class="filters panel tight">
      <label class="field"><span>Quarter</span><select id="quarterSelect"><option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option></select></label>
      <span class="muted">Employees update actual achievement and status in the active quarterly window.</span>
    </div>
    <section class="panel">
      <h2>Employee Achievement Update</h2>
      <div class="goal-list">${state.goals.filter((goal) => goal.employeeId === state.currentEmployeeId).map(renderAchievementEditor).join("")}</div>
    </section>
    <section class="panel">
      <h2>Manager Check-in Module</h2>
      <div class="table-wrap"><table><thead><tr><th>Employee</th><th>Planned vs Actual</th><th>Computed Progress</th><th>Check-in Comment</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div>
    </section>
  `;

  document.querySelector("#quarterSelect").value = state.selectedQuarter;
  document.querySelector("#quarterSelect").addEventListener("change", (event) => {
    runAction(() => api("/api/session", {
      method: "POST",
      body: JSON.stringify({ selectedQuarter: event.target.value })
    }));
  });
  views.checkins.querySelectorAll("[data-actual]").forEach((input) => input.addEventListener("change", updateActual));
  views.checkins.querySelectorAll("[data-status]").forEach((select) => select.addEventListener("change", updateStatus));
  views.checkins.querySelectorAll("[data-save-checkin]").forEach((button) => {
    button.addEventListener("click", () => saveCheckin(button.dataset.saveCheckin));
  });
}

function renderAchievementEditor(goal) {
  const actual = goal.actuals[state.selectedQuarter] ?? "";
  const readonly = goal.sharedGroupId && !goal.primaryOwner ? "disabled" : "";
  return `<article class="goal-row">
    <div class="goal-main">
      <div class="row-head"><span class="tag">${goal.thrustArea}</span>${goal.sharedGroupId ? '<span class="tag shared">Shared achievement sync</span>' : ""}</div>
      <h3>${goal.title}</h3>
      <p>Planned target: <strong>${goal.targetLabel}</strong></p>
    </div>
    <div class="goal-meta">
      <label class="field"><span>Actual Achievement</span><input data-actual="${goal.id}" value="${actual}" ${readonly}></label>
      <label class="field"><span>Status</span><select data-status="${goal.id}">${statusOptions(goal.status)}</select></label>
      <div class="progress-head"><span>Tracking score</span><strong>${progressScore(goal, state.selectedQuarter)}%</strong></div>
      <div class="progress-bar"><span style="width:${Math.min(progressScore(goal, state.selectedQuarter), 100)}%"></span></div>
    </div>
  </article>`;
}

function updateActual(event) {
  runAction(() => api("/api/goals/actual", {
    method: "PATCH",
    body: JSON.stringify({
      goalId: event.target.dataset.actual,
      quarter: state.selectedQuarter,
      value: event.target.value
    })
  }));
}

function updateStatus(event) {
  runAction(() => api("/api/goals/status", {
    method: "PATCH",
    body: JSON.stringify({
      goalId: event.target.dataset.status,
      status: event.target.value
    })
  }));
}

function saveCheckin(employeeId) {
  const textarea = views.checkins.querySelector(`[data-comment="${employeeId}"]`);
  runAction(() => api("/api/checkins", {
    method: "POST",
    body: JSON.stringify({
      employeeId,
      quarter: state.selectedQuarter,
      comment: textarea.value
    })
  }), "Check-in comment saved and marked complete.");
}

function renderAdmin() {
  views.admin.innerHTML = `
    <div class="grid cols-2">
      <section class="panel">
        <h2>Admin / HR Controls</h2>
        <div class="button-row">
          <button class="secondary" id="unlockBtn">Unlock Aarav's sheet</button>
          <button class="ghost" id="entraBtn">Simulate Entra ID sync</button>
          <button class="ghost" id="notifyBtn">Send reminder batch</button>
        </div>
        <p class="muted">Exception handling and hierarchy sync are logged for audit readiness.</p>
      </section>
      <section class="panel">
        <h2>Escalation Module</h2>
        <div class="audit-list">${state.escalations.map((item) => `<div class="audit-item"><strong>${employeeById(item.employeeId).name}</strong><p>${item.issue}</p><span class="tag">${item.level}</span> <span class="tag">${item.status}</span></div>`).join("")}</div>
      </section>
    </div>
    <section class="panel">
      <h2>Audit Trail</h2>
      <div class="audit-list">${state.auditLogs.map((log) => `<div class="audit-item"><strong>${log.actor}</strong> <span class="muted">${log.when}</span><p>${log.detail}</p></div>`).join("")}</div>
    </section>
    <section class="panel">
      <h2>Achievement Report Preview</h2>
      ${achievementReportTable()}
    </section>
  `;

  document.querySelector("#unlockBtn")?.addEventListener("click", () => {
    runAction(() => api("/api/admin/unlock", {
      method: "POST",
      body: JSON.stringify({ employeeId: "e1" })
    }), "Goal sheet unlocked by Admin / HR.");
  });
  document.querySelector("#entraBtn")?.addEventListener("click", () => {
    runAction(() => api("/api/admin/simulate", {
      method: "POST",
      body: JSON.stringify({ action: "entra" })
    }), "Microsoft Entra ID sync simulated: hierarchy and role mapping refreshed.");
  });
  document.querySelector("#notifyBtn")?.addEventListener("click", () => {
    runAction(() => api("/api/admin/simulate", {
      method: "POST",
      body: JSON.stringify({ action: "notify" })
    }), "Email and Teams reminders queued for pending submissions and check-ins.");
  });
}

function achievementReportTable() {
  const rows = state.goals.map((goal) => {
    const employee = employeeById(goal.employeeId);
    return `<tr><td>${employee.name}</td><td>${employee.department}</td><td>${goal.title}</td><td>${goal.targetLabel}</td><td>${formatActual(goal.actuals[state.selectedQuarter])}</td><td>${goal.weightage}%</td><td>${progressScore(goal, state.selectedQuarter)}%</td></tr>`;
  }).join("");
  return `<div class="table-wrap"><table><thead><tr><th>Employee</th><th>Department</th><th>Goal</th><th>Planned Target</th><th>Actual Achievement</th><th>Weightage</th><th>Score</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function progressScore(goal, quarter) {
  const actual = goal.actuals[quarter];
  if (goal.uom === "Zero") return Number(actual) === 0 ? 100 : 0;
  if (goal.uom === "Timeline") {
    if (!actual) return 0;
    const completion = new Date(actual).getTime();
    const deadline = new Date(goal.target).getTime();
    return completion <= deadline ? 100 : 0;
  }
  if (!Number(actual) || !Number(goal.target)) return 0;
  const raw = goal.uom === "Max" ? Number(goal.target) / Number(actual) : Number(actual) / Number(goal.target);
  return Math.max(0, Math.round(raw * 100));
}

function averageProgress(quarter) {
  const approved = state.goals.filter((goal) => goal.approved);
  if (!approved.length) return 0;
  return Math.round(approved.reduce((sum, goal) => sum + progressScore(goal, quarter), 0) / approved.length);
}

function distribution(field) {
  const counts = state.goals.reduce((acc, goal) => {
    acc[goal[field]] = (acc[goal[field]] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).map(([key, value]) => `${key}: ${value}`).join(", ");
}

function managerEffectiveness() {
  return state.managers.map((manager) => {
    const team = state.employees.filter((employee) => employee.managerId === manager.id);
    const done = team.filter((employee) => state.checkins.some((item) => item.employeeId === employee.id && item.quarter === state.selectedQuarter && item.completed)).length;
    return `${manager.name}: ${done}/${team.length}`;
  }).join(", ");
}

function employeeById(id) {
  return state.employees.find((employee) => employee.id === id);
}

function normalizeTarget(value, uom) {
  return uom === "Timeline" ? value : Number(value);
}

function newId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function statusOptions(currentStatus) {
  return ["Not Started", "On Track", "Completed"].map((status) => {
    return `<option ${status === currentStatus ? "selected" : ""}>${status}</option>`;
  }).join("");
}

function formatActual(value) {
  return value === "" || value === undefined ? "Not updated" : value;
}

function nowStamp() {
  return new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function flash(message, type = "success") {
  const host = document.body.classList.contains("auth-open") ? authView.querySelector(".auth-panel") : alertHost;
  const alert = document.createElement("div");
  alert.className = `alert ${type}`;
  alert.textContent = message;
  if (host === alertHost) {
    host.innerHTML = "";
    host.appendChild(alert);
  } else {
    host.querySelector(".alert")?.remove();
    host.appendChild(alert);
  }
  window.setTimeout(() => {
    alert.remove();
  }, 3200);
}

function exportCsv() {
  window.location.href = `/api/reports/achievement.csv?quarter=${encodeURIComponent(state.selectedQuarter)}`;
}
