import { useEffect, useState } from "react";
import type { EntryTypes, FormComponents, SelectEntrie } from "../../models/Form";
import { toCamelCase, updateFunctionSignature } from '../../libs/stringManager';
import { BodyEntry } from "./types/Texts/BodyEntry";
import { ButtonEntry } from "./types/Buttons/ButtonEntry";
import { ButtonMessageEntry } from "./types/Buttons/ButtonMessageEntry";
import { TextEntry } from "./types/Texts/TextEntry";
import { TitleEntry } from "./types/Texts/TitleEntry";
import { ToggleEntry } from "./types/Controls/ToggleEntry";
import { SubmitButtonEntry } from "./types/Buttons/SubmitButtonEntry";
import { TextFieldEntry } from "./types/Controls/TextFieldEntry";
import { DropdownEntry } from "./types/Controls/DropdownEntry";
import { SliderEntry } from "./types/Controls/SliderEntry";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface EntryExplorerProps {
    selectEntrie: SelectEntrie | null;
    entrie: EntryTypes | null
    component?: FormComponents | null

    entries: EntryTypes[]
    setEntries: (id: EntryTypes[]) => void;
}

const componentMap: Record<string, React.ElementType> = {
    body: BodyEntry,
    button: ButtonEntry,
    button1: ButtonMessageEntry,
    button2: ButtonMessageEntry,
    dropdown: DropdownEntry,
    label: TextEntry,
    header: TextEntry,
    slider: SliderEntry,
    submitButton: SubmitButtonEntry,
    textField: TextFieldEntry,
    title: TitleEntry,
    toggle: ToggleEntry
};

export const EntryExplorer = ({ selectEntrie, entrie, component, entries, setEntries }: EntryExplorerProps) => {
    const [updateEntrie, setUpdateEntrie] = useState(entrie);
    const [updateComponent, setUpdateComponent] = useState(component);

    useEffect(() => {
        setUpdateEntrie(entrie)
        setUpdateComponent(component)
    }, [entrie, component])

    useEffect(() => {
        if (updateEntrie?.name != null) {
            setUpdateEntrie({ ...updateEntrie, formRef: toCamelCase(updateEntrie.name) })
        }
    }, [updateEntrie?.name])

    useEffect(() => {
        if (selectEntrie?.entrie != null) {
            const entriesUpdate = [...entries]
            entriesUpdate[selectEntrie?.entrie] = updateEntrie as EntryTypes;
            setEntries(entriesUpdate)
        }
    }, [updateEntrie])


    const renderParams = () => {
        if (updateEntrie?.params != null) {
            return updateEntrie.params.map((param, i) => (
                <div className="project-param" key={i}>
                    <input className="project-param__text" type="text" placeholder="param" value={param} onChange={(e) => {
                        if (updateEntrie?.params != null && updateEntrie.params[i] != undefined) {
                            const params = [...updateEntrie.params]
                            params[i] = e.target.value

                            if (updateEntrie.type == "Function") {
                                const data = updateFunctionSignature(updateEntrie.content, params)
                                setUpdateEntrie({ ...updateEntrie, params, content: data })
                            } else {
                                setUpdateEntrie({ ...updateEntrie, params })
                            }
                        }
                    }} />
                    <button className="project-param__remove" onClick={() => {
                        if (updateEntrie?.params != null && updateEntrie.params[i] != undefined) {
                            const params = [...updateEntrie.params]
                            params.splice(i, 1);
                            if (updateEntrie.type == "Function") {
                                const data = updateFunctionSignature(updateEntrie.content, params)
                                setUpdateEntrie({ ...updateEntrie, params, content: data })
                            } else {
                                setUpdateEntrie({ ...updateEntrie, params })
                            }
                        }
                    }}><FontAwesomeIcon icon={faMinus} /></button>
                </div>
            ));
        }
        return <></>;
    }

    const componentRender = () => {
        if (!updateComponent) return <></>;
        if (updateComponent.type === "divider") {
            return (
                <form className="project-element__explorer-form">
                    <label className="project-label">Divider Component (no config)</label>
                </form>
            );
        }

        const EntryComponent = componentMap[updateComponent.type];
        if (!EntryComponent) return <></>;

        return (
            <EntryComponent
                selectEntrie={selectEntrie}
                updateEntrie={updateEntrie}
                updateComponent={updateComponent}
                setUpdateEntrie={setUpdateEntrie}
                setUpdateComponent={setUpdateComponent}
            />
        );
    };

    return (
        <div className="project-entrie__explorer" onClickCapture={(e) => {
            e.preventDefault();
        }}>
            <form className="project-element__explorer-form">
                <div style={{paddingBlock: "2px"}}>
                    <label className="project-label">{updateEntrie?.type != "Function" ? "View Name" : "Function Name"}</label>
                    <input className="project-input__text" type="text" name="entryName" id="entryName" value={updateEntrie?.name || ""} onChange={(e) => {
                        if (updateEntrie?.name != null) {
                            setUpdateEntrie({ ...updateEntrie, name: e.target.value })
                        }
                    }} />
                </div>
                <hr />
                <div style={{paddingBlock: "2px"}}>
                    <label className="project-label">{updateEntrie?.type != "Function" ? "View Ref" : "Function Ref"}</label>
                    <input className="project-input__text" type="text" name="entryRef" id="entryRef" readOnly={true} value={updateEntrie?.formRef || ""} />
                </div>
                <hr />
                <div style={{paddingBlock: "2px"}} className="project-params__content">
                    <label className="project-label">{updateEntrie?.type != "Function" ? "View Params" : "Function Params"}</label>
                    <div className="project-params">
                        {
                            renderParams()
                        }
                    </div>
                    <button className="project-param__add" onClick={() => {
                        if (updateEntrie?.params != null) {
                            const params = [...updateEntrie.params]
                            params.push("");
                            setUpdateEntrie({ ...updateEntrie, params })
                        }
                    }}><FontAwesomeIcon icon={faPlus} /></button>
                </div>
            </form>

            {componentRender()}
        </div>
    )
}
