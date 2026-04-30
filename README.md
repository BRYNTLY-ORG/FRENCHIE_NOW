# Canine Genetics & Market Application

This is a Next.js application designed for managing and analyzing canine genetics, breeding, and market data. It provides tools and insights for breeders and enthusiasts, leveraging modern web technologies.

## Features

*   **DNA Analysis (`/dna`):** Visualize and analyze genetic traits, including a custom DNA diagram component.
*   **Breeding Planner (`/breeding`):** Tools for planning and simulating breeding outcomes.
*   **Marketplace (`/market`):** Browse and analyze market trends and data for canines.
*   **Recommendations (`/recommend`):** Get recommendations based on genetic and market data.
*   **Responsive UI:** Built with shadcn/ui and Tailwind CSS for a modern and adaptive user experience.
*   **Theming:** Supports light and dark modes via `next-themes`.

## Technologies Used

*   **Framework:** Next.js 16.1.7 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, shadcn/ui
*   **UI Components:** shadcn/ui
*   **Animations:** Framer Motion
*   **Charting:** Recharts
*   **State Management:** React 19
*   **Theme Management:** Next-themes

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have Node.js (v18 or higher) and Bun (or npm/yarn) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd next-app # Assuming the project directory is 'next-app' based on package.json
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    # or npm install
    ```

### Running the Development Server

To start the development server:

```bash
bun run dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Adding shadcn/ui components

To add new components from shadcn/ui to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the UI components in the `components/ui` directory, as configured in `components.json`.

## Using shadcn/ui components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
