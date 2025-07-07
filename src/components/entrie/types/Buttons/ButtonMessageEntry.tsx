import type { EntryComponentProps } from "../../../../models/ComponentProps";
import type { ButtonMessage, EntryTypesForms } from "../../../../models/Form";

export const ButtonMessageEntry = ({ selectEntrie, updateEntrie, updateComponent, setUpdateComponent, setUpdateEntrie }: EntryComponentProps<ButtonMessage>) => {
    return (
        <form className="project-element__explorer-form">
            <div style={{ paddingBottom: "2px" }} className="project-label">
                <label className="project-label">Button {updateComponent.type == "button1" ? "1" : "2"} Component</label>
            </div>
            <div style={{ paddingBlock: "2px" }}>
                <label className="project-label">Text</label>
                <input className="project-input__text" type="text" value={String(updateComponent.data.text || "")} onChange={(e) => {
                    if ((updateComponent?.type === "button1" || updateComponent?.type === "button2") && updateEntrie && selectEntrie?.component != null) {
                        const newComponent = { ...updateComponent, data: { ...updateComponent.data, text: e.target.value } };
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
