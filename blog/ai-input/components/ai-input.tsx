import { useState } from "react"
type Attachment = {
    type: 'tool' | 'file',
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
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
            <button onClick={() => onSend(value, attachments)}>Send</button>
            <span>Open the console log to view the result</span>
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


export default function AIInput() {

    const attachments: Attachment[] = [
        {
            type: 'tool',
            label: 'tool 1',
            value: 'tool1'
        }, {
            type: 'tool',
            label: 'tool 2',
            value: 'tool2'
        }, {
            type: 'file',
            label: 'file 1',
            value: 'file1'
        },
    ]

    return <CoreInput
        onSend={console.log}
        attachmentHandler={(attactment, setAttachments) => {
            setAttachments(prev => {
                if (prev.find(a => a.value === attactment.value)) {
                    return prev.filter(a => a.value !== attactment.value)
                }
                return [...prev, attactment]
            })
        }}
        attachmentRender={(value, onSelect) => {
            return <>
                {
                    attachments.map(attachment => {
                        return <strong onClick={() => {
                            onSelect(attachment)
                        }} key={attachment.value}>{attachment.label}</strong>
                    })

                }
            </>
        }}
        attachmentDisplayer={(attactments, setAttachments) => {
            return <>
                {attactments.map(attachment => {
                    return <span key={attachment.value} onClick={() => {
                        setAttachments(prev => prev.filter(a => a.value !== attachment.value))
                    }}>{attachment.label}</span>
                })}
            </>
        }}
    />
}