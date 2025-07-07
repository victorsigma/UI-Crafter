interface SliderProps {
	expanded: boolean;
	type?: "left" | "right";
	onToggle: () => void;
	children: React.ReactNode;
}

export const InlineSlider = ({ expanded, type = "left", onToggle, children }: SliderProps) => {

	return (
		<div className="slider-content"
			style={{
				width: expanded ? "262px" : "20px"
			}}
		>
			<div className="project-slider__explorer" style={{
				flexGrow: 1, overflowY: "auto",
				overflowX: "hidden",
			}}>{expanded && children}</div>
			<button className="slider-toggle__button" onClick={onToggle} style={{ marginTop: "1rem" }}>
				{type == "left" && (expanded ? "«" : "»")}
				{type == "right" && (expanded ? "»" : "«")}
			</button>
		</div>
	);
};
