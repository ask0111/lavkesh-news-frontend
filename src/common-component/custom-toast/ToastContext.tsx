import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CiWarning } from 'react-icons/ci';

// Define the types
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  show: boolean;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

// Create Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provide Context
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<Toast>({ show: false, message: '', type: 'info' });

  // Function to show toast
  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'info' });
    }, 3000); // Auto-hide after 3 seconds
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};

// Hook for accessing the toast context
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Component
interface ToastProps {
  message: string;
  type: ToastType;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const typeStyles: Record<ToastType, string> = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded shadow-lg text-white flex items-center space-x-3 ${typeStyles[type]} transition-opacity duration-300`}
    >
      <span className='flex items-center justify-center gap-2'><CiWarning className={`${typeStyles[type]}`} /> {message}</span>
    </div>
  );
};
