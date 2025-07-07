import { useRef, useEffect, type ReactNode, type JSX } from "react";
import { useMediaQuery } from "react-responsive";

interface OreModalProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	title: string;
	titleStyle?: "ore-label" | "pe-label";
	children: ReactNode;
	width?: string;
	submitButtonText?: string;
	onClose?: () => void;
	onSubmit?: () => void;
}

export const OreModal = ({
	isOpen,
	setIsOpen,
	title,
	titleStyle = "ore-label",
	children,
	width = "500px",
	submitButtonText = "Close",
	onClose,
	onSubmit
}: OreModalProps): JSX.Element => {
	const modalRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
    const isMobil = useMediaQuery({ query: '(max-width: 439px)' })

	const closeModal = () => {
		setIsOpen(false);
		document.body.classList.remove("ore-modal-open");
		onClose?.();
	};

	const handleOutsideClick = (e: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
			closeModal();
		}
	};

	useEffect(() => {
		if (!isOpen) return;

		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isOpen]);

	// Arrastre
	useEffect(() => {
		if (!isOpen || !modalRef.current || !headerRef.current) return;

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
	}, [isOpen]);

	return (
		<>
			{isOpen && (
				<div className="ore-modal__container" style={{ display: "flex" }}>
					<div
						className="ore-card ore-modal__card"
						ref={modalRef}
						style={!isMobil ? {  width } : { width: "100%"}}
					>
						<div
							className="ore-card__header ore-modal__card-header"
							ref={headerRef}
						>
							<h2 className={titleStyle}>{title}</h2>
							<button
								className="ore-modal__button-close"
								onClick={closeModal}
							>
								X
							</button>
						</div>

						<div className="ore-card__body-modal">{children}</div>

						<div className="ore-card__buttons">
							<button onClick={onSubmit ? () => {
								onSubmit();
								closeModal();
							} : closeModal}>
								<span className="ore-label">{submitButtonText}</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
