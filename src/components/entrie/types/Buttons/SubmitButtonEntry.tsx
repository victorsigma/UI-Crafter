import type { EntryComponentProps } from '../../../../models/ComponentProps';
import type { EntryTypesForms, SubmitButton } from '../../../../models/Form';

export const SubmitButtonEntry = ({ selectEntrie, updateEntrie, updateComponent, setUpdateComponent, setUpdateEntrie }: EntryComponentProps<SubmitButton>) => {
    return (
        <form className="project-element__explorer-form">
            <div style={{ paddingBottom: "2px" }} className="project-label">
                <label className="project-label">Submit Button Component</label>
            </div>
            <div style={{ paddingBlock: "2px" }}>
                <label className="project-label">Text</label>
                <input className="project-input__text" type="text" value={String(updateComponent.data.submitButton || "")} onChange={(e) => {
                    if (updateComponent?.type === "submitButton" && updateEntrie && selectEntrie?.component != null) {
                        const newComponent = { ...updateComponent, data: { ...updateComponent.data, submitButton: e.target.value } };
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
