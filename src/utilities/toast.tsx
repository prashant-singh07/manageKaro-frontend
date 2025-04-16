import React, {createContext, useContext, useState, ReactNode} from 'react';
import {CustomToastMessage} from '../components';
// import CustomToastMessage from './CustomToastMessage';

interface ToastContextType {
  showToast: (
    message: string,
    description?: string,
    isSuccess?: boolean,
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [toast, setToast] = useState<{
    message: string;
    description?: string;
    isSuccess: boolean;
    visible: boolean;
  }>({message: '', description: '', isSuccess: true, visible: false});

  const showToast = (
    message: string,
    description?: string,
    isSuccess = true,
  ) => {
    setToast({message, description, isSuccess, visible: true});
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {toast.visible && (
        <CustomToastMessage
          message={toast.message}
          description={toast.description}
          isSuccess={toast.isSuccess}
          visible={toast.visible}
          onModalHide={() => setToast({...toast, visible: false})}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
