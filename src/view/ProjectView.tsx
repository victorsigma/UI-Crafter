import "../tool-styles.css"

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import equal from "fast-deep-equal"

import ToolDropdown from "../components/dropdown/ToolDropdown";
import ToolHeader from "../components/header/ToolHeader";
import { InlineSlider } from "../components/slider/InlineSlider";
import {
	faRotateLeft, faRotateRight,
	faFloppyDisk, faFileExport,
	faDoorOpen, faSquarePlus,
	faPuzzlePiece, faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { ProjectElement } from "../components/entrie/ProjectElement";
import { EntryExplorer } from '../components/entrie/EntryExplorer';
import { EntryContextMenu } from "../components/entrie/EntryContextMenu";
import { ToolMenu } from "../components/dropdown/ToolMenu";
import { toast } from 'react-toastify';
import { useOreConfirm } from "../components/confirm/OreConfirm";
import { ProjectMainPanel } from "../components/elements/ProjectMainPanel";

import { ComponentList, type EntryTypes, type EntryTypesForms, type FormComponents, type McFunction, type SelectEntrie } from "../models/Form";
import { defaultProjectModel, type ProjectModel } from "../models/ProjectModel";
import type { MenuItem } from "../models/MenuItem";

import { getDeclaredParams } from "../libs/stringManager";
import { addComponentEntrie, makeNewEntrieForm, makeNewFunction } from "../libs/entries";
import { ProjectContentModals } from "../components/elements/ProjectContentModals";
import type { componentBaseMap } from "../libs/componentBaseMap";
import { defineTheme, monacoThemes } from "../libs/defineTheme";

import { UndoRedoStack } from "../services/UndoRedoStack";
import { ExportManager } from "../services/ExportManager";
import { ProjectDB } from "../services/ProjectDB";
import { useMediaQuery } from "react-responsive";


export const ProjectView = () => {
    const isMobil = useMediaQuery({ query: '(max-width: 439px)' })
	const projectData: ProjectModel = defaultProjectModel;

	const { id } = useParams();

	useEffect(() => {
		ProjectDB.getProject(`${id}`).then((project: ProjectModel) => {
			if (!project) return navigate("/");
			setProject(project)
			setEntries(project.data.entries)
			setSaveEntries(project.data.entries)
			setUnsaveSaveEntries(project.data.entries)
		})
	}, [])

	const [project, setProject] = useState<ProjectModel>(projectData)
	const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
	const [entries, setEntries] = useState<EntryTypes[]>(project.data.entries as EntryTypes[]);
	const [saveEntries, setSaveEntries] = useState<EntryTypes[]>(project.data.entries as EntryTypes[]);
	const [unsaveEntries, setUnsaveSaveEntries] = useState<EntryTypes[]>(project.data.entries as EntryTypes[]);
	const originalTitle = useRef(document.title);
	const [oreConfirm, OreConfirm] = useOreConfirm();

	const [contextMenu, setContextMenu] = useState({
		x: 0,
		y: 0,
		visible: false
	});

	const [entrieId, setEntrieId] = useState("");
	const [selectEntrie, setSelectEntrie] = useState<SelectEntrie | null>(null)

	const [selectEntrieContext, setSelectEntrieContext] = useState<SelectEntrie | null>(null)

	const navigate = useNavigate();


	const handleSaveEntries = async () => {
		setSaveEntries(entries)
		setUnsaveSaveEntries(entries)

		const newProjectData: ProjectModel = {
			...project,
			data: {
				entries: [...entries]
			}
		}

		setProject(newProjectData)

		// Opcional: guardar en DB si está habilitado
		try {
			await ProjectDB.updateProject({
				...project,
				data: {
					entries
				}
			});
		} catch (err) {
			console.error("Error al guardar el proyecto:", err);
			return;
		}

		document.title = originalTitle.current;
	}


	const handleExportProject = () => {
		const exportManager = new ExportManager(project)
		exportManager.exportProject();
	}

	const handleExportEntries = () => {
		const exportManager = new ExportManager(project)
		exportManager.exportAllV1();
	}

	useEffect(() => {
		const seletTheme = localStorage.getItem("theme") as keyof typeof monacoThemes

		if (seletTheme != null) {
			if (!["light", "vs-dark"].includes(seletTheme)) {
				defineTheme(seletTheme).then(() => { });
			}
		}
	}, [])

	const fileMenu: (MenuItem | string)[] = [
		{ label: "Save Project", icon: faFloppyDisk, shortcut: "Ctrl+S", onClick: handleSaveEntries },
		{ label: "Export Project", icon: faFileExport, shortcut: "Ctrl+E", onClick: handleExportProject },
		{ label: "Export", icon: faFileExport, shortcut: "Ctrl+O", onClick: handleExportEntries },
		"divider",
		{
			label: "Exit Project", icon: faDoorOpen, shortcut: "Ctrl+Q", onClick: async () => {
				const hasChanges = !equal(entries, saveEntries);

				if (hasChanges) {
					const response = await oreConfirm("¿Quiere salir sin guardar?")

					if (response) {
						UndoRedoStack.clear()
						navigate("/")
					}
				} else {
					UndoRedoStack.clear()
					navigate("/")
				}
			}
		},
	];

	const handleRestore = (newEntries: EntryTypes[]) => {
		setEntries(newEntries);
		setUnsaveSaveEntries(newEntries);

		if (selectEntrie?.entrie == null) {
			return;
		}

		setSelectEntrie(selectEntrie);

		if (!newEntries[selectEntrie.entrie]) {
			setSelectEntrie({ entrie: 0, component: null });
			setEntrie(null);
		}

		setEntrie(newEntries[selectEntrie.entrie]);

		if (selectEntrie.component != null) {
			setComponent((newEntries[selectEntrie.entrie] as EntryTypesForms).components[selectEntrie.component]);
		}

		const hasChanges = !equal(newEntries, saveEntries);
		document.title = hasChanges ? `* ${originalTitle.current}` : originalTitle.current;
	};

	const editMenu: (MenuItem | string)[] = [
		{
			label: "Undo", icon: faRotateLeft, shortcut: "Ctrl+Z", onClick: () => {
				if (!UndoRedoStack.canUndo()) return

				const newEntries = UndoRedoStack.undo(entries)
				if (newEntries) handleRestore(newEntries);
			}
		},
		{
			label: "Redo", icon: faRotateRight, shortcut: "Ctrl+Y", onClick: () => {
				if (!UndoRedoStack.canRedo()) return

				const newEntries = UndoRedoStack.redo(entries)
				if (newEntries) handleRestore(newEntries);
			}
		},
		"divider",
		{
			label: "Add View", icon: faSquarePlus, shortcut: "Ctrl+M", onClick: () => {
				setAddFunctionModalOpen(false);
				setAddComponentModalOpen(false);
				setAddViewModalOpen((prev) => !prev)
			}
		},
		{
			label: "Add Funtion", icon: faPuzzlePiece, shortcut: "Ctrl+F", onClick: () => {
				setAddViewModalOpen(false);
				setAddComponentModalOpen(false);
				setAddFunctionModalOpen((prev) => !prev)
			}
		},
		{ label: "Delete", icon: faTrashCan, shortcut: "Delete", onClick: () => handleRemoveEntry(selectEntrie) },
	];

	const allMenuItems = [...fileMenu, ...editMenu];

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const ctrl = e.ctrlKey || e.metaKey;
			const key = e.key.toLowerCase();

			const match = allMenuItems.find(
				item =>
					typeof item !== "string" &&
					item.shortcut?.toLowerCase() ===
					(ctrl ? `ctrl+${key}` : key)
			) as MenuItem | undefined;

			if (match && match.onClick) {
				e.preventDefault();
				match.onClick();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [allMenuItems]);


	const [expandedLeft, setExpandedLeft] = useState(true);
	const [expandedRight, setExpandedRight] = useState(true);


	const handleRemoveComponent = () => {
		if (selectEntrieContext?.entrie == null || selectEntrieContext?.component == null) return;

		const clonedEntries = structuredClone(entries);
		(clonedEntries[selectEntrieContext.entrie] as EntryTypesForms).components.splice(selectEntrieContext.component, 1);

		setEntries(clonedEntries);
		setSelectEntrie(selectEntrieContext);
		setContextMenu(prev => ({ ...prev, visible: false }));
	};

	const [lastAction, setLastAction] = useState<string | null>(null);

	const handleRemoveEntry = (select: {
		entrie: number;
		component: number | null;
	} | null) => {
		if (select?.entrie == null) return;

		const clonedEntries = structuredClone(entries);

		clonedEntries.splice(select.entrie, 1);

		setEntries(clonedEntries);
		setLastAction("removed");

		setSelectEntrie(null)
		setContextMenu(prev => ({ ...prev, visible: false }));

		toast.success("Entry removed successfully!");
	};

	useEffect(() => {
		if (lastAction === 'removed') {
			handleUndoUpdate(); // Tu función que se debe ejecutar después del cambio
			setLastAction(null);
		}
	}, [entries]);


	const [entrie, setEntrie] = useState<EntryTypes | null>(null)

	const [component, setComponent] = useState<FormComponents | null>(null)

	const handleUndoUpdate = () => {
		const hasChanges = !equal(entries, saveEntries);
		const isSameAsLastUnsave = equal(entries, unsaveEntries);
		if (hasChanges && !isSameAsLastUnsave) {
			setUnsaveSaveEntries(entries);
			UndoRedoStack.pushUndoClearRedo(unsaveEntries);
			console.log(UndoRedoStack.getTestUndo());
		}
		handleUpdateMark()
	}

	const handleUpdateMark = () => {
		const hasChanges = !equal(entries, saveEntries);
		document.title = hasChanges ? `* ${originalTitle.current}` : originalTitle.current;
	}

	useEffect(() => {
		if (selectEntrie == null) {
			handleUndoUpdate();
		}
		if (selectEntrie != null) {
			handleUndoUpdate();

			setEntrie(entries[selectEntrie.entrie] as EntryTypes)

			const actualEntrie = entries[selectEntrie.entrie] as EntryTypes;

			if (selectEntrie.component != null) {
				setComponent((actualEntrie as EntryTypesForms).components[selectEntrie.component])
			} else {
				setComponent(null);
			}
		}
	}, [selectEntrie])

	const onChange = (data: any, action: any) => {
		if (data) {
			const params = getDeclaredParams(data);

			setEntrie({ ...entrie, content: data as string, params } as McFunction)
		} else {
			console.warn("caso no manejado!", action);
		}
	};

	useEffect(() => {
		handleUpdateMark()
	}, [entries])



	const [isAddViewModalOpen, setAddViewModalOpen] = useState(false);

	const [addViewName, setAddViewName] = useState("");
	const [addViewType, setAddViewType] = useState("ActionForm");

	const handleAddView = () => {
		if (addViewName == "" || addViewType == "") {
			toast.error("Please enter a valid view name and type.");
			return
		}

		const duplicateSize = entries.filter((entry) => entry.name == addViewName).length
		const viewName = `${addViewName}${duplicateSize > 0 ? duplicateSize + 1 : ""}`

		const newEntrie = makeNewEntrieForm(viewName, addViewType)
		setEntries(prev => [...prev, newEntrie]);
		setSelectEntrie({ entrie: [...entries, newEntrie].length - 1, component: null })
		setAddViewName("");
		setAddViewType("ActionForm");
	}

	const [isAddFunctionModalOpen, setAddFunctionModalOpen] = useState(false);
	const [addFunctionName, setAddFunctionName] = useState("");

	const handleAddFunction = () => {
		if (addFunctionName == "") {
			toast.error("Please enter a valid function name.");
			return
		}

		const duplicateSize = entries.filter((entry) => entry.name == addFunctionName).length
		const functionName = `${addFunctionName}${duplicateSize > 0 ? duplicateSize + 1 : ""}`

		const newEntrie = makeNewFunction(functionName)
		setEntries(prev => [...prev, newEntrie]);
		setSelectEntrie({ entrie: [...entries, newEntrie].length - 1, component: null })
		setAddFunctionName("");
	}

	const [isAddComponentModalOpen, setAddComponentModalOpen] = useState(false);
	const [addComponentType, setAddComponentType] = useState<keyof typeof componentBaseMap>("Header");

	const handleAddComponent = () => {

		if (selectEntrieContext?.entrie == null) return;

		const entry = entries[selectEntrieContext.entrie];
		if (!entry || entry.type === "Function") return;

		const updatedEntry = addComponentEntrie(addComponentType, entry)

		if (updatedEntry.type == "Alert" || updatedEntry.type == "Error") {
			switch (updatedEntry.type) {
				case "Alert":
					toast.warn(updatedEntry.message)
					break;
				case "Error":
					toast.error(updatedEntry.message)
					break;
			}
			return
		}

		// Continúa agregando el componente si pasa la validación
		const updatedEntries = [...entries];
		updatedEntries[selectEntrieContext.entrie] = updatedEntry as EntryTypesForms;

		setEntries(updatedEntries);
	};

	useEffect(() => {
		if (selectEntrieContext?.entrie != null) {
			if (!entries[selectEntrieContext.entrie]) return

			const type = entries[selectEntrieContext.entrie].type;
			const options = ComponentList[type];
			if (options?.length) {
				setAddComponentType(options[0] as keyof typeof componentBaseMap); // solo se asigna una vez
			}
		}
	}, [selectEntrieContext?.entrie]);

	return (
		<div>
			<ToolHeader className="tool-dark">
				<ToolDropdown id="file" label="File" openId={openDropdownId} setOpenId={setOpenDropdownId}>
					<ToolMenu items={fileMenu} setOpenId={setOpenDropdownId}></ToolMenu>
				</ToolDropdown>
				<ToolDropdown id="edit" label="Edit" openId={openDropdownId} setOpenId={setOpenDropdownId}>
					<ToolMenu items={editMenu} setOpenId={setOpenDropdownId}></ToolMenu>
				</ToolDropdown>
			</ToolHeader>

			<div className="project-content" style={{ display: "flex", justifyContent: "space-between" }}>
				<InlineSlider type="left" expanded={expandedLeft} onToggle={() => setExpandedLeft(!expandedLeft)}>
					<div style={{ borderRadius: "4px", backgroundColor: "var(--color-gray-dark)", padding: "5px" }}>
						<ProjectElement onContextMenu={(e, t) => {
							setContextMenu({
								x: e.pageX,
								y: e.pageY,
								visible: true
							})

							setSelectEntrieContext(t)
						}} setEntrieId={setEntrieId} entrieId={entrieId} setSelectEntrie={setSelectEntrie} entries={entries as EntryTypes[]} />

						<EntryContextMenu context={contextMenu} setContext={setContextMenu}>
							<ul className="project-slide__context-menu project-dark">
								{
									(selectEntrieContext?.entrie != null && entries[selectEntrieContext?.entrie] != null && entries[selectEntrieContext?.entrie].type != "Function") && <li>
										<button className="project-slide__context-item project-dark" onClick={() => {
											setAddViewModalOpen(false);
											setAddFunctionModalOpen(false)
											setAddComponentModalOpen((prev) => !prev);
										}}>
											Add Component
										</button>
									</li>
								}
								{
									selectEntrieContext?.component != null && <li>
										<button className="project-slide__context-item project-dark" onClick={handleRemoveComponent}>
											Remove Component
										</button>
									</li>
								}
								{
									(selectEntrieContext?.entrie != null && entries[selectEntrieContext?.entrie] != null && entries[selectEntrieContext?.entrie].type != "Function") && <li>
										<hr className="project-slide__context-divider" />
									</li>
								}
								<li>
									<button className="project-slide__context-item project-dark" onClick={() => {
										handleRemoveEntry(selectEntrieContext)
									}}>
										Remove Entry
									</button>
								</li>
							</ul>
						</EntryContextMenu>
					</div>
				</InlineSlider>
				{((isMobil && !expandedRight) || (isMobil && !expandedLeft)) && <ProjectMainPanel
					expandedLeft={expandedLeft}
					expandedRight={expandedRight}
					entrie={entrie}
					entries={entries}
					selectEntrie={selectEntrie}
					onChange={onChange}
					setEntries={setEntries}
					handleUndoUpdate={handleUndoUpdate} />}
				{(!isMobil) && <ProjectMainPanel
					expandedLeft={expandedLeft}
					expandedRight={expandedRight}
					entrie={entrie}
					entries={entries}
					selectEntrie={selectEntrie}
					onChange={onChange}
					setEntries={setEntries}
					handleUndoUpdate={handleUndoUpdate} />}

				<InlineSlider type="right" expanded={expandedRight} onToggle={() => setExpandedRight(!expandedRight)}>
					<EntryExplorer selectEntrie={selectEntrie} entrie={entrie} component={component} entries={entries} setEntries={setEntries}></EntryExplorer>
				</InlineSlider>

				<ProjectContentModals
					addComponentType={addComponentType}
					addFunctionName={addFunctionName}
					addViewName={addViewName}
					addViewType={addViewType}
					entries={entries}
					handleAddComponent={handleAddComponent}
					handleAddFunction={handleAddFunction}
					handleAddView={handleAddView}
					isAddComponentModalOpen={isAddComponentModalOpen}
					isAddFunctionModalOpen={isAddFunctionModalOpen}
					isAddViewModalOpen={isAddViewModalOpen}
					selectEntrieContext={selectEntrieContext}
					setAddComponentModalOpen={setAddComponentModalOpen}
					setAddComponentType={setAddComponentType}
					setAddFunctionModalOpen={setAddFunctionModalOpen}
					setAddFunctionName={setAddFunctionName}
					setAddViewModalOpen={setAddViewModalOpen}
					setAddViewName={setAddViewName}
					setAddViewType={setAddViewType}
				/>
			</div>
			<OreConfirm />
		</div>
	)
}
