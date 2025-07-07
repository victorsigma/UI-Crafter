import type { RenderComponentProps } from '../../../../models/ComponentProps'
import type { Toggle } from '../../../../models/Form'

export const ToggleRender = ({ viewEntrie, component, i }: RenderComponentProps<Toggle>) => {
    return (
        <div style={{ marginBottom: i !== viewEntrie.components.length - 1 ? "7px" : "0px" }}>
            <label className="pe-switch">
                <input className="pe-input" type="checkbox" />
                <span className="pe-slider">
                    <div className="pe-switch__decoration">
                        <div className="pe-switch__decoration-body">
                        </div>
                    </div>
                </span>
                <span className="pe-slider__text">
                    {String(component.data.label || "")}
                </span>
            </label>
        </div>
    )
}
