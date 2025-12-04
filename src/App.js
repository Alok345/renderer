import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (window.electronAPI?.on) {
      window.electronAPI.on("active-app-update", (data) => {
        setLogs(prev => [data, ...prev]);
      });
    } else {
      console.log("Electron API not available.");
    }
  }, []);

  function sendTestLog() {
    if (window.electronAPI?.send) {
      window.electronAPI.send("save-log", {
        action: "Manual Test Log",
        appName: "Chrome",
      });
    } else {
      console.log("Electron API not available. Running in browser?");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Activity Monitor</h1>

        <button
          onClick={sendTestLog}
          style={{ margin: 20, padding: "10px 20px" }}
        >
          Send Test Log
        </button>

        <div style={{ marginTop: 20, width: "80%", maxHeight: "400px", overflowY: "scroll" }}>
          <h2>Live Logs:</h2>

          {logs.map((log, index) => (
            <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "5px 0" }}>
              <strong>{log.event || log.action}</strong>
              {log.appName ? ` - ${log.appName}` : ""}
              {log.duration ? ` (${log.duration}s)` : ""}
              <br />
              <small>{new Date(log.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
