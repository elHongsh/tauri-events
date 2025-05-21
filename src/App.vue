<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {invoke} from "@tauri-apps/api/core";
import {register, unregister, isRegistered} from "@tauri-apps/plugin-global-shortcut";
import {WebviewWindow} from "@tauri-apps/api/webviewWindow";
import {quickInput} from "./window/quick-input/quick-input.definition.ts";

/* Recommend to manage the global-shortcuts in shortcuts.ts */
const OPEN_QUICK_INPUT_SHORTCUT = 'ctrl+shift+e';

const greetMsg = ref("");
const name = ref("");

// Function to create and show the quick input window
async function toggleQuickInput() {
  // Check if the window already exists
  const existingWindow = await WebviewWindow.getByLabel('quick-input');

  if (existingWindow) {
    // If the window exists, use it
    await existingWindow.setFocus();
  } else {
    // Create a new window
    const quickInputWindow = new WebviewWindow(quickInput.windowName, quickInput.toWebViewParameter());

    // Handle window events
    quickInputWindow.once('tauri://created', () => {
      console.log('Quick input window created');
    });

    quickInputWindow.once('tauri://error', (e) => {
      console.error('Error creating quick input window:', e);
    });
  }
}

onMounted(async () => {
  const openQuickInputRegistered = await isRegistered(OPEN_QUICK_INPUT_SHORTCUT);
  if (openQuickInputRegistered === false) await register(OPEN_QUICK_INPUT_SHORTCUT, () => toggleQuickInput());
})

onUnmounted(async () => {
  const openQuickInputRegistered = await isRegistered(OPEN_QUICK_INPUT_SHORTCUT);
  if (openQuickInputRegistered === true) await unregister(OPEN_QUICK_INPUT_SHORTCUT);
})

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", {name: name.value});
}
</script>

<template>
  <main class="container">
    <h1>Welcome to Tauri + Vue</h1>

    <div class="row">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo vite" alt="Vite logo"/>
      </a>
      <a href="https://tauri.app" target="_blank">
        <img src="/tauri.svg" class="logo tauri" alt="Tauri logo"/>
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
      </a>
    </div>
    <p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

    <form class="row" @submit.prevent="greet">
      <input id="greet-input" v-model="name" placeholder="Enter a name..."/>
      <button type="submit">Greet</button>
    </form>
    <p>{{ greetMsg }}</p>

    <div class="shortcut-info">
      <p>Shortcut: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd></p>
    </div>
  </main>
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}

/* Styles for the quick input window are now in QuickInput.vue */

.shortcut-info {
  margin-top: 20px;
  padding: 10px;
  background-color: rgba(57, 108, 216, 0.1);
  border-radius: 4px;
}

.shortcut-info kbd {
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  color: #333;
  display: inline-block;
  font-size: 0.9em;
  line-height: 1;
  padding: 2px 4px;
  margin: 0 2px;
}

@media (prefers-color-scheme: dark) {
  .shortcut-info {
    background-color: rgba(57, 108, 216, 0.2);
  }

  .shortcut-info kbd {
    background-color: #2a2a2a;
    border-color: #444;
    color: #f6f6f6;
  }
}
</style>
<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: #0f0f0f;
  background-color: #f6f6f6;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

.container {
  margin: 0;
  padding-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.75s;
}

.logo.tauri:hover {
  filter: drop-shadow(0 0 2em #24c8db);
}

.row {
  display: flex;
  justify-content: center;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1 {
  text-align: center;
}

input,
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  color: #0f0f0f;
  background-color: #ffffff;
  transition: border-color 0.25s;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

button {
  cursor: pointer;
}

button:hover {
  border-color: #396cd8;
}

button:active {
  border-color: #396cd8;
  background-color: #e8e8e8;
}

input,
button {
  outline: none;
}

#greet-input {
  margin-right: 5px;
}

@media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }

  a:hover {
    color: #24c8db;
  }

  input,
  button {
    color: #ffffff;
    background-color: #0f0f0f98;
  }

  button:active {
    background-color: #0f0f0f69;
  }
}

</style>
