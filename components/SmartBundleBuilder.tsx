"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function BundleAndMealPlanner() {
  const [preference, setPreference] = useState("");
  const [suggestion, setSuggestion] = useState<{ items: string[]; price?: number } | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [budget, setBudget] = useState("");
  const [mealPlan, setMealPlan] = useState<string | null>(null);
  const [mealLoading, setMealLoading] = useState(false);

  const handleGenerateBundle = async () => {
    if (!preference) return;
    try {
      setLoading(true);
      const res = await fetch("https://nourishsa-backend.onrender.com/generate-bundle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preference }),
      });
      const data = await res.json();
      setSuggestion({ items: data.bundle });
    } catch (error) {
      console.error(error);
      setSuggestion({ items: ["Something went wrong"] });
    } finally {
      setLoading(false);
      setRating(null);
    }
  };

  const handleGenerateMeal = async () => {
    if (!budget) return;
    try {
      setMealLoading(true);
      const res = await fetch("https://nourishsa-backend.onrender.com/api/r50-meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget }),
      });
      const data = await res.json();
      if (data.success) setMealPlan(data.meal_plan);
      else setMealPlan("Error fetching meal plan.");
    } catch (error) {
      console.error(error);
      setMealPlan("Something went wrong.");
    } finally {
      setMealLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Smart Bundle Builder */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="text-lg">🧠 Smart Bundle Builder</CardTitle>
          <p className="text-sm text-muted-foreground">Get a personalized surplus bundle</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select onValueChange={setPreference}>
              <SelectTrigger>
                <SelectValue placeholder="Select your preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="keto">Keto / Low-Carb</SelectItem>
                <SelectItem value="diabetic">Diabetic-Friendly</SelectItem>
                <SelectItem value="budget">Budget-Friendly</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateBundle} disabled={loading}>
              {loading ? "Generating..." : "Get Bundle"}
            </Button>
          </div>

          {suggestion && (
            <div className="mt-4 space-y-3">
              <h3 className="font-semibold">Suggested Bundle:</h3>
              <div className="flex flex-wrap gap-2">
                {suggestion.items.map((item, i) => (
                  <Badge key={i} className="text-sm px-3 py-1 bg-emerald-100 text-emerald-700">
                    {item}
                  </Badge>
                ))}
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">Reserve Now</Button>
              <div className="flex items-center space-x-2 mt-3">
                <p className="text-sm text-gray-600">Rate this bundle:</p>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer text-lg ${rating && star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* R50 Meal Planner */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="text-lg">🍽️ Meal Planner by Budget</CardTitle>
          <p className="text-sm text-muted-foreground">AI-powered meal plan based on your budget</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter budget e.g. 50"
            />
            <Button onClick={handleGenerateMeal} disabled={mealLoading}>
              {mealLoading ? "Generating..." : "Get Meal Plan"}
            </Button>
          </div>
          {mealPlan && (
            <div className="bg-gray-100 p-4 rounded mt-4 whitespace-pre-wrap text-sm border border-gray-300">
              {mealPlan}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
