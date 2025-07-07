import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

export const useOreConfirm = () => {
	const [promiseHandlers, setPromiseHandlers] = useState<{
		resolve: (value: boolean) => void;
		reject: () => void;
	} | null>(null);

	const [visible, setVisible] = useState(false);

	const [message, setMessage] = useState("Are you sure about it?");

	const modalRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);


	const showModal = (message: string = "Are you sure about it?"): Promise<boolean> => {
		setVisible(true);
		setMessage(message)
		return new Promise((resolve, reject) => {
			setPromiseHandlers({ resolve, reject });
		});
	};

	const handleConfirm = () => {
		promiseHandlers?.resolve(true);
		setVisible(false);
	};

	const handleCancel = () => {
		promiseHandlers?.resolve(false);
		setVisible(false);
	};


	useEffect(() => {
		if (!visible || !modalRef.current || !headerRef.current) return;

		const modal = modalRef.current;
		const header = headerRef.current;

		let offsetX = 0,
			offsetY = 0,
			isDragging = false;

		const handleMouseDown = (e: MouseEvent) => {
			isDragging = true;
			const rect = modal.getBoundingClientRect();
			offsetX = e.clientX - rect.left;
			offsetY = e.clientY - rect.top;
			modal.style.position = "absolute";
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			const modalRect = modal.getBoundingClientRect();
			const newLeft = Math.min(Math.max(0, e.clientX - offsetX), window.innerWidth - modalRect.width);
			const newTop = Math.min(Math.max(0, e.clientY - offsetY), window.innerHeight - modalRect.height);
			modal.style.left = `${newLeft}px`;
			modal.style.top = `${newTop}px`;
		};

		const handleMouseUp = () => {
			isDragging = false;
		};

		header.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			header.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [visible]);


	const OreConfirm = () => {
		if (!visible) return null;
		return ReactDOM.createPortal(
			<div className="ore-modal__container" style={{ display: "flex" }}>
				<div
					className="ore-card ore-modal__card"
					ref={modalRef}
					style={{ width: "400px" }}
				>
					<div className="ore-card__header ore-modal__card-header" ref={headerRef}>
						<h2 className="ore-label">Confirm</h2>
					</div>

					<div className="ore-card__body-modal">
						<label className="ore-label">
							{message}
						</label>
					</div>

					<div className="ore-card__buttons">
						<button onClick={handleConfirm} style={{ padding: "0px" }}>
							<span className="ore-label">Yes</span>
						</button>
						<button onClick={handleCancel} style={{ padding: "0px" }}>
							<span className="ore-label">Not</span>
						</button>
					</div>
				</div>
			</div>,
			document.body
		);
	};

	return [showModal, OreConfirm];
};
