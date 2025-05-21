import { createApp } from "vue";
import App from "./App.vue";
import { setupTray } from "./tray/tray";

// 트레이 아이콘 초기화
setupTray().catch((error) => {
  console.error('트레이 초기화 실패:', error);
});

createApp(App).mount("#app");
