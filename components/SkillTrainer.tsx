"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function SkillTrainer() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("https://nourishsa-backend.onrender.com/api/skill-trainer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (data && data.tutorial) {
        setResult(data.tutorial);
      } else {
        setError("No tutorial found or something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the AI tutor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle>🎓 AI Skill Learning Module</CardTitle>
        <p className="text-sm text-muted-foreground">
          Ask how to preserve or grow food in your area. Practical, AI-powered advice.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="e.g. How to preserve spinach using solar drying?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Generating..." : "Get Tutorial"}
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {result && (
          <Textarea
            value={result}
            className="h-64 bg-gray-50 border border-gray-200 rounded-md"
            readOnly
          />
        )}
      </CardContent>
    </Card>
  );
}
