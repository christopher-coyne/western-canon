import { AppProvider } from './provider';
import { AppRouter } from './router';

export const MainApp = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};