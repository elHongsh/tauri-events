import { TrayIcon } from '@tauri-apps/api/tray';
import { Menu } from '@tauri-apps/api/menu';
import { Window } from '@tauri-apps/api/window';
import { defaultWindowIcon } from '@tauri-apps/api/app';

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

    // 메뉴 생성
    const menu = await Menu.new({
      items: [
        {
          id: 'show',
          text: 'Show Window',
          action: async () => {
            const window = Window.getCurrent();
            await window.show();
            await window.setFocus();
          }
        },
        {
          id: 'hide',
          text: 'Hide Window',
          action: async () => {
            const window = Window.getCurrent();
            await window.hide();
          }
        },
        {
          id: 'quit',
          text: 'Quit',
          action: async () => {
            const window = Window.getCurrent();
            await window.close();
          }
        }
      ]
    });

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
      menu,
      action: (event) => {
        switch (event.type) {
          case 'Click':
            console.log(`Mouse ${event.button} button clicked, state: ${event.buttonState}`);
            break;
          case 'DoubleClick':
            console.log(`Mouse ${event.button} button double clicked`);
            break;
          case 'Enter':
            break;
          case 'Move':
            break;
          case 'Leave':
            break;
        }
      }
    });

    console.log('Tray icon created successfully.');

  } catch (error) {
    console.error('Failed to setup tray:', error);
  }
} 