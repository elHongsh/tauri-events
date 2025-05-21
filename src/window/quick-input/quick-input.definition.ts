import {TauriWindowDefinition} from "../window.definition.ts";

const QUICK_INPUT_WINDOW_NAME = 'quick-input';
const QUICK_INPUT_WINDOT_TITLE = 'Quick Input';
const QUICK_INPUT_HTML_URL = '/src/window/quick-input/quick-input.html';

export class QuickInputTauriWindowDefinition extends TauriWindowDefinition {}

export const quickInput = new QuickInputTauriWindowDefinition(
    QUICK_INPUT_WINDOW_NAME,
    QUICK_INPUT_WINDOT_TITLE,
    QUICK_INPUT_HTML_URL,
    {
        width: 600,
        height: 100
    },
    {
        // Center horizontally
        x: Math.round((window.screen.width - 600) / 2),
        // Position near the bottom of the screen
        y: window.screen.height - 100
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
        resizable: false,
        fullscreen: false,
    }
);