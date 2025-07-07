import type { EntryComponentProps } from '../../../../models/ComponentProps';
import type { EntryTypesForms, Text } from '../../../../models/Form';

export const TextEntry = ({ selectEntrie, updateEntrie, updateComponent, setUpdateComponent, setUpdateEntrie }: EntryComponentProps<Text>) => {
    return (
        <form className="project-element__explorer-form">
            <div style={{ paddingBottom: "2px" }} className="project-label">
                <label className="project-label">Label Component</label>
            </div>
            <div style={{ paddingBlock: "2px" }}>
                <label className="project-label">Text</label>
                <input className="project-input__text" type="text" value={String(updateComponent.data.text || "")} onChange={(e) => {
                    if ((updateComponent?.type === "label" || updateComponent?.type === "header") && updateEntrie && selectEntrie?.component != null) {
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
