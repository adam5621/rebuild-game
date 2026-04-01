# Rebuild Game Engine v2.4

A strategic, turn-based football (soccer) team management and drafting game. Players start with a baseline team and budget, and compete over 11 rounds to build the highest-scoring squad through clever buying, selling, and bidding wars.

## Features

*   **Multiplayer Support:** Play locally with 1 to 4 players.
*   **Drafting Mechanics:** Make "Keep or Sell" decisions on your starting squad to build your budget.
*   **Dynamic Market:** Purchase new players from a randomized market pool for each position.
*   **Bidding Wars:** If multiple players target the same asset, a live bidding war resolves the conflict.
*   **Mid-Season Twists:** "Twist Cards" inject random events and financial boosts/penalties to keep the game unpredictable.
*   **Scoring System:** Final standings are calculated based on squad ratings, manager bonuses, and remaining budget.

## Tech Stack

*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion
*   **Language:** TypeScript

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/adam5621/rebuild-game.git
    cd rebuild-game
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in browser:**
    Navigate to `http://localhost:5173` (or the port provided in your terminal).

## Build for Production

```bash
npm run build
```
This will compile the TypeScript and output the optimized static files to the `dist/` directory.