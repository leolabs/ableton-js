# Ableton.js Web Demo

A modern web-based controller for Ableton Live built with Next.js, TypeScript, and shadcn/ui.

## Features

- **Connection Management** - Connect to Ableton Live via UDP
- **Transport Controls** - Play, pause, stop, and navigate
- **Tempo Control** - Adjust tempo with a visual slider
- **Track Overview** - View and control multiple tracks
- **Song Information** - Display current song properties
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Ableton Live with ableton-js MIDI Remote Script installed

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Make sure Ableton Live is running with the AbletonJS MIDI Remote Script enabled
2. Click "Connect to Ableton" in the web interface
3. Use the transport controls to control playback
4. Adjust tempo with the slider
5. Control individual tracks (mute, solo, arm)

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Backend**: ableton-js library

## Project Structure

```
demo/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main controller page
│   └── globals.css      # Global styles
├── components/
│   └── ui/              # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── slider.tsx
│       ├── badge.tsx
│       └── separator.tsx
├── lib/
│   └── utils.ts         # Utility functions
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Future Enhancements

- [ ] Real integration with ableton-js library
- [ ] WebSocket connection for real-time updates
- [ ] Device parameter controls
- [ ] Clip launching
- [ ] Scene management
- [ ] MIDI mapping
- [ ] Dark mode toggle
- [ ] Responsive mobile layout

## License

MIT
