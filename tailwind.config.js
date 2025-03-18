export default {
    content: ['node_modules/aio-modal/**/*.*'],
    prefix: '',
    theme: {
        extend: {
            animation: {
                'typing-infinite': 'typing 6s steps(24) infinite',
            },
            keyframes: {
                typing: {
                    '0%': { width: '0' },
                    '50%': { width: '390px' },
                    '55%': { width: '390px' }, // Pause at full width
                    '75%': { width: '0' },
                    '85%': { width: '0' }, // Pause before restarting
                    '100%': { width: '0' }
                }
            }
        },
    },
    plugins: [],
}
