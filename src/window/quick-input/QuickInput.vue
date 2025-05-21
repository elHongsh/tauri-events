<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import * as definition from './quick-input.definition.ts';

const quickInput = ref("");

// Focus the input when the component is mounted
onMounted(() => {
  setTimeout(() => {
    const inputElement = document.getElementById('quick-input');
    if (inputElement) {
      inputElement.focus();
    }
  }, 50);
});

// Function to handle key presses
async function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' || event.key === 'Enter') {
    // Close the window when Escape or Enter is pressed
    try {
      const currentWindow = await WebviewWindow.getByLabel(definition.quickInput.windowName);
      if (currentWindow) {
        await currentWindow.close();
      } else {
        alert(`No window found with label "${definition.quickInput.windowName}"`);
      }
    } catch (error) {
      alert(error)
      console.error('Error closing window:', error);
      // Fallback to standard window.close()
      window.close();
    }
  }
}
</script>

<template>
  <div class="quick-input-wrapper">
    <input 
      id="quick-input" 
      v-model="quickInput" 
      placeholder="Type something..." 
      @keydown="handleKeyDown"
      autofocus
    />
  </div>
</template>

<style>
:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #0f0f0f;
  background-color: transparent;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  padding: 0;
  background-color: transparent;
}

.quick-input-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  box-sizing: border-box;
}

#quick-input {
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #396cd8;
  background-color: #ffffff;
  color: #0f0f0f;
  box-shadow: 0 0 10px rgba(57, 108, 216, 0.5);
}

@media (prefers-color-scheme: dark) {
  #quick-input {
    background-color: #1f1f1f;
    color: #f6f6f6;
    border-color: #396cd8;
  }
}
</style>
