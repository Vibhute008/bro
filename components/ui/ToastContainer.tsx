
import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { CheckCircle, XCircle, Info } from './icons';

const Toast: React.FC<{ message: string; type: 'success' | 'error' | 'info' }> = ({ message, type }) => {
    const icons = {
        success: <CheckCircle className="h-5 w-5 text-green-500" />,
        error: <XCircle className="h-5 w-5 text-red-500" />,
        info: <Info className="h-5 w-5 text-blue-500" />,
    };

    const colors = {
        success: 'bg-green-50 border-green-200 dark:bg-green-900/50 dark:border-green-700',
        error: 'bg-red-50 border-red-200 dark:bg-red-900/50 dark:border-red-700',
        info: 'bg-blue-50 border-blue-200 dark:bg-blue-900/50 dark:border-blue-700',
    };

    return (
        <div className={`flex items-center p-4 mb-4 text-sm text-gray-800 dark:text-gray-200 rounded-lg shadow-lg border animate-slide-in ${colors[type]}`}>
            {icons[type]}
            <span className="ml-3">{message}</span>
        </div>
    );
};

const ToastContainer: React.FC = () => {
    const { toasts } = useContext(AppContext);

    return (
        <div className="fixed top-5 right-5 z-[100] w-full max-w-xs">
            {toasts.map((toast) => (
                <Toast key={toast.id} message={toast.message} type={toast.type} />
            ))}
        </div>
    );
};

export default ToastContainer;
