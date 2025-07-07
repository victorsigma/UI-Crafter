import type { EntryComponentProps } from '../../../../models/ComponentProps'
import type { Dropdown, EntryTypesForms } from '../../../../models/Form'

export const DropdownEntry = ({ selectEntrie, updateEntrie, updateComponent, setUpdateComponent, setUpdateEntrie }: EntryComponentProps<Dropdown>) => {
    const itemsDropdownRender = () => {
        if (updateComponent?.type == "dropdown") {
            return updateComponent.data.items.map((item, i) => (
                <div className="project-param" key={i}>
                    <input className="project-param__text" type="text" placeholder="item" value={String(item || "")} onChange={(e) => {
                        if (updateComponent.data.items != null && updateComponent.data.items[i] != undefined) {
                            const items = [...updateComponent.data.items]
                            items[i] = e.target.value


                            if (selectEntrie?.component != null) {
                                const newComponent = { ...updateComponent, data: { ...updateComponent.data, items: items } };
                                setUpdateComponent(newComponent);

                                const components = [...(updateEntrie as EntryTypesForms).components];
                                components[selectEntrie.component] = newComponent;

                                const newEntrie = { ...updateEntrie, components } as EntryTypesForms;
                                setUpdateEntrie(newEntrie);
                            }
                        }
                    }} />
                    <button className="project-param__remove" onClick={() => {
                        if (updateComponent.data.items != null && updateComponent.data.items[i] != undefined) {
                            const items = [...updateComponent.data.items]
                            items.splice(i, 1);

                            if (selectEntrie?.component != null) {
                                const newComponent = { ...updateComponent, data: { ...updateComponent.data, items: items } };
                                setUpdateComponent(newComponent);

                                const components = [...(updateEntrie as EntryTypesForms).components];
                                components[selectEntrie.component] = newComponent;

                                const newEntrie = { ...updateEntrie, components } as EntryTypesForms;
                                setUpdateEntrie(newEntrie);
                            }
                        }
                    }}>-</button>
                </div>
            ));
        }
        return <></>;
    }

    return (


        <>
            <form className="project-element__explorer-form">
                <div style={{ paddingBottom: "2px" }} className="project-label">
                    <label className="project-label">Dropdown Component</label>
                </div>
                <div style={{ paddingBlock: "2px" }}>
                    <label className="project-label">Label</label>
                    <input className="project-input__text" type="text" value={String(updateComponent.data.label || "")} onChange={(e) => {
                        if (updateComponent?.type === "dropdown" && updateEntrie && selectEntrie?.component != null) {
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
                    <label className="project-label">Items</label>
                    <div className="project-params">
                        {
                            itemsDropdownRender()
                        }
                    </div>
                    <button className="project-param__add" onClick={() => {
                        if (updateComponent.data?.items != null) {
                            const items = [...updateComponent.data.items]
                            items.push("");

                            if (selectEntrie?.component != null) {
                                const newComponent = { ...updateComponent, data: { ...updateComponent.data, items: items } };
                                setUpdateComponent(newComponent);

                                const components = [...(updateEntrie as EntryTypesForms).components];
                                components[selectEntrie.component] = newComponent;

                                const newEntrie = { ...updateEntrie, components } as EntryTypesForms;
                                setUpdateEntrie(newEntrie);
                            }
                        }
                    }}>+</button>
                </div>
            </form>
            <form className="project-element__explorer-form">
                <div style={{ paddingBlock: "2px" }} className="project-label">
                    <label className="project-label">Dropdown Options</label>
                </div>

                <div style={{ paddingBlock: "2px" }}>
                    <label className="project-label">Default Value Index</label>
                    <input className="project-input__text" type="number" value={String(updateComponent.data.dropdownOptions?.defaultValueIndex || "0")} min="0" max={updateComponent.data.items.length - 1} onChange={(e) => {
                        if (updateComponent?.type === "dropdown" && updateEntrie && selectEntrie?.component != null) {
                            const newComponent = {
                                ...updateComponent, data: {
                                    ...updateComponent.data, dropdownOptions: {
                                        ...updateComponent.data.dropdownOptions,
                                        defaultValueIndex: Number(e.target.value)
                                    }
                                }
                            };
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
                    <input className="project-input__text" type="text" value={String(updateComponent.data.dropdownOptions?.tooltip || "")} onChange={(e) => {
                        if (
                            updateComponent?.type === "dropdown" &&
                            updateEntrie &&
                            selectEntrie?.component != null
                        ) {
                            const newDropdownOptions = {
                                ...updateComponent.data.dropdownOptions
                            };

                            if (e.target.value === "") {
                                delete newDropdownOptions.tooltip;
                            } else {
                                newDropdownOptions.tooltip = e.target.value;
                            }

                            const newComponent = {
                                ...updateComponent,
                                data: {
                                    ...updateComponent.data,
                                    dropdownOptions: newDropdownOptions
                                }
                            };

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
