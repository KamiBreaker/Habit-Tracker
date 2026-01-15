# Habit Quest: React Native Journey 📱⚔️

Welcome to your **React Native Learning Path**! This project, "Habit Quest," is designed to take you from a complete beginner to building a functional, gamified habit tracker mobile app.

This README serves as your curriculum and field guide.

---

## 🗺️ The Roadmap

### 1. Environment Setup 🛠️
Before writing code, we need to prepare our digital workshop. We will use **Expo**, the beginner-friendly framework for React Native.

**Prerequisites:**
1.  **Node.js (LTS Version):** The engine that runs JavaScript outside the browser.
    *   *Download:* [nodejs.org](https://nodejs.org) (Choose the "LTS" version).
    *   *Verify:* Open your terminal and run `node -v`.
2.  **Code Editor:** VS Code is highly recommended.
    *   *Download:* [code.visualstudio.com](https://code.visualstudio.com).
3.  **Expo Go App:** Download this on your *physical* phone (iOS or Android) to preview your app instantly.

---

### 2. Project Scaffolding 🏗️
We will create a fresh mobile project separate from any web code.

**Terminal Commands:**
```bash
# 1. Open your terminal (Command Prompt or Terminal)
# 2. Navigate to where you keep projects
cd Documents

# 3. Create the new project
npx create-expo-app@latest habit-quest-mobile

# 4. Move into the folder
cd habit-quest-mobile

# 5. Start the development server
npx expo start
```
*Outcome:* You'll see a QR code. Scan it with the **Expo Go** app on your phone to see your "Hello World" app!

---

### 3. Understanding the Structure 📂
Here is how we will organize our Habit Quest logic:

```text
habit-quest-mobile/
├── assets/             # Images, fonts, and icons
├── components/         # Reusable blocks (e.g., <HabitCard />, <Button />)
├── screens/            # Full pages (e.g., Dashboard, Journal)
├── constants/          # Colors, styles, and config strings
├── App.js              # The main entry point (The "Brain" of the app)
└── package.json        # The ID card (lists dependencies like 'react-navigation')
```

---

### 4. Core Concepts & Curriculum 🎓

#### Phase A: The Basics (JSX & Styling)
**Goal:** Create a static "Welcome" screen.
*   **JSX:** HTML-like syntax inside JavaScript. View it as "describing" the UI.
*   **Components:** `View` (like a `div`), `Text` (like `p` or `span`), `Image`.
*   **Styling:** We use `StyleSheet`. It looks like CSS but in camelCase.

**Task:** Edit `App.js` to display "Welcome to Habit Quest".
```javascript
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Quest ⚔️</Text>
      <Text style={styles.subtitle}>Level up your life!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e', // Dark theme
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#e94560',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
});
```

#### Phase B: State & Props (The "Alive" App)
**Goal:** Make a counter that tracks XP (Experience Points).
*   **State (`useState`):** Memory that changes (e.g., current XP).
*   **Props:** Passing data from parent to child components.

**Task:** Add a button to "Complete Habit" and gain XP.
```javascript
import { useState } from 'react';
import { Button, Text, View } from 'react-native';

// Inside App component...
const [xp, setXp] = useState(0);

const gainXp = () => {
  setXp(xp + 10);
};

return (
  <View>
    <Text>Current XP: {xp}</Text>
    <Button title="Complete Task (+10 XP)" onPress={gainXp} />
  </View>
);
```

#### Phase C: Navigation (Moving Around)
**Goal:** Create tabs for "Quests", "Stats", and "Journal".
*   **Library:** React Navigation.
*   **Concept:** A "Navigator" manages the screens.

**Commands to run:**
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
```

#### Phase D: Lists & Data
**Goal:** Display a list of habits.
*   **Component:** `FlatList` (Efficiently renders scrolling lists).
*   **Task:** Render an array of habit objects.

---

### 5. Best Practices & Next Steps 🚀
*   **Clean Code:** Keep `App.js` clean. Move code into `screens/Dashboard.js` etc.
*   **Testing:** Manually test on both Android and iOS if possible.
*   **Debugging:** Shake your phone to open the Developer Menu in Expo Go. Use "Debug Remote JS" to see `console.log` on your computer.

### Ready to start?
Open your terminal and run `npx create-expo-app@latest habit-quest-mobile` to begin your journey!