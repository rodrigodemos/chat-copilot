import {
    BrandVariants,
    GriffelStyle,
    Theme,
    createDarkTheme,
    createLightTheme,
    makeStyles,
    shorthands,
    themeToTokensObject,
    tokens,
} from '@fluentui/react-components';

export const semanticKernelBrandRamp: BrandVariants = {
    10: '#020308',
    20: '#0F1B2D',
    30: '#1E2F47',
    40: '#2B4062',
    50: '#38517D',
    60: '#456299',
    70: '#5373B5',
    80: '#6084D1',
    90: '#7396EC',
    100: '#88A6F0',
    110: '#9EB6F3',
    120: '#B4C6F6',
    130: '#CAD6F9',
    140: '#E0E6FB',
    150: '#EFF3FD',
    160: '#F7F9FE',
};

export const semanticKernelLightTheme: Theme & { colorMeBackground: string } = {
    ...createLightTheme(semanticKernelBrandRamp),
    colorMeBackground: '#e8ebf9',
};

export const semanticKernelDarkTheme: Theme & { colorMeBackground: string } = {
    ...createDarkTheme(semanticKernelBrandRamp),
    colorMeBackground: '#2b2b3e',
};

export const customTokens = themeToTokensObject(semanticKernelLightTheme);

export const Breakpoints = {
    small: (style: GriffelStyle): Record<string, GriffelStyle> => {
        return { '@media (max-width: 744px)': style };
    },
};

export const ScrollBarStyles: GriffelStyle = {
    overflowY: 'auto',
    '&:hover': {
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: tokens.colorScrollbarOverlay,
            visibility: 'visible',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: tokens.colorNeutralBackground1,
            WebkitBoxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.1)',
            visibility: 'visible',
        },
    },
};

export const SharedStyles: Record<string, GriffelStyle> = {
    scroll: {
        height: '100%',
        ...ScrollBarStyles,
    },
    overflowEllipsis: {
        ...shorthands.overflow('hidden'),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};

export const useSharedClasses = makeStyles({
    informativeView: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.padding('80px'),
        alignItems: 'center',
        ...shorthands.gap(tokens.spacingVerticalXL),
        marginTop: tokens.spacingVerticalXXXL,
    },
});

export const useDialogClasses = makeStyles({
    surface: {
        paddingRight: tokens.spacingVerticalXS,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.overflow('hidden'),
        width: '100%',
    },
    paragraphs: {
        marginTop: tokens.spacingHorizontalS,
    },
    innerContent: {
        height: '100%',
        ...SharedStyles.scroll,
        paddingRight: tokens.spacingVerticalL,
    },
    text: {
        whiteSpace: 'pre-wrap',
        textOverflow: 'wrap',
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        minWidth: '175px',
    },
});
