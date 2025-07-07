import type { EntryComponentProps } from "../../../../models/ComponentProps";
import type { Button, EntryTypesForms } from "../../../../models/Form";

export const ButtonEntry = ({ selectEntrie, updateEntrie, updateComponent, setUpdateComponent, setUpdateEntrie }: EntryComponentProps<Button>) => {
    return (
        <form className="project-element__explorer-form">
            <div style={{ paddingBottom: "2px" }} className="project-label">
                <label className="project-label">Button Component</label>
            </div>
            <div style={{ paddingBlock: "2px" }}>
                <label className="project-label">Text</label>
                <input className="project-input__text" type="text" value={String(updateComponent.data.text || "")} onChange={(e) => {
                    if (updateComponent?.type === "button" && updateEntrie && selectEntrie?.component != null) {
                        const newComponent = { ...updateComponent, data: { ...updateComponent.data, text: e.target.value } };
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
                <label className="project-label">Icon Path</label>
                <input className="project-input__text" type="text" value={updateComponent.data.iconPath || ""} onChange={(e) => {
                    if (updateComponent?.type === "button" && updateEntrie && selectEntrie?.component != null) {
                        const newComponent = { ...updateComponent, data: { ...updateComponent.data, iconPath: e.target.value } };
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
