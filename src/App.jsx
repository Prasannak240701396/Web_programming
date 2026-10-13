import React, { useState, useEffect } from 'react';

// 15 Registered College Buses
const BUSES = [
  { id: '1', busNumber: '1', regNumber: 'TN-21-AB-1000', driverName: 'K. Murugan', mobile: '+91 98401 10000', route: 'Porur -> College', departureTime: '06:30 AM', scheduledArrivalTime: '07:45 AM' },
  { id: '2', busNumber: '1A', regNumber: 'TN-22-AB-1137', driverName: 'S. Ramesh', mobile: '+91 98401 10179', route: 'Tambaram -> College', departureTime: '06:15 AM', scheduledArrivalTime: '07:40 AM' },
  { id: '3', busNumber: '2', regNumber: 'TN-23-AB-1274', driverName: 'M. Palani', mobile: '+91 98401 10358', route: 'CMBT Koyambedu -> College', departureTime: '06:20 AM', scheduledArrivalTime: '07:45 AM' },
  { id: '4', busNumber: '3', regNumber: 'TN-24-AB-1411', driverName: 'V. Sundaram', mobile: '+91 98401 10537', route: 'T. Nagar -> College', departureTime: '06:15 AM', scheduledArrivalTime: '07:45 AM' },
  { id: '5', busNumber: '4', regNumber: 'TN-25-AB-1548', driverName: 'R. Arumugam', mobile: '+91 98401 10716', route: 'Avadi -> College', departureTime: '06:25 AM', scheduledArrivalTime: '07:40 AM' },
  { id: '6', busNumber: '5', regNumber: 'TN-26-AB-1685', driverName: 'P. Selvam', mobile: '+91 98401 10895', route: 'Kanchipuram -> College', departureTime: '06:10 AM', scheduledArrivalTime: '07:40 AM' },
  { id: '7', busNumber: '7', regNumber: 'TN-27-AB-1822', driverName: 'A. Natarajan', mobile: '+91 98401 11074', route: 'Velachery -> College', departureTime: '06:15 AM', scheduledArrivalTime: '07:45 AM' },
  { id: '8', busNumber: '8', regNumber: 'TN-28-AB-1959', driverName: 'L. Ramajayam', mobile: '+91 98401 11253', route: 'Chengalpattu -> College', departureTime: '06:05 AM', scheduledArrivalTime: '07:40 AM' },
  { id: '9', busNumber: '9', regNumber: 'TN-29-AB-2096', driverName: 'M. Venkatesan', mobile: '+91 98401 11432', route: 'Redhills -> College', departureTime: '06:10 AM', scheduledArrivalTime: '07:45 AM' },
  { id: '10', busNumber: '11', regNumber: 'TN-30-AB-2233', driverName: 'T. Saravanan', mobile: '+91 98401 11611', route: 'Central -> College', departureTime: '06:10 AM', scheduledArrivalTime: '07:45 AM' },
  { id: '11', busNumber: '12', regNumber: 'TN-31-AB-2370', driverName: 'D. Elumalai', mobile: '+91 98401 11790', route: 'Anna Nagar -> College', departureTime: '06:20 AM', scheduledArrivalTime: '07:40 AM' },
  { id: '12', busNumber: '14', regNumber: 'TN-32-AB-2507', driverName: 'G. Kumar', mobile: '+91 98401 11969', route: 'Chromepet -> College', departureTime: '06:20 AM', scheduledArrivalTime: '07:40 AM' },
  { id: '13', busNumber: '15', regNumber: 'TN-33-AB-2644', driverName: 'S. Manikandan', mobile: '+91 98401 12148', route: 'Guindy -> College', departureTime: '06:25 AM', scheduledArrivalTime: '07:45 AM' },
  { id: '14', busNumber: '17', regNumber: 'TN-34-AB-2781', driverName: 'N. Senthil', mobile: '+91 98401 12327', route: 'Poonamallee -> College', departureTime: '06:50 AM', scheduledArrivalTime: '07:45 AM' },
  { id: '15', busNumber: '17A', regNumber: 'TN-35-AB-2918', driverName: 'B. Karthik', mobile: '+91 98401 12506', route: 'Sriperumbudur -> College', departureTime: '07:05 AM', scheduledArrivalTime: '07:45 AM' }
];

// Helper Functions
const getNowDate = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
};

