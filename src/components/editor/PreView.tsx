import { useEffect, useState } from "react"
import type { EntryTypes, EntryTypesForms, SelectEntrie } from "../../models/Form"
import { ButtonRender } from "./types/Buttons/ButtonRender";
import { LabelRender } from "./types/Texts/LabelRender";
import { DropdownRender } from "./types/Controls/DropdownRender";
import { SliderRender } from "./types/Controls/SliderRender";
import { TextFieldRender } from "./types/Controls/TextFieldRender";
import { ToggleRender } from "./types/Controls/ToggleRender";
import { ButtonMessageRender } from "./types/Buttons/ButtonMessageRender";
import { SubmitButtonRender } from "./types/Buttons/SubmitButtonRender";

interface PreViewProps {
	selectEntrie: SelectEntrie | null;
	entries: EntryTypes[]
}

const componentMap: Record<string, React.ElementType> = {
	button: ButtonRender,
	dropdown: DropdownRender,
	label: LabelRender,
	slider: SliderRender,
	textField: TextFieldRender,
	toggle: ToggleRender
};

export const PreView = ({ selectEntrie, entries }: PreViewProps) => {
	const [entrieIndex, setEntrieIndex] = useState(-1);
	const [titleIndex, setTitleIndex] = useState(-1);
	const [submitIndex, setSubmitIndex] = useState(-1);
	const [bodyIndex, setBodyIndex] = useState(-1);

	const [btn1Index, setBtn1Index] = useState(-1);
	const [btn2Index, setBtn2Index] = useState(-1);

	const [viewEntrie, setViewEntrie] = useState<EntryTypesForms | null>(null);

	useEffect(() => {
		if (selectEntrie?.entrie != null) {
			setViewEntrie(entries[selectEntrie.entrie] as EntryTypesForms);

			if (entrieIndex != selectEntrie.entrie) return

			setTitleIndex(-1)
			setSubmitIndex(-1)
			setBodyIndex(-1)
			setBtn1Index(-1)
			setBtn2Index(-1)
			setEntrieIndex(selectEntrie.entrie)
		} else {
			setViewEntrie(null);
		}
	}, [entries])

	useEffect(() => {
		const titleIndex = (viewEntrie as EntryTypesForms)?.components.findIndex((comp) => comp.type == "title")
		const submitIndex = (viewEntrie as EntryTypesForms)?.components.findIndex((comp) => comp.type == "submitButton")
		const bodyIndex = (viewEntrie as EntryTypesForms)?.components.findIndex((comp) => comp.type == "body")
		const btn1Index = (viewEntrie as EntryTypesForms)?.components.findIndex((comp) => comp.type == "button1")
		const btn2Index = (viewEntrie as EntryTypesForms)?.components.findIndex((comp) => comp.type == "button2")

		if (titleIndex !== undefined) setTitleIndex(titleIndex)
		if (submitIndex !== undefined) setSubmitIndex(submitIndex)
		if (bodyIndex !== undefined) setBodyIndex(bodyIndex)
		if (btn1Index !== undefined) setBtn1Index(btn1Index)
		if (btn2Index !== undefined) setBtn2Index(btn2Index)

	}, [viewEntrie, entries])



	const componentRender = () => {
		if (viewEntrie == null) return <></>;

		return viewEntrie.components.map((component, i) => {

			const RenderComponent = componentMap[component.type]

			if (!RenderComponent) return
			return <RenderComponent key={"button" + i} viewEntrie={viewEntrie} component={component} i={i} />
		})
	};

	const messageFormRender = () => {
		if (viewEntrie?.type !== "MessageForm") return <></>;
		return (
			<>
				<ButtonMessageRender viewEntrie={viewEntrie} index={btn1Index} type="button1"/>
				<ButtonMessageRender viewEntrie={viewEntrie} index={btn2Index} type="button2"/>
			</>
		);
	};

	const modalFormRender = () => {
		if (viewEntrie?.type != "ModalForm") return <></>
		return <SubmitButtonRender viewEntrie={viewEntrie} index={submitIndex} />
	}

	return (
		<div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
			<div style={{ display: "flex", gap: "10px" }}>
				<div className="pe-card tool-preview">
					<div className="pe-card__content" style={{ minHeight: "409px" }}>
						<div className="pe-card__header" >
							{
								titleIndex > -1 ? (<>
									{(viewEntrie?.components[titleIndex] != null && viewEntrie?.components[titleIndex].type == "title" && viewEntrie?.components[titleIndex].data.titleText != "" ? <h2>{String(viewEntrie.components[titleIndex].data.titleText)}</h2> : <>
										<h2>‎</h2>
									</>)}
								</>) : (<>
									<h2>‎</h2>
								</>)
							}
						</div>
						<div className="pe-card__body" style={{ minHeight: viewEntrie?.type != "MessageForm" ? "409px" : "246px", maxWidth: "455px" }}>
							{
								bodyIndex > -1 ? (
									<h3 style={{
										marginBlock: "7px",
										color: "var(--color-white)",
										overflowWrap: "break-word",
										wordBreak: "break-word",
										whiteSpace: "normal"
									}}>
										{String(viewEntrie?.components[bodyIndex] != null && viewEntrie?.components[bodyIndex].type == "body" ? viewEntrie?.components[bodyIndex].data.bodyText || "" : "")}
									</h3>
								) : (
									<></>
								)
							}
							{componentRender()}
							{modalFormRender()}
						</div>
						{messageFormRender()}
					</div>
				</div>
			</div>
		</div>
	)
}