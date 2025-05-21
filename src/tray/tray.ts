import { TrayIcon } from '@tauri-apps/api/tray';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { tray } from './tray.definition';

const DEFAULT_TRAY_ICON_ID = 'main-tray';

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

    // 트레이 아이콘 생성
    await TrayIcon.new({
      id: DEFAULT_TRAY_ICON_ID,
      icon,
      tooltip: 'Tauri Tray App',
      action: async (event) => {
        if (event.type === 'Click') {
          // 트레이 아이콘 클릭 시 웹뷰 표시
          const existingWindow = await WebviewWindow.getByLabel(tray.windowName);
          
          if (existingWindow) {
            // 윈도우가 이미 존재하는 경우 닫기
            await existingWindow.close();
          } else {
            // 화면 중앙에 웹뷰 표시
            const newWindow = new WebviewWindow(tray.windowName, {...tray.toWebViewParameter()});

            newWindow.once('tauri://created', () => {
              console.log('Tray view window created');
              // 윈도우가 생성되면 포커스 설정
              newWindow.setFocus();
            });

            newWindow.once('tauri://error', (e) => {
              console.error('Error creating tray view window:', e);
            });
          }
        }
      }
    });

    console.log('Tray icon created successfully.');

  } catch (error) {
    console.error('Failed to setup tray:', error);
  }
} 