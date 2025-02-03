import { createFont } from "tamagui";

const aileronFace = {
    100: { normal: 'Aileron-UltraLight', italic: 'Aileron UltraLight Italic' },
    200: { normal: 'Aileron-Thin', italic: 'Aileron Thin Italic' },
    300: { normal: 'Aileron-Light', italic: 'Aileron Light Italic' },
    400: { normal: 'Aileron-Regular', italic: 'Aileron Italic'} ,
    500: { normal: 'Aileron-Regular', italic: 'Aileron Italic' },
    600: { normal: 'Aileron-SemiBold', italic: 'Aileron SemiBold Italic' },
    700: { normal: 'Aileron-Bold', italic: 'Aileron Bold Italic' },
    800: { normal: 'Aileron-Heavy', italic: 'Aileron Heavy Italic' },
    900: { normal: 'Aileron-Black', italic: 'Aileron-BlackItalic' }
};

export const bodyFont = createFont({
    family: "Aileron-Bold",
    size: {
        1: 12,
        2: 14,
        3: 15,    
    },
    lineHeight: {
        1: 17,
        2: 22,
        3: 25
    },
    weight: {
        4: '300',
        6: '600'
    },
    letterSpacing: {
        4: 0,
        8: -1
    },
    face: aileronFace
})

export const headingFont = createFont({
    family: "Aileron-Black",
    size: {
        1: 15,
        2: 17,
        3: 18,    
    },
    lineHeight: {
        1: 20,
        2: 25,
        3: 30
    },
    weight: {
        4: '600',
        6: '900'
    },
    letterSpacing: {
        4: 0,
        8: -1
    },
    face: aileronFace
})