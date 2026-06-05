'use client';

import { useEffect } from 'react';

export default function ScrollToHash() {
    useEffect(() => {
        // Function to perform the scroll
        const scroll = () => {
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    // Slight delay to ensure layout is stable
                    setTimeout(() => {
                        element.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        };

        // Run on mount
        scroll();

        // Also listen to hash changes
        window.addEventListener('hashchange', scroll);
        return () => window.removeEventListener('hashchange', scroll);
    }, []);

    return null; // This component doesn't render anything
}
