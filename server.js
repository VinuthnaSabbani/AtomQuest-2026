const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DB_PATH = path.join(DATA_DIR, "db.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon"
};

function initialState() {
  return {
    activeRole: "employee",
    currentUserId: null,
    currentEmployeeId: "e1",
    selectedQuarter: "Q1",
    users: [
      { id: "u-emp", name: "Aarav Mehta", email: "employee@demo.com", password: "demo123", role: "employee", employeeId: "e1" },
      { id: "u-mgr", name: "Priya Iyer", email: "manager@demo.com", password: "demo123", role: "manager", managerId: "m1" },
      { id: "u-admin", name: "Admin HR", email: "admin@demo.com", password: "demo123", role: "admin" }
    ],
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
      goal("g1", "e1", "Revenue Growth", "Drive premium fan revenue", "Grow premium BLDC fan revenue across top distributor clusters.", "Min", 12500000, "INR 1.25 Cr", 25, "On Track", true, true, true, { Q1: 3200000, Q2: 0, Q3: 0, Q4: 0 }),
      goal("g2", "e1", "Channel Health", "Improve active dealer coverage", "Increase billed active dealers in priority districts.", "Min", 180, "180 dealers", 20, "On Track", true, true, true, { Q1: 48, Q2: 0, Q3: 0, Q4: 0 }),
      goal("g3", "e1", "Customer Experience", "Reduce escalated installation TAT", "Bring escalated installation turnaround time below target.", "Max", 48, "48 hours", 15, "On Track", true, true, true, { Q1: 54, Q2: 0, Q3: 0, Q4: 0 }),
      { ...goal("g4", "e1", "Safety", "Zero field safety incidents", "Maintain zero reportable safety incidents in the field team.", "Zero", 0, "0 incidents", 10, "Completed", true, true, true, { Q1: 0, Q2: 0, Q3: 0, Q4: 0 }), sharedGroupId: "sg1", primaryOwner: true },
      goal("g5", "e1", "People", "Complete sales capability certification", "Complete certification for all assigned sales executives before deadline.", "Timeline", "2026-08-31", "31 Aug 2026", 15, "Not Started", true, true, true, { Q1: "", Q2: "", Q3: "", Q4: "" }),
      goal("g6", "e1", "Process", "Improve forecast accuracy", "Raise monthly rolling forecast accuracy for key SKUs.", "Min", 85, "85%", 15, "On Track", true, true, true, { Q1: 78, Q2: 0, Q3: 0, Q4: 0 }),
      goal("g7", "e2", "Productivity", "Reduce warehouse dispatch cost", "Lower per-unit dispatch cost for regional warehouse operations.", "Max", 42, "INR 42/unit", 35, "On Track", false, true, false, { Q1: 45, Q2: 0, Q3: 0, Q4: 0 }),
      goal("g8", "e2", "Quality", "Cut repeat service defects", "Reduce repeat defects within 30 days of service closure.", "Max", 2.5, "2.5%", 30, "Not Started", false, true, false, { Q1: 3.2, Q2: 0, Q3: 0, Q4: 0 }),
      { ...goal("g9", "e2", "Safety", "Zero field safety incidents", "Maintain zero reportable safety incidents in the field team.", "Zero", 0, "0 incidents", 35, "Completed", false, true, false, { Q1: 0, Q2: 0, Q3: 0, Q4: 0 }), sharedGroupId: "sg1", primaryOwner: false }
    ],
    checkins: [
      { id: "c1", employeeId: "e1", managerId: "m1", quarter: "Q1", comment: "Good early revenue traction. Keep focus on installation TAT recovery.", completed: true, updatedAt: "22 Jul 2026, 2:10 pm" }
    ],
    auditLogs: [
      { id: "a1", actor: "Admin HR", when: "12 May 2026, 9:30 am", detail: "Unlocked Aarav Mehta goal sheet for target correction after approval." },
      { id: "a2", actor: "Priya Iyer", when: "12 May 2026, 10:15 am", detail: "Changed forecast accuracy target from 80% to 85% after calibration." }
    ],
    escalations: [
      { employeeId: "e3", issue: "Goal sheet not submitted within 5 days of cycle open", level: "Employee reminder", status: "Open" },
      { employeeId: "e2", issue: "Manager approval pending for 3 days", level: "Manager reminder", status: "In progress" }
    ]
  };
}

