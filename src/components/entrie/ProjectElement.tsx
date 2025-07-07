import { faArrowsToCircle, faChevronDown, faChevronLeft, faCode, faFont, faHeading, faImage, faMinus, faSliders, faSquare, faSquareCaretDown, faSquareCaretLeft, faSquareCaretRight, faSquareUpRight, faTag, faToggleOn, faWindowMaximize, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import type { EntryTypes, EntryTypesForms } from "../../models/Form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProjectElement {
	entries: EntryTypes[]
	entrieId: string | null;
	setEntrieId: (id: string) => void;
	setSelectEntrie: (id: { entrie: number, component: number | null } | null) => void;
	onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>, target: { entrie: number, component: number | null } | null) => void;
}

export const ProjectElement = ({ entries, entrieId, setEntrieId, setSelectEntrie, onContextMenu }: ProjectElement) => {
	const componentIcons: Record<string, { icon: IconDefinition; label: string }> = {
		header: { icon: faWindowMaximize, label: "Header" },
		body: { icon: faArrowsToCircle, label: "Body" },
		button: { icon: faSquare, label: "Button" },
		title: { icon: faHeading, label: "Title" },
		divider: { icon: faMinus, label: "Divider" },
		dropdown: { icon: faSquareCaretDown, label: "Dropdown" },
		slider: { icon: faSliders, label: "Slider" },
		label: { icon: faTag, label: "Label" },
		textField: { icon: faFont, label: "Text Field" },
		button1: { icon: faSquareCaretLeft, label: "Button 1" },
		button2: { icon: faSquareCaretRight, label: "Button 2" },
		submitButton: { icon: faSquareUpRight, label: "Submit Button" },
		toggle: { icon: faToggleOn, label: "Toggle" },
	}

	return entries.map((item, i) => {
		if(item == null) return
		switch (item.type) {
			case "ActionForm":
			case "MessageForm":
			case "ModalForm":
				return (
					<div className="project-element" key={i}>
						<div className="project-element__header">
							<button onContextMenu={(e) => {
								if (onContextMenu) {
									e.preventDefault()
									onContextMenu(e, { entrie: i, component: null })
								}
							}} className={`project-element__button-main ${entrieId === item.formRef ? "show" : ""}`} onClick={() => {
								setSelectEntrie({ entrie: i, component: null })
							}
							}>
								<FontAwesomeIcon icon={faImage} style={{ marginRight: "10px" }} /> {item.name || "Unnamed View"}
							</button>
							<button className={`project-element__button-down ${entrieId === item.formRef ? "show" : ""}`} onClick={() => {
								if (entrieId === item.formRef) {
									setEntrieId("");
								} else {
									setEntrieId(item.formRef)
								}
							}}>
								{
									entrieId === item.formRef ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronLeft} />
								}
							</button>
						</div>
						<div className={`project-element__content ${entrieId === item.formRef ? "show" : ""}`}>
							<ul className="project-element__content-components">
								{
									(item as EntryTypesForms).components.map((component, j) => {
										const info = componentIcons[component.type];
										if (!info) return null;
										return <li key={j}>
											<button className="project-element__content-button" onContextMenu={(e) => {
												if (onContextMenu) {
													e.preventDefault()
													onContextMenu(e, { entrie: i, component: j })
												}
											}} onClick={() => {
												setSelectEntrie({ entrie: i, component: j })
											}}>
												<FontAwesomeIcon icon={info.icon} style={{ marginRight: "10px" }} /> {info.label}
											</button>
										</li>
									})
								}
							</ul>
						</div>
					</div>
				);
			case "Function":
				return (
					<div className="project-element" key={i}>
						<div className="project-element__header">
							<button className="project-element__button-main code" onContextMenu={(e) => {
								if (onContextMenu) {
									e.preventDefault()
									onContextMenu(e, { entrie: i, component: null })
								}
							}} onClick={() => {
								setSelectEntrie({ entrie: i, component: null })
							}}>
								<FontAwesomeIcon icon={faCode} style={{ marginRight: "10px" }} /> {item.name || "Unnamed Function"}
							</button>
						</div>
					</div>
				)
		};
	})
}