const getNowTime = () => {
  const d = new Date();
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  const p = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${m}:${s} ${p}`;
};

const STORAGE_KEY = 'college_bus_tracker_v5';

// Seed initial demo data for all 15 registered fleet buses
const getInitialSeeds = () => {
  const today = getNowDate();
  return BUSES.map(b => ({
    id: `seed-${b.id}`,
    ...b,
    actualEntryDate: today,
    actualEntryTime: (b.busNumber === '1A' || b.busNumber === '8') ? '07:55 AM' : '07:38 AM',
    status: (b.busNumber === '1A' || b.busNumber === '8') ? 'LATE' : 'ON TIME'
  }));
};


export default function App() {
  // Live continuous clock state
  const [currentDateTime, setCurrentDateTime] = useState({
    date: getNowDate(),
    time: getNowTime()
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime({
        date: getNowDate(),
        time: getNowTime()
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Entries with all 15 demo buses seeded
  const [entries, setEntries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 15) {
          return parsed;
        }
      }
    } catch (e) {}
    return getInitialSeeds();
  });

  const [selectedBusId, setSelectedBusId] = useState(BUSES[0].id);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [bannerAlert, setBannerAlert] = useState(null);
  const [highlightedBusId, setHighlightedBusId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const selectedBus = BUSES.find(b => b.id === selectedBusId) || BUSES[0];

  // Record Entry Handler: Sets status to LATE for the demo
  const handleRecord = (e) => {
    e.preventDefault();

    const liveDate = currentDateTime.date;
    const liveTime = currentDateTime.time;

    // Check if this bus is already in the table
    const existingIndex = entries.findIndex(r => r.busNumber === selectedBus.busNumber);

    const updatedRecord = {
      id: existingIndex >= 0 ? entries[existingIndex].id : `entry-${Date.now()}`,
      busNumber: selectedBus.busNumber,
      regNumber: selectedBus.regNumber,
      driverName: selectedBus.driverName,
      mobile: selectedBus.mobile,
      route: selectedBus.route,
      departureTime: selectedBus.departureTime,
      scheduledArrivalTime: selectedBus.scheduledArrivalTime,
      actualEntryDate: liveDate,
      actualEntryTime: liveTime,
      status: 'LATE' // Set to LATE for presentation demo as requested
    };

    let newEntries;
    if (existingIndex >= 0) {
      // Move this updated bus to the top so it is immediately visible
      const remaining = entries.filter((_, idx) => idx !== existingIndex);
      newEntries = [updatedRecord, ...remaining];
    } else {
      newEntries = [updatedRecord, ...entries];
    }

    setEntries(newEntries);
    setHighlightedBusId(updatedRecord.id);
    setBannerAlert({
      busNumber: selectedBus.busNumber,
      time: liveTime,
      date: liveDate
    });

    // Clear row highlight effect after 5 seconds
    setTimeout(() => {
      setHighlightedBusId(null);
    }, 5000);
  };

  const filteredEntries = entries.filter(r => {
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return r.busNumber.toLowerCase().includes(q) || r.regNumber.toLowerCase().includes(q) || r.driverName.toLowerCase().includes(q) || r.route.toLowerCase().includes(q);
    }
    return true;
  });

  const onTimeCount = entries.filter(r => r.status === 'ON TIME').length;
  const lateCount = entries.filter(r => r.status === 'LATE').length;

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>College Bus Entry Tracker</h1>
          <p>Campus Gate Arrival & Punctuality Monitor (15 Fleet Buses)</p>
        </div>
        <div className="header-meta">
          <div className="live-clock-pill">
            <span className="pulse-dot"></span>
            <span>Live Gate Clock: <strong>{currentDateTime.time}</strong> ({currentDateTime.date})</span>
          </div>
          <div className="badge">15 Buses Registered</div>
        </div>
      </header>

      {/* KPI Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{entries.length}</div>
          <div className="stat-label">Total Entries Logged</div>
        </div>
        <div className="stat-card ontime">
          <div className="stat-value">{onTimeCount}</div>
          <div className="stat-label">On Time (Green)</div>
        </div>
        <div className="stat-card late">
          <div className="stat-value">{lateCount}</div>
          <div className="stat-label">Late (Red)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{BUSES.length}</div>
          <div className="stat-label">Total Fleet</div>
        </div>
      </div>

      {/* Record Bus Entry Form */}
      <div className="card">
        <h2 className="card-title">Record Bus Gate Entry</h2>
        
        {bannerAlert && (
          <div className="alert-banner">
            <span className="alert-icon">⚠️</span>
            <div className="alert-text">
              <strong>Entry Recorded:</strong> Bus No. <strong>{bannerAlert.busNumber}</strong> recorded at <strong>{bannerAlert.time}</strong> ({bannerAlert.date}) — Status marked as <span className="alert-late-badge">LATE</span>
            </div>
            <button className="alert-close" onClick={() => setBannerAlert(null)}>✕</button>
          </div>
        )}

        <form onSubmit={handleRecord} className="form-row">
          <div className="form-group select-group">
            <label>Select Bus:</label>
            <select value={selectedBusId} onChange={e => setSelectedBusId(e.target.value)} className="input">
              {BUSES.map(b => (
                <option key={b.id} value={b.id}>
                  Bus {b.busNumber} — {b.regNumber} ({b.route} | Sch: {b.scheduledArrivalTime})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <div className="label-with-btn">
              <label>Entry Date:</label>
              <span className="tag-lock">🔒 Live System Date</span>
            </div>
            <input 
              type="text" 
              value={currentDateTime.date} 
              readOnly 
              className="input input-locked" 
              title="Date is synchronized to live system date" 
            />
          </div>

          <div className="form-group">
            <div className="label-with-btn">
              <label>Entry Time:</label>
              <span className="tag-live"><span className="pulse-dot"></span> Live Running Clock</span>
            </div>
            <input 
              type="text" 
              value={currentDateTime.time} 
              readOnly 
              className="input input-locked live-font" 
              title="Time is running live automatically" 
            />
          </div>

          <div className="form-group status-box">
            <label>Calculated Status:</label>
            <div className="status-pill late">
              LATE
            </div>
          </div>

          <div className="form-group btn-group">
            <button type="submit" className="btn-primary">Record Bus Entry</button>
          </div>
        </form>

        <div className="bus-preview">
          <div><span>Fleet Bus</span><strong>Bus No. {selectedBus.busNumber}</strong></div>
          <div><span>Registration</span><code>{selectedBus.regNumber}</code></div>
          <div><span>Driver</span><strong>{selectedBus.driverName}</strong></div>
          <div><span>Mobile</span><strong>{selectedBus.mobile}</strong></div>
          <div><span>Route</span><strong>{selectedBus.route}</strong></div>
          <div><span>Departure</span><strong>{selectedBus.departureTime}</strong></div>
          <div><span>Scheduled Arrival</span><strong className="green-text">{selectedBus.scheduledArrivalTime}</strong></div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card">
        <div className="table-header">
          <div className="search-wrap">
            <input 
              type="text" 
              placeholder="Search by Bus No, Reg, Driver or Route..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="input" 
            />
          </div>
          <div className="filter-wrap">
            <button className={`filter-btn ${statusFilter === 'ALL' ? 'active' : ''}`} onClick={() => setStatusFilter('ALL')}>
              All ({entries.length})
            </button>
            <button className={`filter-btn ${statusFilter === 'ON TIME' ? 'active' : ''}`} onClick={() => setStatusFilter('ON TIME')}>
              On Time ({onTimeCount})
            </button>
            <button className={`filter-btn ${statusFilter === 'LATE' ? 'active' : ''}`} onClick={() => setStatusFilter('LATE')}>
              Late ({lateCount})
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Bus No.</th>
                <th>Registration No.</th>
                <th>Driver Name</th>
                <th>Mobile</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Scheduled Arrival</th>
                <th>Actual Entry Date</th>
                <th>Actual Entry Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.length > 0 ? (
                filteredEntries.map(r => (
                  <tr key={r.id} className={r.id === highlightedBusId ? 'row-highlighted' : ''}>
                    <td className="bus-cell">
                      Bus {r.busNumber}
                      {r.id === highlightedBusId && <span className="just-recorded-badge">UPDATED</span>}
                    </td>
                    <td><code className="reg-code">{r.regNumber}</code></td>
                    <td>{r.driverName}</td>
                    <td>{r.mobile}</td>
                    <td><strong>{r.route}</strong></td>
                    <td>{r.departureTime}</td>
                    <td className="sch-cell">{r.scheduledArrivalTime}</td>
                    <td>{r.actualEntryDate}</td>
                    <td className="actual-cell">{r.actualEntryTime}</td>
                    <td><span className={`status-pill ${r.status === 'ON TIME' ? 'ontime' : 'late'}`}>{r.status}</span></td>
                    <td>
                      <button onClick={() => setEntries(entries.filter(e => e.id !== r.id))} className="btn-delete" title="Delete entry">✕</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="11" className="empty-state">No entries found matching search or filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="footer-note">
          Status Rule: Actual Entry &le; Scheduled Arrival = <strong>ON TIME (Green)</strong> • Actual Entry &gt; Scheduled Arrival = <strong>LATE (Red)</strong>
        </div>
      </div>
    </div>
  );
}

