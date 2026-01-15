# HabitQuest

A personal dashboard for tracking habits and daily reflections.

This project is an experiment in combining productivity tools with some light gamification elements. It basically lets you create habits, check them off to gain "XP", and write journal entries that get a simple sentiment score.

The main idea was to make something that looks nice and feels satisfying to use, hence the animations and the "level up" system. It's not a full-blown production app, just a playground for some frontend ideas.

## Getting Started

If you want to run this locally to check it out:

1.  **Clone the repo**
    ```bash
    git clone https://github.com/yourusername/habit-quest.git
    cd habit-quest
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the dev server**
    ```bash
    npm run dev
    ```

## Under the Hood

Built with a standard Vite + React setup.

-   **React** (Context API for state)
-   **Tailwind CSS** for the layout and design
-   **Vite** for the build tooling
-   **framer-motion** for the smooth transitions
-   **sentiment** for the basic text analysis features

Data is currently just persisted to `localStorage`, so it's private to your browser. Clearing your cache will wipe your progress.

Feel free to fork it or look around the code if you're curious.
