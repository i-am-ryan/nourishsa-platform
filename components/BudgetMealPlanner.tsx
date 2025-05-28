"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { LoaderCircle } from "lucide-react"

export default function BudgetMealPlanner() {
  const [budget, setBudget] = useState("")
  const [meal, setMeal] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    if (!budget) return

    setLoading(true)
    setMeal("")
    setError("")

    try {
      const res = await fetch("https://nourishsa-backend.onrender.com/generate-meal-by-budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget }),
      })

      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setMeal(data.meal)
      }
    } catch (err) {
      setError("Something went wrong while generating the meal.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle className="text-lg">💡 What Can I Cook for R{budget || "___"}?</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter your budget and get an AI-suggested affordable meal!
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter budget (e.g., 50)"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading || !budget}>
            {loading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Generate Meal"}
          </Button>
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}

        {meal && (
          <div>
            <h3 className="font-semibold mb-2">Suggested Meal:</h3>
            <Textarea readOnly value={meal} className="min-h-[120px]" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
