import type { RenderComponentProps } from '../../../../models/ComponentProps'
import type { Button } from '../../../../models/Form'

export const ButtonRender = ({ viewEntrie, component, i }: RenderComponentProps<Button>) => {
    return (
        <div style={{ marginBottom: i !== viewEntrie.components.length - 1 ? "7px" : "0px" }}>
            <div className="pe-button pe-button__primary pe-button__full-width">
                <button>
                    <span className="pe-button__text">{String(component.data.text || "‎")}</span>
                </button>
                {(i !== viewEntrie.components.length - 1) && <br />}
            </div>
        </div>
    )
}
