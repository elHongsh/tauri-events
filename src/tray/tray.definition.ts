import { TauriWindowDefinition } from '../window/window.definition';

export const TRAY_WINDOW_NAME = 'tray';
export const TRAY_WINDOW_TITLE = 'Tray View';
export const TRAY_HTML_URL = 'src/tray/tray.html';

// 작업 표시줄 높이 (Windows 기준)
const TASKBAR_HEIGHT = 40;

export const tray = new TauriWindowDefinition(
    TRAY_WINDOW_NAME,
    TRAY_WINDOW_TITLE,
    TRAY_HTML_URL,
    {
        width: 250,  // 너비 증가
        height: 200  // 높이 증가
    },
    {
        // 화면 우측 하단에서 작업 표시줄 높이만큼 위로 올림
        x: window.screen.width - 270, // 여백 20px
        y: window.screen.height - 220 - TASKBAR_HEIGHT // 여백 20px + 작업 표시줄 높이
    },
    {
        decorations: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        center: false,
    },
    {
        minimizable: false,
        maximizable: false,
        resizable: true,  // 크기 조절 가능하도록 변경
        fullscreen: false,
    }
); 