import React from 'react';

interface LoadingProps {
    className?: string;
}

const Loading: React.FC<LoadingProps> = ({ className = '' }) => {
    return (
        <div className={`min-h-screen w-full flex items-center justify-center ${className}`}>
            <img
                src="/logo.svg"
                alt="Loading..."
                className="w-16 h-16 animate-pulse scale-350"
            />
        </div>
    );
};

export default Loading;
