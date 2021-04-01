import { TextStyle } from 'pixi.js';
declare const colors: {
    text: {
        title: number;
        normal: number;
        link: number;
        accent: number;
    };
    controls: {
        button: {
            border: number;
            background: {
                color: number;
                alpha: number;
            };
            hover: {
                color: number;
                alpha: number;
            };
            active: {
                color: number;
                alpha: number;
            };
        };
        checkbox: {
            foreground: {
                color: number;
            };
            background: {
                color: number;
                alpha: number;
            };
            checkmark: {
                color: number;
                alpha: number;
            };
            hover: {
                color: number;
                alpha: number;
            };
        };
        enable: {
            text: {
                color: number;
            };
            hover: {
                color: number;
            };
            active: {
                color: number;
            };
        };
        panel: {
            background: {
                color: number;
                alpha: number;
                border: number;
            };
        };
        slider: {
            slidebar: {
                color: number;
                p0: number;
                p1: number;
                p2: number;
                p3: number;
            };
            button: {
                color: number;
                p0: number;
                p1: number;
                p2: number;
                p3: number;
            };
            hover: {
                color: number;
                p0: number;
                p1: number;
                p2: number;
                p3: number;
            };
            value: {
                color: number;
                p0: number;
                p1: number;
                p2: number;
                p3: number;
            };
        };
        slot: {
            hover: {
                color: number;
            };
        };
        switch: {
            background: {
                color: number;
                p0: number;
                p1: number;
                p2: number;
                p3: number;
            };
            hover: {
                color: number;
                p0: number;
                p1: number;
                p2: number;
                p3: number;
            };
            line: {
                color: number;
                p0: number;
                p1: number;
                p2: number;
                p3: number;
            };
        };
        textbox: {
            foreground: {
                color: number;
            };
            background: {
                color: number;
                alpha: number;
            };
            active: {
                color: number;
                alpha: number;
            };
        };
    };
    dialog: {
        background: {
            color: number;
            alpha: number;
            border: number;
        };
        line: {
            background: {
                color: number;
                alpha: number;
                border: number;
            };
        };
    };
    editor: {
        sprite: {
            background: {
                color: number;
                alpha: number;
            };
        };
    };
    quickbar: {
        background: {
            color: number;
            alpha: number;
            border: number;
        };
    };
};
declare const styles: {
    controls: {
        checkbox: TextStyle;
        enable: {
            text: TextStyle;
            hover: TextStyle;
            active: TextStyle;
        };
        textbox: TextStyle;
    };
    dialog: {
        title: TextStyle;
        label: TextStyle;
    };
    icon: {
        amount: TextStyle;
    };
    debug: {
        text: TextStyle;
    };
};
export { colors, styles };
