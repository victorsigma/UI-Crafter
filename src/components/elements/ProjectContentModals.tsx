import { useMemo } from 'react'
import { ProjectModal } from '../modal/ProjectModal';
import type { componentBaseMap } from '../../libs/componentBaseMap';
import { ComponentList, type EntryTypes, type SelectEntrie } from '../../models/Form';

interface ProjectContentModalsProps {
    isAddViewModalOpen: boolean;
    setAddViewModalOpen: (id: boolean) => void;
    handleAddView: () => void;
    addViewName: string;
    setAddViewName: (id: string) => void;
    addViewType: string;
    setAddViewType: (id: string) => void;
    isAddFunctionModalOpen: boolean;
    setAddFunctionModalOpen: (id: boolean) => void;
    handleAddFunction: () => void;
    addFunctionName: string;
    setAddFunctionName: (id: string) => void;
    isAddComponentModalOpen: boolean;
    setAddComponentModalOpen: (id: boolean) => void;
    handleAddComponent: () => void;
    setAddComponentType: (id: keyof typeof componentBaseMap) => void;
    addComponentType: keyof typeof componentBaseMap;
    entries: EntryTypes[]
    selectEntrieContext: SelectEntrie | null
}

export const ProjectContentModals = ({
    isAddViewModalOpen, setAddViewModalOpen,
    handleAddView, addViewName, setAddViewName,
    addViewType, setAddViewType, isAddFunctionModalOpen,
    setAddFunctionModalOpen, handleAddFunction, addFunctionName,
    setAddFunctionName, isAddComponentModalOpen, setAddComponentModalOpen,
    handleAddComponent, setAddComponentType, addComponentType, entries, selectEntrieContext
}: ProjectContentModalsProps) => {


    const componentOptions = useMemo(() => {
        if (selectEntrieContext?.entrie != null) {
            const entry = entries[selectEntrieContext.entrie];
            if (!entry) return [<option value="without-options">Without Options</option>];

            const options = ComponentList[entry.type];

            return options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ));
        }

        return [<option value="without-options">Without Options</option>];
    }, [selectEntrieContext?.entrie]);
    return (
        <div>
            <ProjectModal title="Add View" titleStyle="ore-label" isOpen={isAddViewModalOpen} setIsOpen={setAddViewModalOpen} submitButtonText='Add' width="500px" onSubmit={handleAddView}>
                <div>
                    <input type="text" className="ore-input" placeholder="View Name" value={addViewName} onChange={(e) => {
                        setAddViewName(e.target.value);
                    }} />
                    <br />
                    <label className="ore-label">Initial View Type</label>
                    <br />
                    <div className="ore-button ore-select">
                        <select style={{ padding: "10px", display: "flex", alignItems: "center" }} name="" id="" value={addViewType} className="ore-select__full-width" onChange={(e) => {
                            setAddViewType(e.target.value);
                        }}>
                            <option value="ActionForm">Action Form</option>
                            <option value="MessageForm">Message Form</option>
                            <option value="ModalForm">Modal Form</option>
                        </select>
                    </div>
                </div>
            </ProjectModal>

            <ProjectModal title="Add Component" titleStyle="ore-label" isOpen={isAddFunctionModalOpen} setIsOpen={setAddFunctionModalOpen} submitButtonText='Add' width="500px" onSubmit={handleAddFunction}>
                <div>
                    <input type="text" className="ore-input" placeholder="Function Name" value={addFunctionName} onChange={(e) => {
                        setAddFunctionName(e.target.value);
                    }} />
                </div>
            </ProjectModal>

            <ProjectModal title="Add Component" titleStyle="ore-label" isOpen={isAddComponentModalOpen} setIsOpen={setAddComponentModalOpen} submitButtonText='Add' width="500px" onSubmit={handleAddComponent}>
                <div>
                    <div className="ore-button ore-select">
                        <select style={{ padding: "10px", display: "flex", alignItems: "center" }} name="" id="" value={addComponentType} className="ore-select__full-width" onChange={(e) => {
                            setAddComponentType(e.target.value as keyof typeof componentBaseMap);
                        }}>
                            {componentOptions}
                        </select>
                    </div>
                </div>
            </ProjectModal>
        </div>
    )
}
