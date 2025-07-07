import type { EntryTypesForms } from '../../../../models/Form';

interface ButtonMessageRenderProps {
    viewEntrie: EntryTypesForms
    index: number
    type?: "button1" | "button2"
}

export const ButtonMessageRender = ({ index, viewEntrie, type = "button1" }: ButtonMessageRenderProps) => {
    const text = (index > -1 && viewEntrie?.components[index]?.type === type) ? viewEntrie?.components[index].data.text || "‎" : "‎";
    return (
        <div style={{ marginTop: "7px" }}>
            <div className="pe-button pe-button__primary pe-button__full-width">
                <button><span className="pe-button__text">{String(text)}</span></button>
            </div>
        </div>
    );
}
