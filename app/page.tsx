"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Laugh } from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateJoke = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError("");
    setJoke("");

    try {
      const res = await fetch("https://YOUR_API_GATEWAY_URL/prod/joke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error("Failed to fetch joke");

      const data = await res.json();
      setJoke(data.joke);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Laugh className="h-6 w-6" />
            AI Joke Generator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter any topic and get a laugh-out-loud joke 😄
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g. Make a joke about AWS Lambda"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="resize-none"
            rows={3}
          />

          <Button onClick={generateJoke} disabled={loading} className="w-full">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Generating...
              </span>
            ) : (
              "Generate Joke"
            )}
          </Button>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          {joke && (
            <div className="mt-4 rounded-xl border bg-muted p-4 text-center animate-in fade-in zoom-in">
              <p className="text-base font-medium">😂 {joke}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
