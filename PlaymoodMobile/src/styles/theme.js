import { createContext } from 'react';

const ThemeContext = createContext({
  colors: {
    background: '#000000',
    primary: '#541011', // Based on the web app's red color
    secondary: '#8c0734',
    text: '#ffffff',
    textSecondary: '#cccccc',
    cardBackground: 'rgba(255, 255, 255, 0.1)',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
});

export default ThemeContext;
