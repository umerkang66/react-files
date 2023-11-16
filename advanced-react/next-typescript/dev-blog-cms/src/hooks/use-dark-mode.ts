import { useEffect, useState } from 'react';

const THEME_LS = 'theme_ls';
const lightTheme = 'light';
const darkTheme = 'dark';

export function useDarkMode() {
  const storeThemeToLocalStorage = (theme: string) => {
    localStorage.setItem(THEME_LS, theme);
  };

  const getThemeFromLocalStorage = () => {
    return localStorage.getItem(THEME_LS);
  };

  const updateTheme = (newTheme: string, previousTheme?: string | null) => {
    const { classList } = document.documentElement; // html element

    if (previousTheme) classList.remove(previousTheme);
    classList.add(newTheme);
  };

  const toggleTheme = () => {
    const previousTheme = getThemeFromLocalStorage();
    const newTheme = previousTheme === lightTheme ? darkTheme : lightTheme;

    updateTheme(newTheme, previousTheme);
    storeThemeToLocalStorage(newTheme);
  };

  useEffect(() => {
    const oldTheme = getThemeFromLocalStorage();
    if (oldTheme) return updateTheme(oldTheme);

    // if old theme doesn't available, use the default theme of browser or computer
    const runningOnDarkMode = window.matchMedia(
      '(prefers-color-scheme:dark)',
    ).matches;

    if (runningOnDarkMode) {
      updateTheme(darkTheme);
      storeThemeToLocalStorage(darkTheme);
    } else {
      updateTheme(lightTheme);
      storeThemeToLocalStorage(lightTheme);
    }
  }, []);

  return { toggleTheme };
}
