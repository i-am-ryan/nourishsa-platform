"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownProps {
  /** JavaScript Date object indicating when the deal expires */
  expiresAt: Date;
}

export default function Countdown({ expiresAt }: CountdownProps) {
  // initialize remaining seconds
  const calcSecs = () =>
    Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));

  const [secondsLeft, setSecondsLeft] = useState(calcSecs);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(calcSecs());
    }, 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  // derive HH:MM:SS
  const hrs = Math.floor(secondsLeft / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((secondsLeft % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="flex items-center space-x-1 text-sm text-gray-700">
      <Clock className="w-4 h-4" />
      <span>{hrs}:{mins}:{secs}</span>
    </div>
  );
}
