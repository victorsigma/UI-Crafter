import type { EntryComponentProps } from '../../../../models/ComponentProps';
import type { EntryTypesForms, Slider } from '../../../../models/Form';

export const SliderEntry = ({ selectEntrie, updateEntrie, updateComponent, setUpdateComponent, setUpdateEntrie }: EntryComponentProps<Slider>) => {
    return (
        <>
            <form className="project-element__explorer-form">
                <div style={{ paddingBottom: "2px" }} className="project-label">
                    <label className="project-label">Slider Component</label>
                </div>
                <div style={{ paddingBlock: "2px" }}>
                    <label className="project-label">Label</label>
                    <input className="project-input__text" type="text" value={String(updateComponent.data.label || "")} onChange={(e) => {
                        if (updateComponent?.type === "slider" && updateEntrie && selectEntrie?.component != null) {
                            const newComponent = { ...updateComponent, data: { ...updateComponent.data, label: e.target.value } };
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
                    <label className="project-label">Min</label>
                    <input className="project-input__text" type="number" value={String(updateComponent.data.minimumValue)} onChange={(e) => {
                        if (updateComponent?.type === "slider" && updateEntrie && selectEntrie?.component != null) {
                            if (Number(e.target.value) < 0) return
                            if (Number(e.target.value) >= updateComponent.data.maximumValue) return;
                            const newComponent = { ...updateComponent, data: { ...updateComponent.data, minimumValue: Number(e.target.value) } };
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
                    <label className="project-label">Max</label>
                    <input className="project-input__text" type="number" value={String(updateComponent.data.maximumValue)} onChange={(e) => {
                        if (updateComponent?.type === "slider" && updateEntrie && selectEntrie?.component != null) {
                            if (Number(e.target.value) < updateComponent.data.minimumValue) return;
                            const newComponent = { ...updateComponent, data: { ...updateComponent.data, maximumValue: Number(e.target.value) } };
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
                    <label className="project-label">Slider Options</label>
                </div>
                <div style={{ paddingBlock: "2px" }}>
                    <label className="project-label">Default Value</label>
                    <input className="project-input__text" type="number" value={String(updateComponent.data.sliderOptions?.defaultValue || updateComponent.data.minimumValue)} min={updateComponent.data.minimumValue} max={updateComponent.data.maximumValue} onChange={(e) => {
                        if (updateComponent?.type === "slider" && updateEntrie && selectEntrie?.component != null) {
                            const newComponent = { ...updateComponent, data: { ...updateComponent.data, sliderOptions: { ...updateComponent.data.sliderOptions, defaultValue: Number(e.target.value) } } };
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
                    <input className="project-input__text" type="text" value={String(updateComponent.data.sliderOptions?.tooltip || "")} onChange={(e) => {
                        if (updateComponent?.type === "slider" && updateEntrie && selectEntrie?.component != null) {
                            const newComponent = { ...updateComponent, data: { ...updateComponent.data, sliderOptions: { ...updateComponent.data.sliderOptions, tooltip: e.target.value } } };
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
                    <label className="project-label">Value Steps</label>
                    <input className="project-input__text" type="number" value={String(updateComponent.data.sliderOptions?.valueStep || 1)} min={1} max={updateComponent.data.maximumValue} onChange={(e) => {
                        if (updateComponent?.type === "slider" && updateEntrie && selectEntrie?.component != null) {
                            const newComponent = { ...updateComponent, data: { ...updateComponent.data, sliderOptions: { ...updateComponent.data.sliderOptions, valueStep: Number(e.target.value) } } };
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