function goal(id, employeeId, thrustArea, title, description, uom, target, targetLabel, weightage, status, locked, submitted, approved, actuals) {
  return { id, employeeId, thrustArea, title, description, uom, target, targetLabel, weightage, status, locked, submitted, approved, actuals };
}

function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(DB_PATH)) writeDb(initialState());
}

function readDb() {
  ensureDb();
  const state = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  return migrateState(state);
}

function writeDb(state) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  fs.writeFileSync(DB_PATH, JSON.stringify(state, null, 2));
}

function migrateState(state) {
  const fresh = initialState();
  let changed = false;
  if (!Array.isArray(state.users)) {
    state.users = fresh.users;
    state.currentUserId = null;
    changed = true;
  }
  if (!("currentUserId" in state)) {
    state.currentUserId = null;
    changed = true;
  }
  if (changed) writeDb(state);
  return state;
}

function newId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nowStamp() {
  return new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

function normalizeTarget(value, uom) {
  return uom === "Timeline" ? String(value) : Number(value);
}

function sanitizeGoalPayload(payload) {
  const required = ["employeeId", "thrustArea", "title", "description", "uom", "target", "targetLabel", "weightage"];
  for (const field of required) {
    if (payload[field] === undefined || payload[field] === "") throw httpError(400, `${field} is required.`);
  }
  if (!["Min", "Max", "Timeline", "Zero"].includes(payload.uom)) throw httpError(400, "Invalid UoM.");
  const weightage = Number(payload.weightage);
  if (!Number.isFinite(weightage) || weightage < 10) throw httpError(400, "Minimum weightage per goal is 10%.");
  return {
    employeeId: String(payload.employeeId),
    thrustArea: String(payload.thrustArea).trim(),
    title: String(payload.title).trim(),
    description: String(payload.description).trim(),
    uom: payload.uom,
    target: normalizeTarget(payload.target, payload.uom),
    targetLabel: String(payload.targetLabel).trim(),
    weightage
  };
}

function validateSheetForSubmit(goals) {
  if (!goals.length) throw httpError(400, "Add at least one goal before submission.");
  if (goals.length > 8) throw httpError(400, "Maximum 8 goals are allowed per employee.");
  if (goals.some((item) => Number(item.weightage) < 10)) throw httpError(400, "Each goal must have at least 10% weightage.");
  const totalWeight = goals.reduce((sum, item) => sum + Number(item.weightage), 0);
  if (totalWeight !== 100) throw httpError(400, "Total weightage must equal exactly 100%.");
}

function progressScore(goalItem, quarter) {
  const actual = goalItem.actuals[quarter];
  if (goalItem.uom === "Zero") return Number(actual) === 0 ? 100 : 0;
  if (goalItem.uom === "Timeline") {
    if (!actual) return 0;
    return new Date(actual).getTime() <= new Date(goalItem.target).getTime() ? 100 : 0;
  }
  if (!Number(actual) || !Number(goalItem.target)) return 0;
  const raw = goalItem.uom === "Max" ? Number(goalItem.target) / Number(actual) : Number(actual) / Number(goalItem.target);
  return Math.max(0, Math.round(raw * 100));
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

async function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(httpError(413, "Request body is too large."));
      }
    });
    request.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(httpError(400, "Invalid JSON payload."));
      }
    });
    request.on("error", reject);
  });
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function sendCsv(response, filename, csv) {
  response.writeHead(200, {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": `attachment; filename="${filename}"`
  });
  response.end(csv);
}

function serveStatic(request, response, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(ROOT, safePath));
  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    response.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    response.end(content);
  });
}

