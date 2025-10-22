# JF Magic - Interactive Presentation App

An interactive Next.js presentation app for the FIP (FRÄNKISCHE Industrial Pipes) project demo.

## Features

- **6 Presentation Slides**: Navigate through the presentation with next/back buttons
- **Admin Panel**: Control which project cards are visible during the presentation
- **Audience Input**: QR code for audience to submit ideas via mobile/web
- **AI-Powered Winner Selection**: Uses Claude AI (Sonnet 4) to select the best idea
- **Real-time Updates**: State polling every 500ms to sync all screens
- **Responsive Design**: Works on both mobile and desktop

## Color Palette

- Yellow: `#FBCB12`
- Pink: `#BB256A`
- Blue: `#1E1165`
- Green: `#1A3B40`

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment file and add your Anthropic API key:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Routes

### Presentation Slides

- `/presentation/1` - Title slide (22.10.2025)
- `/presentation/2` - Apology to Maike
- `/presentation/3` - Project setup cards (admin-controlled visibility)
- `/presentation/4` - QR code for audience input
- `/presentation/5` - Display audience ideas
- `/presentation/6` - Winner selection animation

### Utility Routes

- `/admin` - Admin panel to control card visibility
- `/input` - Form for audience to submit ideas

## Usage Flow

1. **Start the presentation** at `/presentation/1`
2. **Navigate through slides** using the Next button
3. **On Slide 3**: Use `/admin` panel to toggle project cards as you present
4. **On Slide 4**: Show QR code for audience to scan
5. **Audience submits ideas** via `/input` page
6. **On Slide 5**: View all submitted ideas in real-time
7. **On Slide 6**: Click "Pick Winner" to use AI to select the best idea

## Customization

### Project Cards

Edit `lib/sampleCards.ts` to customize the 8 project cards shown on Slide 3.

### Winner Selection Prompt

Edit `app/api/winner/route.ts` to customize the AI prompt used for winner selection.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4
- **AI**: Anthropic Claude API (Sonnet 4)
- **QR Codes**: qrcode.react
- **Language**: TypeScript

## Deployment

When deploying to production:

1. Set the `ANTHROPIC_API_KEY` environment variable in your hosting platform
2. Build the project: `pnpm build`
3. Start the server: `pnpm start`

## Notes

- State is stored in-memory, so restarting the server will reset all data
- For production use, consider adding a database for persistence
- The winner selection requires a valid Anthropic API key with access to Claude Sonnet 4
