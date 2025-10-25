
import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-dark-card p-6 rounded-lg shadow-md border border-transparent dark:border-gray-700/50 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