async function handleApi(request, response, pathname) {
  const state = readDb();
  const body = request.method === "GET" ? {} : await readBody(request);

  if (request.method === "GET" && pathname === "/api/state") return sendJson(response, 200, state);

  if (request.method === "POST" && pathname === "/api/auth/login") {
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const user = state.users.find((item) => item.email.toLowerCase() === email && item.password === password);
    if (!user) throw httpError(401, "Invalid email or password.");
    applyUserSession(state, user);
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "POST" && pathname === "/api/auth/signup") {
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const role = String(body.role || "");
    if (!name || !email || !password || !["employee", "manager", "admin"].includes(role)) throw httpError(400, "Name, email, password, and role are required.");
    if (state.users.some((item) => item.email.toLowerCase() === email)) throw httpError(409, "An account with this email already exists.");

    const user = { id: newId("user"), name, email, password, role };
    if (role === "employee") {
      const employee = { id: newId("emp"), name, title: "New Employee", department: "Unassigned", managerId: "m1" };
      state.employees.push(employee);
      user.employeeId = employee.id;
    }
    if (role === "manager") {
      const manager = { id: newId("mgr"), name, department: "Unassigned" };
      state.managers.push(manager);
      user.managerId = manager.id;
    }
    state.users.push(user);
    applyUserSession(state, user);
    state.auditLogs.unshift({ id: newId("audit"), actor: "System", when: nowStamp(), detail: `${name} signed up as ${role}.` });
    writeDb(state);
    return sendJson(response, 201, state);
  }

  if (request.method === "POST" && pathname === "/api/auth/logout") {
    state.currentUserId = null;
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "POST" && pathname === "/api/session") {
    const user = currentUser(state);
    if (body.activeRole && user?.role === "admin") state.activeRole = body.activeRole;
    if (body.selectedQuarter) state.selectedQuarter = body.selectedQuarter;
    if (body.currentEmployeeId && (user?.role === "manager" || user?.role === "admin")) state.currentEmployeeId = body.currentEmployeeId;
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "POST" && pathname === "/api/reset") {
    const fresh = initialState();
    writeDb(fresh);
    return sendJson(response, 200, fresh);
  }

  if (request.method === "POST" && pathname === "/api/goals") {
    const payload = sanitizeGoalPayload(body);
    const employeeGoals = state.goals.filter((item) => item.employeeId === payload.employeeId);
    if (employeeGoals.some((item) => item.locked)) throw httpError(423, "Approved goals are locked. Ask Admin / HR to unlock the sheet.");
    if (employeeGoals.length >= 8) throw httpError(400, "Maximum 8 goals are allowed per employee.");
    state.goals.push({
      id: newId("goal"),
      ...payload,
      status: "Not Started",
      locked: false,
      submitted: false,
      approved: false,
      actuals: { Q1: 0, Q2: 0, Q3: 0, Q4: 0 }
    });
    writeDb(state);
    return sendJson(response, 201, state);
  }

  if (request.method === "DELETE" && pathname.startsWith("/api/goals/")) {
    const goalId = decodeURIComponent(pathname.split("/").pop());
    const goalItem = state.goals.find((item) => item.id === goalId);
    if (!goalItem) throw httpError(404, "Goal not found.");
    if (goalItem.locked) throw httpError(423, "Locked goals cannot be deleted without Admin / HR intervention.");
    state.goals = state.goals.filter((item) => item.id !== goalId);
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "POST" && pathname === "/api/goals/submit") {
    const employeeId = String(body.employeeId || "");
    const employeeGoals = state.goals.filter((item) => item.employeeId === employeeId);
    if (employeeGoals.some((item) => item.locked)) throw httpError(423, "Approved goals are locked. Ask Admin / HR to unlock the sheet.");
    validateSheetForSubmit(employeeGoals);
    employeeGoals.forEach((item) => {
      item.submitted = true;
      item.approved = false;
    });
    state.auditLogs.unshift({ id: newId("audit"), actor: "Employee", when: nowStamp(), detail: `${employeeName(state, employeeId)} submitted a goal sheet for approval.` });
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "PATCH" && pathname === "/api/goals/approval-field") {
    const goalItem = state.goals.find((item) => item.id === body.goalId);
    if (!goalItem) throw httpError(404, "Goal not found.");
    if (!["target", "weightage"].includes(body.field)) throw httpError(400, "Only target and weightage can be edited in approval.");
    if (goalItem.sharedGroupId && !goalItem.primaryOwner && body.field === "target") throw httpError(403, "Shared goal recipients cannot edit title or target.");
    const oldValue = body.field === "target" ? goalItem.targetLabel : goalItem.weightage;
    if (body.field === "weightage") {
      const weightage = Number(body.value);
      if (!Number.isFinite(weightage) || weightage < 10) throw httpError(400, "Minimum weightage per goal is 10%.");
      goalItem.weightage = weightage;
    } else {
      goalItem.target = normalizeTarget(body.value, goalItem.uom);
      goalItem.targetLabel = String(body.value);
    }
    state.auditLogs.unshift({ id: newId("audit"), actor: "Manager L1", when: nowStamp(), detail: `Changed ${goalItem.title} ${body.field} from ${oldValue} to ${body.value}.` });
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "POST" && pathname === "/api/goals/approve") {
    const employeeId = String(body.employeeId || "");
    const employeeGoals = state.goals.filter((item) => item.employeeId === employeeId);
    validateSheetForSubmit(employeeGoals);
    employeeGoals.forEach((item) => {
      item.approved = true;
      item.locked = true;
      item.submitted = true;
    });
    state.auditLogs.unshift({ id: newId("audit"), actor: "Manager L1", when: nowStamp(), detail: `Approved and locked ${employeeName(state, employeeId)}'s goal sheet.` });
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "POST" && pathname === "/api/goals/return") {
    const employeeId = String(body.employeeId || "");
    state.goals.filter((item) => item.employeeId === employeeId).forEach((item) => {
      item.submitted = false;
      item.approved = false;
      item.locked = false;
    });
    state.auditLogs.unshift({ id: newId("audit"), actor: "Manager L1", when: nowStamp(), detail: `Returned ${employeeName(state, employeeId)}'s goal sheet for rework.` });
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "POST" && pathname === "/api/goals/shared") {
    const payload = sanitizeGoalPayload({ ...body, employeeId: "shared" });
    const groupId = newId("shared");
    state.employees.forEach((employee, index) => {
      state.goals.push({
        id: newId("goal"),
        ...payload,
        employeeId: employee.id,
        status: "Not Started",
        locked: false,
        submitted: false,
        approved: false,
        actuals: { Q1: 0, Q2: 0, Q3: 0, Q4: 0 },
        sharedGroupId: groupId,
        primaryOwner: index === 0
      });
    });
    state.auditLogs.unshift({ id: newId("audit"), actor: "Manager L1", when: nowStamp(), detail: `Pushed shared KPI "${payload.title}" to all employees.` });
    writeDb(state);
    return sendJson(response, 201, state);
  }

  if (request.method === "PATCH" && pathname === "/api/goals/actual") {
    const goalItem = state.goals.find((item) => item.id === body.goalId);
    if (!goalItem) throw httpError(404, "Goal not found.");
    const quarter = String(body.quarter || state.selectedQuarter);
    if (!["Q1", "Q2", "Q3", "Q4"].includes(quarter)) throw httpError(400, "Invalid quarter.");
    const value = goalItem.uom === "Timeline" ? String(body.value || "") : Number(body.value);
    goalItem.actuals[quarter] = value;
    if (goalItem.sharedGroupId && goalItem.primaryOwner) {
      state.goals.filter((item) => item.sharedGroupId === goalItem.sharedGroupId && item.id !== goalItem.id).forEach((linked) => {
        linked.actuals[quarter] = value;
        linked.status = goalItem.status;
      });
    }
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "PATCH" && pathname === "/api/goals/status") {
    const goalItem = state.goals.find((item) => item.id === body.goalId);
    if (!goalItem) throw httpError(404, "Goal not found.");
    if (!["Not Started", "On Track", "Completed"].includes(body.status)) throw httpError(400, "Invalid status.");
    goalItem.status = body.status;
    if (goalItem.sharedGroupId && goalItem.primaryOwner) {
      state.goals.filter((item) => item.sharedGroupId === goalItem.sharedGroupId && item.id !== goalItem.id).forEach((linked) => {
        linked.status = goalItem.status;
      });
    }
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "POST" && pathname === "/api/checkins") {
    const employeeId = String(body.employeeId || "");
    const quarter = String(body.quarter || state.selectedQuarter);
    const existing = state.checkins.find((item) => item.employeeId === employeeId && item.quarter === quarter);
    if (existing) {
      existing.comment = String(body.comment || "");
      existing.completed = true;
      existing.updatedAt = nowStamp();
    } else {
      const employee = state.employees.find((item) => item.id === employeeId);
      if (!employee) throw httpError(404, "Employee not found.");
      state.checkins.push({ id: newId("checkin"), employeeId, managerId: employee.managerId, quarter, comment: String(body.comment || ""), completed: true, updatedAt: nowStamp() });
    }
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "POST" && pathname === "/api/admin/unlock") {
    const employeeId = String(body.employeeId || state.currentEmployeeId);
    state.goals.filter((item) => item.employeeId === employeeId).forEach((item) => {
      item.locked = false;
    });
    state.auditLogs.unshift({ id: newId("audit"), actor: "Admin HR", when: nowStamp(), detail: `Unlocked ${employeeName(state, employeeId)}'s goal sheet by exception.` });
    writeDb(state);
    return sendJson(response, 200, state);
  }

  if (request.method === "POST" && pathname === "/api/admin/simulate") {
    const action = body.action === "entra" ? "Microsoft Entra ID sync refreshed hierarchy and role mapping." : "Email and Teams reminders queued for pending submissions and check-ins.";
    state.auditLogs.unshift({ id: newId("audit"), actor: "Admin HR", when: nowStamp(), detail: action });
    writeDb(state);
    return sendJson(response, 200, { state, message: action });
  }

  if (request.method === "GET" && pathname === "/api/reports/achievement.csv") {
    const quarter = new URL(request.url, `http://${request.headers.host}`).searchParams.get("quarter") || state.selectedQuarter;
    const rows = [
      ["Employee", "Department", "Goal", "Thrust Area", "UoM", "Planned Target", "Actual Achievement", "Weightage", "Status", "Progress Score"],
      ...state.goals.map((item) => {
        const employee = state.employees.find((entry) => entry.id === item.employeeId);
        return [employee?.name || "Unknown", employee?.department || "", item.title, item.thrustArea, item.uom, item.targetLabel, item.actuals[quarter] ?? "", `${item.weightage}%`, item.status, `${progressScore(item, quarter)}%`];
      })
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    return sendCsv(response, `achievement-report-${quarter}.csv`, csv);
  }

  throw httpError(404, "API route not found.");
}

function employeeName(state, employeeId) {
  return state.employees.find((item) => item.id === employeeId)?.name || "Unknown employee";
}

function currentUser(state) {
  return state.users.find((item) => item.id === state.currentUserId) || null;
}

function applyUserSession(state, user) {
  state.currentUserId = user.id;
  state.activeRole = user.role;
  if (user.employeeId) state.currentEmployeeId = user.employeeId;
  if (user.role === "manager") {
    const teamMember = state.employees.find((item) => item.managerId === user.managerId);
    if (teamMember) state.currentEmployeeId = teamMember.id;
  }
  if (user.role === "admin" && !state.currentEmployeeId) state.currentEmployeeId = state.employees[0]?.id;
}

const server = http.createServer(async (request, response) => {
  const { pathname } = new URL(request.url, `http://${request.headers.host}`);
  try {
    if (pathname.startsWith("/api/")) {
      await handleApi(request, response, pathname);
      return;
    }
    serveStatic(request, response, pathname);
  } catch (error) {
    sendJson(response, error.status || 500, { error: error.message || "Internal server error" });
  }
});

function listen(port, attemptsLeft = 10) {
  server.once("error", (error) => {
    if (error.code === "EADDRINUSE" && attemptsLeft > 0) {
      console.log(`Port ${port} is busy. Trying ${port + 1}...`);
      listen(port + 1, attemptsLeft - 1);
      return;
    }
    throw error;
  });

  server.listen(port, () => {
    console.log(`Goal portal running at http://localhost:${port}`);
  });
}

ensureDb();
listen(PORT);
