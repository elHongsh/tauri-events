import {TrayIcon} from '@tauri-apps/api/tray';
import {defaultWindowIcon} from '@tauri-apps/api/app';
import {WebviewWindow} from '@tauri-apps/api/webviewWindow';
import {tray} from './tray.definition';

const DEFAULT_TRAY_ICON_ID = 'main-tray';
const DEBOUNCE_DELAY = 100; // 디바운스 지연 시간 (밀리초)

// 간단한 디바운스 함수
function debounce(callback: () => void, delay: number) {
    let timer: number | null = null;
    
    return () => {
        if (timer) clearTimeout(timer);
        timer = window.setTimeout(callback, delay);
    };
}

// 트레이 윈도우 토글 함수
async function toggleTrayWindow() {
    const existingWindow = await WebviewWindow.getByLabel(tray.windowName);

    if (existingWindow) {
        await existingWindow.close();
        return;
    }

    const newWindow = new WebviewWindow(tray.windowName, {...tray.toWebViewParameter()});

    newWindow.once('tauri://created', () => {
        console.log('Tray view window created');
        newWindow.setFocus();
    });

    newWindow.once('tauri://error', (e) => {
        console.error('Error creating tray view window:', e);
    });
}

// 트레이 아이콘 설정
export async function setupTray() {
    try {
        // 이미 트레이 아이콘이 존재하는지 확인
        const existingTray = await TrayIcon.getById(DEFAULT_TRAY_ICON_ID);
        if (existingTray) {
            console.log('Tray icon already exists.');
            return;
        }

        // 기본 윈도우 아이콘을 트레이 아이콘으로 사용
        const icon = await defaultWindowIcon();
        if (!icon) {
            throw new Error('Default window icon not found.');
        }

        // 디바운스된 클릭 함수 생성
        const debouncedClick = debounce(toggleTrayWindow, DEBOUNCE_DELAY);

        // 트레이 아이콘 생성
        await TrayIcon.new({
            id: DEFAULT_TRAY_ICON_ID,
            icon,
            tooltip: 'Tauri Tray App',
            action: async (event) => {
                if (event.type === 'Click') {
                    debouncedClick();
                }
            }
        });

        console.log('Tray icon created successfully.');

    } catch (error) {
        console.error('Failed to setup tray:', error);
    }
} 