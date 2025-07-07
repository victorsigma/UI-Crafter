import type { EntryComponentProps } from "../../../../models/ComponentProps";
import type { EntryTypesForms, Toggle } from "../../../../models/Form";

export const ToggleEntry = ({ selectEntrie, updateEntrie, updateComponent, setUpdateComponent, setUpdateEntrie }: EntryComponentProps<Toggle>) => {
    return (
        <form className="project-element__explorer-form">
            <div style={{ paddingBottom: "2px" }} className="project-label">
                <label className="project-label">Toggle Component</label>
            </div>
            <div style={{ paddingBlock: "2px" }}>
                <label className="project-label">Label</label>
                <input className="project-input__text" type="text" value={String(updateComponent.data.label || "")} onChange={(e) => {
                    if (updateComponent?.type === "toggle" && updateEntrie && selectEntrie?.component != null) {
                        const newComponent = { ...updateComponent, data: { ...updateComponent.data, label: e.target.value } };
                        setUpdateComponent(newComponent);

                        const components = [...(updateEntrie as EntryTypesForms).components];
                        components[selectEntrie.component] = newComponent;

                        const newEntrie = { ...updateEntrie, components } as EntryTypesForms;
                        setUpdateEntrie(newEntrie);
                    }
                }} />
            </div>
        </form>
    )
}
