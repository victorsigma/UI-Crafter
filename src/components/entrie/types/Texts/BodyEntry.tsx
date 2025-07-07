import type { EntryComponentProps } from '../../../../models/ComponentProps';
import type { Body, EntryTypesForms } from '../../../../models/Form';

export const BodyEntry = ({ selectEntrie, updateEntrie, updateComponent, setUpdateComponent, setUpdateEntrie }: EntryComponentProps<Body>) => {
    return (
        <form className="project-element__explorer-form">
            <div style={{ paddingBottom: "2px" }} className="project-label">
                <label className="project-label">Body Component</label>
            </div>
            <div style={{ paddingBlock: "2px" }}>
                <label className="project-label">Body Text</label>
                <textarea
                    className="project-input__text"
                    name="bodyText"
                    id="bodyText"
                    value={String(updateComponent.data.bodyText || "")}
                    onChange={(e) => {
                        if (updateComponent?.type === "body" && updateEntrie && selectEntrie?.component != null) {
                            const newComponent = { ...updateComponent, data: { bodyText: e.target.value } };
                            setUpdateComponent(newComponent);

                            const components = [...(updateEntrie as EntryTypesForms).components];
                            components[selectEntrie.component] = newComponent;

                            const newEntrie = { ...updateEntrie, components } as EntryTypesForms;
                            setUpdateEntrie(newEntrie);
                        }
                    }}
                />
            </div>
        </form>
    )
}
