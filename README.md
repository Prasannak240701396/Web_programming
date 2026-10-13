# 🚌 SmartBus Gate — Automated Campus Bus Entry & Punctuality Monitor

An automated college transport gate logging and monitoring system designed to replace traditional manual paper registers at college gates with digital, real-time fleet entry tracking.

---

## 📌 Project Overview & Motivation

### The Problem:
In most educational institutions, campus security guards manually record bus entry times into paper notebooks/registers. This traditional approach suffers from:
- ❌ **Time Delays:** Security must manually write down bus numbers, routes, and arrival times.
- ❌ **Human Error & Tampering:** Inaccurate manual timestamps and difficult auditing.
- ❌ **Lack of Real-Time Visibility:** Management, transport officers, and students cannot track punctuality or delays in real time.

### The Current Solution:
**SmartBus Gate** transforms manual notebook logging into a fast, digital dashboard:
- Security selects or scans a bus number plate.
- The system automatically retrieves complete fleet data: **Bus Number, Plate Number, Route, Driver Name, Contact Number, Departure Time, and Scheduled Arrival Time**.
- The gate entry is instantly stamped with the **live synchronized system date and time**.
- The system automatically evaluates arrival punctuality (**ON TIME** vs. **LATE**) and updates live campus metrics.

---

## 🚀 Future Vision: Automated ANPR & FASTag Toll-Style Scanning

Instead of requiring gatekeepers to manually record or tap entries, the system is designed to transition into an **autonomous smart gate infrastructure**:

```
[ College Bus Arrives at Gate ]
              │
              ▼
[ Gate Camera with ANPR Algorithm / RFID FASTag Reader ]
              │
              ▼ (Instantly detects Number Plate: e.g. TN-21-AB-1000)
[ SmartBus Central System ]
              │
              ├── Automatically fetches Bus Route, Driver details & Timings
              ├── Logs exact gate entry timestamp
              ├── Calculates Punctuality (On Time / Late)
              └── Opens Gate Barrier & Notifies Transport Admin in Real Time
```

- **ANPR (Automatic Number Plate Recognition):** Computer vision and OCR algorithms detect incoming buses via high-speed gate cameras.
- **FASTag / RFID Integration:** Similar to highway toll plazas, RFID tags on college buses trigger instant gate entry logging with zero manual intervention.

---

## 🛠️ Technologies & Languages Used

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** (`react`, `react-dom`) | Modern component architecture, functional hooks (`useState`, `useEffect`). |
| **Language** | **JavaScript (ES6+)** | Dynamic event handling, date/time calculations, and state logic. |
| **Markup & Structure** | **HTML5** | Semantic web layout and accessibility. |
| **Styling & Design** | **Vanilla CSS3** | Custom design system, responsive grid layout, micro-animations, pulsing indicators. |
| **Build Tool & Dev Server** | **Vite 5** | Lightning-fast HMR (Hot Module Replacement) and optimized production bundler. |
| **Persistence** | **Browser LocalStorage** | Real-time storage and synchronization across page reloads. |

---

## ✨ Current Features Implemented

1. **🔒 Fixed Live Real-Time Clock:**
   - Synchronized continuously with the system clock (updates every second with seconds display).
   - Entry Date and Entry Time are locked (`readOnly`) to prevent manual tampering.

2. **🚌 Complete 15-Fleet Demo Data:**
   - Pre-loaded with all 15 registered college buses covering major campus routes across Chennai/Tamil Nadu.

3. **⚡ Instant Gate Entry Logging:**
   - Security selects a bus and records the gate entry with one click.
   - For demo presentations, clicking record marks the bus as **`LATE`** with an alert banner and elevates the record to the top of the log with an `UPDATED` indicator.

4. **📊 Live KPI Analytics:**
   - Instant metrics for **Total Entries Logged**, **On Time (Green)**, **Late (Red)**, and **Total Fleet Size**.

5. **🔍 Search & Filter Tools:**
   - Instant search across Bus Numbers, Registration Plates, Driver Names, and Routes.
   - Status filters (**All**, **On Time**, **Late**).

6. **🖥️ One-Click Desktop Launcher:**
   - Includes `run-app.bat` for instant launching by double-clicking from the desktop folder.

---

## 📋 Registered Fleet Directory (15 Buses)

| Bus No. | Registration Plate | Driver Name | Driver Contact | Route | Departure | Scheduled Arrival |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | `TN-21-AB-1000` | K. Murugan | +91 98401 10000 | Porur → College | 06:30 AM | 07:45 AM |
| **1A** | `TN-22-AB-1137` | S. Ramesh | +91 98401 10179 | Tambaram → College | 06:15 AM | 07:40 AM |
| **2** | `TN-23-AB-1274` | M. Palani | +91 98401 10358 | CMBT Koyambedu → College | 06:20 AM | 07:45 AM |
| **3** | `TN-24-AB-1411` | V. Sundaram | +91 98401 10537 | T. Nagar → College | 06:15 AM | 07:45 AM |
| **4** | `TN-25-AB-1548` | R. Arumugam | +91 98401 10716 | Avadi → College | 06:25 AM | 07:40 AM |
| **5** | `TN-26-AB-1685` | P. Selvam | +91 98401 10895 | Kanchipuram → College | 06:10 AM | 07:40 AM |
| **7** | `TN-27-AB-1822` | A. Natarajan | +91 98401 11074 | Velachery → College | 06:15 AM | 07:45 AM |
| **8** | `TN-28-AB-1959` | L. Ramajayam | +91 98401 11253 | Chengalpattu → College | 06:05 AM | 07:40 AM |
| **9** | `TN-29-AB-2096` | M. Venkatesan | +91 98401 11432 | Redhills → College | 06:10 AM | 07:45 AM |
| **11** | `TN-30-AB-2233` | T. Saravanan | +91 98401 11611 | Central → College | 06:10 AM | 07:45 AM |
| **12** | `TN-31-AB-2370` | D. Elumalai | +91 98401 11790 | Anna Nagar → College | 06:20 AM | 07:40 AM |
| **14** | `TN-32-AB-2507` | G. Kumar | +91 98401 11969 | Chromepet → College | 06:20 AM | 07:40 AM |
| **15** | `TN-33-AB-2644` | S. Manikandan | +91 98401 12148 | Guindy → College | 06:25 AM | 07:45 AM |
| **17** | `TN-34-AB-2781` | N. Senthil | +91 98401 12327 | Poonamallee → College | 06:50 AM | 07:45 AM |
| **17A** | `TN-35-AB-2918` | B. Karthik | +91 98401 12506 | Sriperumbudur → College | 07:05 AM | 07:45 AM |

---

## 💻 How to Run the Application

### 1. Prerequisites
- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)

### 2. Installation
Open a terminal inside the project directory and run:
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
To automatically open in your default browser:
```bash
npm run dev -- --open
```

Once running, access the dashboard at:
- **Local:** `http://localhost:5173/`
- **Network (Mobile/LAN):** `http://<your-ip>:5173/`

### 4. Production Build
```bash
npm run build
npm run preview
```

### 5. Quick Launch (Windows)
Double-click **`run-app.bat`** in the project folder to start the server and open the browser automatically.

---

## 📁 Project Structure

```
Bus Tracker/
├── index.html              # HTML entry point
├── package.json            # Project dependencies & scripts
├── vite.config.js          # Vite build configuration
├── run-app.bat             # 1-click Windows desktop launcher
├── README.md               # Project documentation
└── src/
    ├── main.jsx            # React root DOM mounting
    ├── App.jsx             # Main Gate Tracker application logic & UI
    └── styles.css          # Design system styling & responsive layout
```
