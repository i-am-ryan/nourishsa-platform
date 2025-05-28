"use client";

// BlockchainTraceability.tsx
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

interface TraceItem {
  id?: number;
  donor: string;
  recipient: string;
  item: string;
  date: string;
  traceLink: string;
}

export default function BlockchainTraceability() {
  const [traceData, setTraceData] = useState<TraceItem[]>([]);
  const [form, setForm] = useState({ donor: "", recipient: "", item: "", date: "" });
  const [loading, setLoading] = useState(false);

  // Load existing data from the backend on component mount
  const fetchTraceData = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/trace-records");
      const data = await res.json();
      if (data.success) {
        const converted: TraceItem[] = data.records.map((rec: any) => ({
          id: rec.id,
          donor: rec.donor,
          recipient: rec.recipient,
          item: rec.items,
          date: rec.timestamp,
          traceLink: `https://nourishsa.org/trace/${rec.id}`,
        }));
        setTraceData(converted);
      }
    } catch (error) {
      console.error("Failed to load trace data:", error);
    }
  };

  useEffect(() => {
    fetchTraceData();
  }, []);

  const handleSubmit = async () => {
    if (!form.donor || !form.recipient || !form.item || !form.date) return;
    setLoading(true);

    try {
      await fetch("http://127.0.0.1:5000/api/trace-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor: form.donor,
          recipient: form.recipient,
          items: form.item,
          timestamp: form.date,
        }),
      });

      setForm({ donor: "", recipient: "", item: "", date: "" });
      fetchTraceData();
    } catch (err) {
      console.error("Failed to submit trace record", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle>🔗 Blockchain Traceability</CardTitle>
        <p className="text-sm text-muted-foreground">
          Submit and view traceable donor impact records.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Donor"
            value={form.donor}
            onChange={(e) => setForm({ ...form, donor: e.target.value })}
          />
          <Input
            placeholder="Recipient"
            value={form.recipient}
            onChange={(e) => setForm({ ...form, recipient: e.target.value })}
          />
          <Input
            placeholder="Item Donated"
            value={form.item}
            onChange={(e) => setForm({ ...form, item: e.target.value })}
          />
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Trace"}
        </Button>

        {/* Display trace records */}
        {traceData.map((trace, i) => (
          <div key={i} className="border p-4 rounded-md shadow-sm bg-gray-50">
            <p className="font-bold text-gray-800">{trace.item}</p>
            <p className="text-sm text-gray-600">
              Donor: {trace.donor} → Recipient: {trace.recipient} ({trace.date})
            </p>
            <div className="mt-2">
              <QRCode value={trace.traceLink} size={80} />
              <p className="text-xs text-blue-600 mt-1 break-all">{trace.traceLink}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
