import { useMemo, useState } from "react"
import styles from './styles.module.css';
type Attachment = {
    type: 'tool' | 'file',
    symbol: string,
    label: string,
    value: string
}

type AttachmentSetter = React.Dispatch<React.SetStateAction<Attachment[]>>

type CoreInputProps = {
    onSend: (value: string, attachments: Attachment[]) => void;
    attachmentRender: (value: string, onSelect: (attactment: Attachment) => void) => JSX.Element;
    attachmentDisplayer: (attachments: Attachment[], setAttachments: AttachmentSetter) => JSX.Element;
    attachmentHandler?: (attactment: Attachment, setAttachments: AttachmentSetter) => void;
}

const CoreInput = ({
    onSend, attachmentRender, attachmentDisplayer, attachmentHandler
}: CoreInputProps) => {
    const [value, setValue] = useState('');
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    return <>
        <div>
            {
                attachmentDisplayer(attachments, setAttachments)
            }
        </div>
        <div>
            <input className={styles.input} type="text" value={value} onChange={e => setValue(e.target.value)} />
            <button className={styles.sendBtn} onClick={() => onSend(value, attachments)}>Send</button>
        </div>
        <div>
            {attachmentRender(value, attactment => {
                if (attachmentHandler) {
                    attachmentHandler(attactment, setAttachments);
                    return;
                }
                setAttachments([...attachments, attactment])
            })}
        </div>
    </>
}

const attachments: Attachment[] = [
    {
        type: 'tool',
        symbol: '@',
        label: 'tool 1',
        value: 'tool1'
    }, {
        type: 'tool',
        symbol: '@',
        label: 'tool 2',
        value: 'tool2'
    }, {
        type: 'file',
        symbol: '#',
        label: 'file 1',
        value: 'file1'
    },
]
export default function AIInput() {
    const groupedAttachments = useMemo(() => {
        // @ts-ignore
        return Object.groupBy(attachments, ({ type }) => type) as Record<Attachment['type'], Attachment[]>;
    }, [attachments])
    const [activedKey, setActivedKey] = useState<Attachment['type']>(undefined);

    return <CoreInput
        onSend={(...props) => {
            alert('Open the console log to view the result');
            console.log(props)
        }}
        attachmentHandler={(attactment, setAttachments) => {
            setAttachments(prev => {
                if (prev.find(a => a.value === attactment.value)) {
                    return prev.filter(a => a.value !== attactment.value)
                }
                return [...prev, attactment]
            })
        }}
        attachmentRender={(value, onSelect) => {
            return <div className={styles.attachmentGroup}>
                {
                    Object.entries(groupedAttachments).map(([key, value]) => {
                        return <span className={styles.attachment} key={key} onClick={() => {
                            setActivedKey(key as Attachment['type'])
                        }}>
                            {groupedAttachments[key][0].symbol}
                        </span>
                    })
                }
                {
                    activedKey && <div className={styles.attachmentListContainer}>
                        {
                            groupedAttachments[activedKey].map(attachment => {
                                return <span onClick={() => {
                                    onSelect(attachment)
                                }} key={attachment.value}>{attachment.label}</span>
                            })
                        }
                    </div>
                }
            </div>
        }}
        attachmentDisplayer={(attactments, setAttachments) => {
            return <div className={styles.attachmentGroup}>
                {attactments.map(attachment => {
                    return <span className={styles.attachment} style={{ backgroundColor: 'lightgreen' }} key={attachment.value} onClick={() => {
                        setAttachments(prev => prev.filter(a => a.value !== attachment.value))
                    }}>{attachment.label}</span>
                })}
            </div>
        }}
    />
}