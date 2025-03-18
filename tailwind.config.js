export default {
    content: ['node_modules/aio-modal/**/*.*'],
    prefix: '',
    theme: {
        extend: {
            animation: {
                'typing-infinite': 'typing 5s steps(20) infinite, cursor 0.8s step-end infinite',
            },
            keyframes: {
                typing: {
                    '0%': { width: '0' },
                    '45%': { width: '390px' },
                    '55%': { width: '390px' }, // slight pause at full text
                    '70%': { width: '0' },
                    '100%': { width: '0' }
                },
                cursor: {
                    '50%': { 'border-color': 'transparent' }
                }
            }
        },
    },
    plugins: [],
}
