import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "employeeLogs"), orderBy("time", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let arr = [];
      snapshot.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      setLogs(arr);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Live Employee Activity</h2>
      {logs.map((l) => (
        <div key={l.id}>
          <b>{l.empId}</b> — {l.action} — {l.appName} — {l.time?.toDate?.().toString()}
        </div>
      ))}
    </div>
  );
}
