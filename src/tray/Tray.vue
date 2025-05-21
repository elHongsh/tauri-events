<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import * as definition from './tray.definition.ts';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

// 외부 클릭 감지를 위한 이벤트 핸들러
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const trayWrapper = document.querySelector('.tray-view-wrapper');
  
  if (trayWrapper && !trayWrapper.contains(target)) {
    closeTray();
  }
}

// ESC 키 이벤트 핸들러
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeTray();
  }
}

onMounted(() => {
  // 외부 클릭 이벤트 리스너 등록
  setTimeout(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
  }, 100);
  
  // 트레이 웹뷰가 마운트되면 자동으로 포커스
  setTimeout(() => {
    const trayWrapper = document.querySelector('.tray-view-wrapper');
    if (trayWrapper) {
      (trayWrapper as HTMLElement).focus();
      // 포커스 스타일 제거
      (trayWrapper as HTMLElement).blur();
      (trayWrapper as HTMLElement).focus();
    }
  }, 50);
});

onUnmounted(() => {
  // 이벤트 리스너 제거
  document.removeEventListener('mousedown', handleClickOutside);
  document.removeEventListener('keydown', handleKeyDown);
});

// 트레이 웹뷰 닫기
async function closeTray() {
  try {
    const currentWindow = await WebviewWindow.getByLabel(definition.TRAY_WINDOW_NAME);
    if (currentWindow) {
      await currentWindow.close();
    }
  } catch (error) {
    console.error('Error closing tray window:', error);
    window.close();
  }
}
</script>

<template>
  <div class="tray-view-wrapper" tabindex="0">
    <div class="tray-header">
      <div class="tray-title">Tauri Events</div>
      <button class="close-button" @click.stop="closeTray">×</button>
    </div>
    <div id="tray-content" class="tray-content">
      <div class="tray-item">설정</div>
      <div class="tray-item">도움말</div>
    </div>
    <div class="tray-footer">
      <span class="version">v0.1.0</span>
    </div>
  </div>
</template>

<style>
.tray-view-wrapper {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  outline: none;
}

.tray-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #014192;
  border-radius: 8px 8px 0 0;
  flex-shrink: 0;
}

.tray-title {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #ffffff;
  cursor: pointer;
  padding: 0 4px;
  line-height: 1;
  outline: none;
}

.close-button:hover {
  color: #ff4444;
}

.tray-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  outline: none;
  padding: 4px 0;
}

.tray-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
  outline: none;
  user-select: none;
}

.tray-item:hover {
  background-color: #BCD8EC;
}

.tray-footer {
  padding: 8px 16px;
  border-top: 1px solid #eee;
  text-align: right;
  flex-shrink: 0;
}

.version {
  color: #666;
  font-size: 12px;
}

/* 스크롤바 스타일링 */
.tray-content::-webkit-scrollbar {
  width: 6px;
}

.tray-content::-webkit-scrollbar-track {
  background: transparent;
}

.tray-content::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.tray-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style> 