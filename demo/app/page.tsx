"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Play, Pause, Square, SkipForward, SkipBack } from "lucide-react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <main className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Ableton.js Web Controller</h1>
            <p className="text-muted-foreground">
              Control your Ableton Live instance from the browser
            </p>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} className="text-sm px-4 py-2">
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        <Separator />

        {/* Connection Card */}
        <Card>
          <CardHeader>
            <CardTitle>Connection</CardTitle>
            <CardDescription>
              Connect to your Ableton Live instance via UDP
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="localhost"
                className="flex-1"
                disabled={isConnected}
              />
              <Input
                placeholder="Port (default: auto)"
                className="flex-1"
                disabled={isConnected}
              />
            </div>
            <Button
              onClick={() => setIsConnected(!isConnected)}
              variant={isConnected ? "destructive" : "default"}
              className="w-full"
            >
              {isConnected ? "Disconnect" : "Connect to Ableton"}
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transport Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Transport</CardTitle>
              <CardDescription>
                Playback controls and tempo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center gap-2">
                <Button variant="outline" size="icon" disabled={!isConnected}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  disabled={!isConnected}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-12 w-12"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="outline" size="icon" disabled={!isConnected}>
                  <Square className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" disabled={!isConnected}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Tempo</label>
                  <span className="text-sm font-mono">{tempo} BPM</span>
                </div>
                <Slider
                  value={[tempo]}
                  onValueChange={(value) => setTempo(value[0])}
                  min={40}
                  max={240}
                  step={1}
                  disabled={!isConnected}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" disabled={!isConnected}>
                  Tap Tempo
                </Button>
                <Button variant="outline" disabled={!isConnected}>
                  Metronome
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Song Info */}
          <Card>
            <CardHeader>
              <CardTitle>Song Info</CardTitle>
              <CardDescription>
                Current song properties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Song Name</label>
                <Input value="Untitled" disabled className="font-mono" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Signature</label>
                  <Input value="4/4" disabled className="font-mono text-center" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Song Position</label>
                  <Input value="1.1.1" disabled className="font-mono text-center" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Loop</label>
                <div className="flex gap-2">
                  <Input value="1.1.1" disabled className="font-mono flex-1" placeholder="Start" />
                  <Input value="5.1.1" disabled className="font-mono flex-1" placeholder="End" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tracks */}
        <Card>
          <CardHeader>
            <CardTitle>Tracks</CardTitle>
            <CardDescription>
              View and control all tracks in your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((track) => (
                <div
                  key={track}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="w-1 h-12 bg-primary rounded" />
                  <div className="flex-1">
                    <div className="font-medium">Track {track}</div>
                    <div className="text-sm text-muted-foreground">Audio Track</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled={!isConnected}>
                      M
                    </Button>
                    <Button variant="outline" size="sm" disabled={!isConnected}>
                      S
                    </Button>
                    <Button variant="outline" size="sm" disabled={!isConnected}>
                      R
                    </Button>
                  </div>
                  <Slider
                    defaultValue={[75]}
                    max={100}
                    step={1}
                    className="w-32"
                    disabled={!isConnected}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-8">
          <p>Built with Next.js, shadcn/ui, and ableton-js</p>
        </div>
      </main>
    </div>
  );
}
