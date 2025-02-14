import AIInput from "./ai-input";
import AIOutput from "./ai-output";
import useAI from "../hooks/use-ai";
import styles from './styles.module.css';
export default function AI() {
    const { messages, setMessages, loading, setLoading } = useAI();

    const handleSend = async (value: string, attachments: []) => {
        if (loading || !value) return;

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setMessages(
                [...messages,
                { role: 'user', content: value },
                { role: 'assistant', content: value }
                ]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return <div className={styles.aiInputContainer}>
        <AIOutput messages={messages} />
        {
            loading ? <div>loading...</div> : null
        }
        <AIInput onSend={handleSend} />
    </div>
}