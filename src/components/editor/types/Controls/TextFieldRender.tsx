import type { RenderComponentProps } from "../../../../models/ComponentProps"
import type { TextField } from "../../../../models/Form"

export const TextFieldRender = ({ viewEntrie, component, i }: RenderComponentProps<TextField>) => {
    return (
        <div style={{ marginBottom: i !== viewEntrie.components.length - 1 ? "7px" : "0px" }}>
            <div style={{ marginBottom: "10px" }}>
                <label className="pe-label">{String(component.data.label || "")}</label>
            </div>
            <div className="pe-input" >
                <input type="text" readOnly={true} className="pe-input" placeholder={String(component.data.placeholderText || "")} value={String(component.data.textFieldOptions?.defaultValue || "")} />
            </div>
        </div>
    )
}
