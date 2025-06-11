import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const checkTime = () => {
    const hour = new Date().getHours();
    // Modo claro entre 7am y 7pm
    return hour >= 7 && hour < 19 ? 'light' : 'dark';
  };

  useEffect(() => {
    // Primero verificar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Si no hay preferencia, usar la hora del día
      setTheme(checkTime());
    }

    // Actualizar tema cada hora
    const interval = setInterval(() => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme(checkTime());
      }
    }, 3600000); // Verificar cada hora

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
};
