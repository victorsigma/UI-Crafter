import { useEffect, useState } from 'react'
import type { RenderComponentProps } from '../../../../models/ComponentProps'
import type { Dropdown } from '../../../../models/Form'

export const DropdownRender = ({ viewEntrie, component, i }: RenderComponentProps<Dropdown>) => {
    const [value, setValue] = useState(component.data.items[component.data.dropdownOptions?.defaultValueIndex ?? 0]);

    useEffect(() => {
        setValue(component.data.items[component.data.dropdownOptions?.defaultValueIndex ?? 0]);
    }, [component.data.dropdownOptions?.defaultValueIndex])

    return (
        <div style={{ marginBottom: i !== viewEntrie.components.length - 1 ? "7px" : "0px" }}>
            <label className="pe-label">{String(component.data.label || "")}</label>
            <br />
            <div className="pe-button pe-select">
                <select name="" id="" className="pe-select__full-width" value={
                    String(value)
                } onChange={(e) => {
                    setValue(e.target.value)
                }}>
                    {
                        component.data.items.map((item, j) => {
                            return (
                                <option key={"dropdown" + i + "-item" + j} defaultValue={String(item)}>{String(item)}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}
