import type { EntryComponentProps } from '../../../../models/ComponentProps'
import type { EntryTypesForms, TextField } from '../../../../models/Form'

export const TextFieldEntry = ({ selectEntrie, updateEntrie, updateComponent, setUpdateComponent, setUpdateEntrie }: EntryComponentProps<TextField>) => {
    return (
        <>
            <form className="project-element__explorer-form">
                <div style={{ paddingBottom: "2px" }} className="project-label">
                    <label className="project-label">Text Field Component</label>
                </div>
                <div>
                    <label className="project-label">Label</label>
                    <input className="project-input__text" type="text" value={String(updateComponent.data.label || "")} onChange={(e) => {
                        if (updateComponent?.type === "textField" && updateEntrie && selectEntrie?.component != null) {
                            const newComponent = { ...updateComponent, data: { ...updateComponent.data, label: e.target.value } };
                            setUpdateComponent(newComponent);

                            const components = [...(updateEntrie as EntryTypesForms).components];
                            components[selectEntrie.component] = newComponent;

                            const newEntrie = { ...updateEntrie, components } as EntryTypesForms;
                            setUpdateEntrie(newEntrie);
                        }
                    }} />
                </div>
                <div>
                    <label className="project-label">Placeholder</label>
                    <input className="project-input__text" type="text" value={String(updateComponent.data.placeholderText || "")} onChange={(e) => {
                        if (updateComponent?.type === "textField" && updateEntrie && selectEntrie?.component != null) {
                            const newComponent = { ...updateComponent, data: { ...updateComponent.data, placeholderText: e.target.value } };
                            setUpdateComponent(newComponent);

                            const components = [...(updateEntrie as EntryTypesForms).components];
                            components[selectEntrie.component] = newComponent;

                            const newEntrie = { ...updateEntrie, components } as EntryTypesForms;
                            setUpdateEntrie(newEntrie);
                        }
                    }} />
                </div>
            </form>
            <form className="project-element__explorer-form">
                <div style={{ paddingBottom: "2px" }} className="project-label">
                    <label className="project-label">Text Field Options</label>
                </div>
                <div style={{ paddingBlock: "2px" }}>
                    <label className="project-label">Default Value</label>
                    <input className="project-input__text" type="text" value={String(updateComponent.data.textFieldOptions?.defaultValue || "")} onChange={(e) => {
                        if (updateComponent?.type === "textField" && updateEntrie && selectEntrie?.component != null) {
                            const newComponent = { ...updateComponent, data: { ...updateComponent.data, textFieldOptions: { ...updateComponent.data.textFieldOptions, defaultValue: e.target.value } } };
                            setUpdateComponent(newComponent);

                            const components = [...(updateEntrie as EntryTypesForms).components];
                            components[selectEntrie.component] = newComponent;

                            const newEntrie = { ...updateEntrie, components } as EntryTypesForms;
                            setUpdateEntrie(newEntrie);
                        }
                    }} />
                </div>
                <hr />
                <div style={{ paddingBlock: "2px" }}>
                    <label className="project-label">Tool Tip</label>
                    <input className="project-input__text" type="text" value={String(updateComponent.data.textFieldOptions?.tooltip || "")} onChange={(e) => {
                        if (updateComponent?.type === "textField" && updateEntrie && selectEntrie?.component != null) {
                            const newComponent = { ...updateComponent, data: { ...updateComponent.data, textFieldOptions: { ...updateComponent.data.textFieldOptions, tooltip: e.target.value } } };
                            setUpdateComponent(newComponent);

                            const components = [...(updateEntrie as EntryTypesForms).components];
                            components[selectEntrie.component] = newComponent;

                            const newEntrie = { ...updateEntrie, components } as EntryTypesForms;
                            setUpdateEntrie(newEntrie);
                        }
                    }} />
                </div>
            </form>
        </>
    )
}
