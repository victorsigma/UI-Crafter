import type { RenderComponentProps } from '../../../../models/ComponentProps'
import type { Text } from '../../../../models/Form'

export const LabelRender = ({ viewEntrie, component, i }: RenderComponentProps<Text>) => {
    return (
        <div key={"label" + i} style={{ marginBottom: i !== viewEntrie.components.length - 1 ? "7px" : "0px" }}>
            <label className="pe-label">{String(component.data.text || "")}</label>
            {(i !== viewEntrie.components.length - 1) && <br />}
        </div>
    )
}