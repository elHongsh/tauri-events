export class TauriWindowOptions {
    constructor(
        // Show title bar
        public readonly decorations: boolean,
        // Use transparent background
        public readonly transparent: boolean,
        // Always on top
        public readonly alwaysOnTop: boolean,
        // Show in taskbar
        public readonly skipTaskbar: boolean,
        // Set center the window
        public readonly center: boolean,
    ) {
    }
}

export class TauriWindowSizeOptions {
    constructor(
        public readonly minimizable: boolean,
        public readonly maximizable: boolean,
        public readonly resizable: boolean,
        public readonly fullscreen: boolean,
    ) {
    }
}

export class TauriWindowDefinition {
    constructor(
        public readonly windowName: string,
        public readonly title: string,
        public readonly htmlResourcePath: string,
        public readonly size: { width: number; height: number },
        public readonly position: { x: number; y: number },
        public readonly windowOptions: TauriWindowOptions,
        public readonly sizeOptions: TauriWindowSizeOptions,
    ) {
    }

    toWebViewParameter() {
        return {
            title: this.title,
            url: this.htmlResourcePath,
            width: this.size.width,
            height: this.size.height,
            x: this.position.x,
            y: this.position.y,
            decorations: this.windowOptions.decorations,
            transparent: this.windowOptions.transparent,
            alwaysOnTop: this.windowOptions.alwaysOnTop,
            skipTaskbar: this.windowOptions.skipTaskbar,
            center: this.windowOptions.center,
            resizable: this.sizeOptions.resizable,
            // minimizable: this.sizeOptions.minimizable,
            // maximizable: this.sizeOptions.maximizable,
            fullscreen: this.sizeOptions.fullscreen,
        }
    }
}