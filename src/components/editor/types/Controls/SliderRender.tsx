import type { RenderComponentProps } from '../../../../models/ComponentProps'
import type { Slider } from '../../../../models/Form'

export const SliderRender = ({ viewEntrie, component, i }: RenderComponentProps<Slider>) => {
    return (
        <div style={{ marginBottom: i !== viewEntrie.components.length - 1 ? "7px" : "0px" }}>
            <label className="pe-label" id="pe-slider-text">
                {
                    (component.data.label != "") && `${component.data.label}: ${component.data.sliderOptions?.defaultValue == undefined ? "0" : component.data.sliderOptions?.defaultValue}`
                }
            </label>
            <br />
            <div className="pe-input-range" style={{ display: "flex", alignItems: "center" }}>
                <input type="range" readOnly={true} value={`${component.data.sliderOptions?.defaultValue == undefined ? "0" : component.data.sliderOptions?.defaultValue}`} min={component.data.minimumValue} max={component.data.maximumValue} id="pe-slider" />
            </div>
        </div>
    )
}
