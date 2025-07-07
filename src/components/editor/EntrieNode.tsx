import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import type { EntryTypes } from '../../models/Form';

export type EntrieNode = Node<
    {
        entry: EntryTypes;
    },
    'entry'
>;

export interface EntryEdge {
    id: string,
    source: string,
    sourceHandle: string,
    target: string,
    targetHandle: string
}

export const EntrieNode = ({ data }: NodeProps<EntrieNode>) => {
    const { entry } = data;

    const renderButtons = () => {
        if (
            entry.type !== 'ActionForm' &&
            entry.type !== 'MessageForm' &&
            entry.type !== 'ModalForm'
        ) return null;

        return entry.components.map((component, i) => {
            if (!component.type.includes('button')) return null;

            const text =
                component.type === 'button' ||
                    component.type === 'button1' ||
                    component.type === 'button2'
                    ? component.data.text
                    : component.type === 'submitButton'
                        ? component.data.submitButton
                        : '';

            return (
                <div key={`${entry.formRef}-btn-${i}`} >
                    <div className="pe-button pe-button__primary pe-button__full-width">
                        <button style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: "10px"
                        }}>
                            <small style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{String(text || '')}</small>

                            <div >
                                <Handle
                                    type="source"
                                    id={`${entry.formRef}:button:${i}`}
                                    position={Position.Right}
                                    style={{ background: '#64d3ff', border: '2px solid #393939', position: "relative", transform: "translateX(0%)" }}
                                />
                            </div>
                        </button>


                    </div>


                </div>
            );
        });
    };

    return (
        <div className={entry.type != "Function" ? "pe-card" : "code-card"}>
            <div className={entry.type != "Function" ? "pe-card__content" : ""}>
                <div className={entry.type != "Function" ? "pe-card__header" : "code-header"}>
                    <h3 className='project-title' style={{ margin: '0 0 5px' }}>{entry.name}</h3>
                </div>

                {
                    entry.type != "Function" ?
                        <label style={{ display: 'block', marginBottom: 10 }}>
                            {entry.formRef} | {entry.type}
                        </label> :
                        <div className="code-params"><label style={{ display: 'block', marginBottom: 10 }}>
                            {entry.formRef} | {entry.type}
                        </label></div>
                }

                {
                    entry.type != "Function" ?
                        <div className="pe-card__body">
                            {renderButtons()}
                        </div> :
                        <div className="code-body">Params: {
                            entry.params.join(", ")
                        }</div>
                }
                
                <Handle
                    type="target"

                    id={`${entry.formRef}:${entry.type}`}
                    position={Position.Left}
                    style={entry.type != "Function" ? { background: '#64d3ff', border: '2px solid #393939' } : {
                        background: '#64d3ff', border: '2px solid #a0a0c0'
                    }}
                />
            </div>
        </div>
    );
};
