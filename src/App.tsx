import { useCallback, useEffect, useRef, useState, type JSX } from 'react'
import './ore-styles.css';
import OreHeader from './components/header/OreHeader';
import { OreCard } from './components/card/OreCard';
import { OreCardButtons } from './components/card/types/OreCardButtons';
import { OreCardImageButton } from './components/card/types/OreCardImageButton';
import { OreModal } from './components/modal/OreModal';
import OreDropdown from './components/dropdown/OreDropdown';
import { ProjectDB } from "./services/ProjectDB";
import type { EntryTypesForms } from './models/Form';
import { makeNewEntrieForm } from './libs/entries';
import type { ProjectModel } from './models/ProjectModel';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { monacoThemeList, monacoThemes } from './libs/defineTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const App = (): JSX.Element => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [isPrefModalOpen, setPrefModalOpen] = useState(false);
	const [isImportModalOpen, setImportModalOpen] = useState(false);
	const [name, setName] = useState('');
	const [initialViewType, setInitViewType] = useState("ActionForm");
	const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(null);
	const [theme, setTheme] = useState<keyof typeof monacoThemes>("vs-dark");
	const [importOption, setImportOption] = useState<"add" | "update">("add");
	const [importData, setImportData] = useState<ProjectModel>();
	const [showOptions, setShowOptions] = useState(false);

	const fileRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const [updateName, setUpdateName] = useState("");

	const [projects, setProjects] = useState<Array<ProjectModel>>([]);

	const fetchProjects = useCallback(async () => {
		try {
			const allProjects = (await ProjectDB.getAllProjects()).sort((a, b) => a.name.localeCompare(b.name));
			setProjects(allProjects)
		} catch (err) {
			console.error('Error fetching projects:', err)
		}
	}, [])

	useEffect(() => {
		fetchProjects()
	}, [fetchProjects])

	useEffect(() => {
		if (selectedProject) {
			setUpdateName(selectedProject.name)
		}
	}, [selectedProject])

	useEffect(() => {
		const seletTheme = localStorage.getItem("theme") as keyof typeof monacoThemes
		setTheme(seletTheme);
	}, [])

	const handleThemeChange = () => {
		localStorage.setItem("theme", theme)
	}


	const handleCreateProject = async (): Promise<void> => {
		if (!name.trim()) {
			toast.warn('Please enter a project name')
			return
		}

		const entries: EntryTypesForms[] = []

		if (initialViewType === "ActionForm") {
			const newEntrie = makeNewEntrieForm('Action Form View', initialViewType)
			entries.push(newEntrie)
		} else if (initialViewType === "MessageForm") {
			const newEntrie = makeNewEntrieForm('Message Form View', initialViewType)
			entries.push(newEntrie)
		} else if (initialViewType === "ModalForm") {
			const newEntrie = makeNewEntrieForm('Modal Form View', initialViewType)
			entries.push(newEntrie)
		}

		await ProjectDB.addProject({
			id: crypto.randomUUID(),
			name,
			src: `card-image-${Math.floor(Math.random() * 2)}.jpg`,
			data: { entries }
		})

		await fetchProjects()
		setModalOpen(false)
		setName('')
	}

	const handleUpdateProject = async (): Promise<void> => {
		if (!updateName.trim() || !selectedProject) return

		await ProjectDB.updateProject({
			...selectedProject,
			name: updateName
		})

		await fetchProjects()
		setEditModalOpen(false)
		setSelectedProject(null)
	}

	const handleEnableImportProject = async (project: ProjectModel): Promise<void> => {
		const localProject = await ProjectDB.getProject(project.id)
		if (localProject) {
			setImportData(project);
			setImportOption("update");
			setShowOptions(true);
			return;
		}
		setImportData(project);
	}

	const handleImportProject = async (): Promise<void> => {
		if (!importData) return
		if (importOption == "add") {
			if (showOptions) {
				await ProjectDB.addProject({ ...importData, id: crypto.randomUUID() })
			} else {
				await ProjectDB.addProject({ ...importData })
			}
			setImportData(undefined);
		} else {
			await ProjectDB.updateProject(importData)
			setImportData(undefined);
		}
		await fetchProjects()
	}

	return (
		<>
			<OreHeader>
				<OreDropdown label="File">
					<li>
						<a className="ore-nav__dropdown-item" onClick={() => setModalOpen(true)}>
							New Project
						</a>
					</li>
					<li>
						<a className="ore-nav__dropdown-item" onClick={() => setImportModalOpen(true)}>
							Import Project
						</a>
					</li>
					<li>
						<hr className="ore-nav__dropdown-divider" />
					</li>
					<li>
						<a className="ore-nav__dropdown-item" onClick={() => setPrefModalOpen(true)}>
							Preferences
						</a>
					</li>

				</OreDropdown>

				<div>
					<li className="ore-nav__item"><a className="ore-nav__link" href="/docs">Docs</a></li>
				</div>
			</OreHeader>
			<div className="main-buttons">
				<div
					className="ore-button ore-button__primary"
					style={{ marginInline: "10px", marginBlock: "10px" }}
					onClick={() => setModalOpen(true)}
				>
					<button>
						<span>Make new project</span>
					</button>
					<div className="ore-button__decoration"></div>
				</div>
				<div
					className="ore-button ore-button__secondary"
					style={{ marginInline: "10px", marginBlock: "10px" }}
					onClick={() => setImportModalOpen(true)}
				>
					<button>
						<span>Import project</span>
					</button>
					<div className="ore-button__decoration"></div>
				</div>
			</div>
			<div className="content" style={{ display: 'flex', gap: '10px', margin: '1%', flexWrap: 'wrap', justifyContent: projects.length > 3 ? 'center' : 'left' }}>
				{
					projects.map((project) => {
						return (
							<OreCard key={project.id}>
								<OreCardImageButton src={`assets/images/${project.src || "card-image-1.jpg"}`} title={project.name} onClick={() => {
									navigate(`project/${project.id}`)
								}}></OreCardImageButton>
								<OreCardButtons>
									<button onClick={() => {
										setSelectedProject(project);
										setEditModalOpen(true);
									}}>
										<span>Edit Project</span>
									</button>
								</OreCardButtons>
							</OreCard>
						)
					})
				}
			</div>

			<OreModal title="New Project" titleStyle="ore-label" isOpen={isModalOpen} setIsOpen={setModalOpen} submitButtonText='Create Project' width="500px" onSubmit={handleCreateProject}>
				<input type="text" className="ore-input" placeholder="Project Name" value={name} onChange={(e) => {
					setName(e.target.value);
				}} />
				<br />
				<label className="ore-label">Initial View Type</label>
				<br />
				<div className="ore-button ore-select">
					<select style={{ padding: "10px", display: "flex", alignItems: "center" }} name="" id="" className="ore-select__full-width" value={initialViewType} onChange={(e) => {
						setInitViewType(e.target.value);
					}}>
						<option value="ActionForm">Action Form</option>
						<option value="MessageForm">Message Form</option>
						<option value="ModalForm">Modal Form</option>
					</select>
				</div>
			</OreModal>

			<OreModal title="Edit Project" titleStyle="ore-label" isOpen={isEditModalOpen} setIsOpen={setEditModalOpen} submitButtonText='Save' width="500px" onSubmit={handleUpdateProject}>
				<input type="text" className="ore-input" placeholder={selectedProject?.name} value={updateName} onChange={(e) => {
					setUpdateName(e.target.value);
				}} />
				<div className="ore-button ore-button__basic" style={{
					width: "100%",
					marginBlock: "10px"
				}} onClick={() => {
					ProjectDB.deleteProject(selectedProject?.id || "").then(async () => {
						setSelectedProject(null);
						setEditModalOpen(false);
						await fetchProjects()
					})
				}}>
					<button style={{ width: "100%", padding: "10px" }}>
						<label>Delete <FontAwesomeIcon icon={faTrashCan} /></label>
					</button>
				</div>
			</OreModal>

			<OreModal title="Preferences" titleStyle="ore-label" isOpen={isPrefModalOpen} setIsOpen={setPrefModalOpen} submitButtonText='Save' width="500px" onSubmit={handleThemeChange}>
				<label className="ore-label">Code Editor Theme</label>
				<br />
				<div className="ore-button ore-select">
					<select style={{ padding: "10px", display: "flex", alignItems: "center" }} name="" id="" className="ore-select__full-width" value={theme} onChange={(e) => {
						setTheme(e.target.value as keyof typeof monacoThemes);
					}}>
						{
							monacoThemeList.map((theme) => {
								return <option key={theme.key} value={theme.key}>{theme.label}</option>
							})
						}
					</select>
				</div>
			</OreModal>

			<OreModal title="Import Project" titleStyle="ore-label" isOpen={isImportModalOpen} setIsOpen={setImportModalOpen} submitButtonText='Import' width="500px" onClose={() => {
				setImportData(undefined)
				setShowOptions(false)
			}} onSubmit={handleImportProject}>
				<label className="ore-label">{importData != undefined ? `Selected File : ${importData.name}` : "Select File "}</label>
				<br />
				<div className="ore-button ore-button__basic" style={{
					width: "100%",
					marginBlock: "10px"
				}} onClick={() => {
					fileRef.current?.click()
				}}>
					<button style={{ width: "100%", padding: "10px" }}>
						<label>{importData != undefined ? `Selected File : ${importData.name}` : "Select File "}</label>
					</button>
					<input ref={fileRef} type="file" id="project-files" accept=".uc" className="input-file" style={{
						cursor: "pointer",
						margin: "0",
						opacity: "0",
						outline: "0 none",
						padding: "0",
						position: "absolute",
						right: "575px",
						top: "0",
						width: "0px",
						height: "0px",
					}}
						placeholder="Open Project" onChange={(e) => {
							const arrayFile = e.target.files;
							if (arrayFile && arrayFile.length != 0) {
								const reader = new FileReader();
								reader.readAsText(arrayFile[0]);
								reader.onload = async () => {
									await handleEnableImportProject(JSON.parse(reader.result as string));
								};
							}
						}} />
				</div>
				{
					showOptions && (
						<>
							<label className="ore-label">Import Option</label>
							<br />
							<div className="ore-button ore-select" >
								<select name="" id="" className="ore-select__full-width" value={importOption} style={{
									padding: "10px",
									display: "flex",
									alignItems: "center"
								}} onChange={(e) => {
									setImportOption(e.target.value as ("add" | "update"));
								}}>
									<option value="add">Add</option>
									<option value="update">Update</option>
								</select>
							</div>
						</>
					)
				}
			</OreModal>
		</>
	);
}

export default App
