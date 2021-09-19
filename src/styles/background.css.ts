import {styleVariants, style} from '@vanilla-extract/css';
import {vars} from './global.css';
import {formattedFont} from './typography.css';

export const backgroundVariant = styleVariants<any>({
  mega: {background: vars.colors.mega},
  good: {background: vars.colors.good},
  medium: {background: vars.colors.medium},
  bad: {background: vars.colors.bad},
});

export const wrapper = style({
  display: 'grid',
  height: '100vh',
});

export const backgroundContainer = style({
  height: '100%',
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

export const mainBackground = style({
  position: 'relative',
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  height: 300,
  width: '100%',
  padding: '2.5rem 5rem',

  '@media': {
    'screen and (max-width: 768px)': {
      padding: '0 1rem',
    },
  },
});

export const buttonBackground = style({
  display: 'flex',
  padding: '2rem 0',
  ...formattedFont,

  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
});
