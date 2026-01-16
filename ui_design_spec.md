# JalRakshak UI/UX Design Specification & Strategy

## 1. UI Philosophy
**"Calm Authority, Rapid Action."**
The interface avoids alarmism while ensuring critical safety information is impossible to miss. It prioritizes *clarity over density* so that stressed citizens can act immediately (report/escape) and municipal officers can decide instantly (dispatch/resolve) without cognitive load.

---

## 2. Overall Layout Structure
We utilize a **Role-Adaptive Shell**. The outer navigation skeleton changes based on the user persona, but the core design language (typography, spacing) remains consistent to build trust.

### **Navigation Model**
*   **Mobile-First Bottom Bar (Citizens):**
    *   *Home* (Status & Alerts)
    *   *Report* (Quick Action)
    *   *Map* (Safety Zones)
    *   *Chat* (AI Assistant)
*   **Sidebar Navigation (Admins - Desktop optimized):**
    *   *Dashboard* (Command Center)
    *   *Complaints* (Table/Bulk Actions)
    *   *Map View* (Heatmaps)
    *   *Analytics* (Trends)
    *   *Team* (Staff Management)

---

## 3. Citizen Dashboard Layout
**Goal:** Answer "Am I safe?" and "How do I get help?" instantly.

| Section | Priority | Purpose | Visual Strategy |
| :--- | :--- | :--- | :--- |
| **Safety Header** | **Critical (1)** | Immediate status: Safe, Warning, or Danger. | **Full-width color block.** Green (Safe), Amber (Watch), Red (Evacuate). Large Icon. |
| **Emergency Alerts** | **High (2)** | Specific warnings (e.g., "River rising"). | **Dismissible cards** right below header. Clear timestamps. |
| **Quick Actions** | **High (3)** | Report common issues without navigating. | **Large Icon Buttons.** "Report Leak", "Flood Help", "Water Quality". |
| **My Activity** | Medium (4) | Status of user's own complaints. | **timeline/Step view.** "Submitted" -> "In Progress" -> "Fixed". No complex tables. |

---

## 4. Admin Dashboard Layout
**Goal:** Situational Awareness & Resource Allocation.

| Section | Priority | Purpose | Visual Strategy |
| :--- | :--- | :--- | :--- |
| **KPI Ticker** | **High (1)** | System health at a glance. | **4 Card Row:** Critical Alerts | Open Complaints | Avg Resolution Time | Staff Active. |
| **Geospatial Ops** | **High (2)** | Visualizing problem clusters. | **Large Map.** Pins color-coded by severity. Click pin for details slide-over. |
| **Critical Feed** | Medium (3) | List of items needing immediate attention. | **Sorted List.** Items breached SLA or marked "Severe" float to top. |
| **Trend Analysis** | Low (4) | Long-term improvement tracking. | **Sparklines/Mini-charts.** "Flood levels vs last week". |

---

## 5. Key Interaction Patterns

### **A. The "Panic-Free" Report Flow (Citizen)**
*   **Stop doing:** Long forms with 20 fields.
*   **Start doing:**
    1.  **Auto-Locate**: GPS is default.
    2.  **Photo-First**: "Take a picture" is the primary action.
    3.  **One-Tap Category**: 4 big icons (Leak, Flood, Dirty Water, Other).
    4.  **Audio Note**: Voice-to-text for description (accessibility).

### **B. The "Command" Response (Admin)**
*   **Stop doing:** Opening a new page to update status.
*   **Start doing:** **Slide-over Drawer.** Clicking a complaint opens a side panel.
    *   Admin sees photo + map.
    *   One-click "Assign to Field Unit".
    *   One-click "Mark as Resolved".
    *   AI-suggested severity rating.

### **C. The "Safety" Notification (Global)**
*   **Pattern:** Push notifications are categorized by **Severity Tone**.
    *   *Info:* Standard notification sound.
    *   *Warning:* Vibrate + Sound.
    *   *Danger:* Override silent mode (if permissible/native app) or Persistent Banner in app.

---

## 6. Why this UI is Better?
*   **Cognitive Load Reduction:** A citizen in a flood doesn't want to navigate a "hamburger menu". They see RED header -> They move.
*   **Operational Efficiency:** Admins don't hunt for work. The dashboard *pushes* exceptions (critical alerts, SLA breaches) to their face.
*   **Trust:** By removing "startup fluff" (gradients, bounce animations) and using consistent, government-grade typography (Inter/Roboto, high contrast), we convey reliability. It looks like a tool, not a toy.
