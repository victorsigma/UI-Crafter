import { useRef, useState, useEffect, type ReactNode, type JSX } from 'react';

interface DropdownProps {
	label: string;
	children: ReactNode;
}

const OreDropdown = ({ label, children }: DropdownProps): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef<HTMLAnchorElement>(null);
	const menuRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
		if (
			menuRef.current &&
			!menuRef.current.contains(e.target as Node) &&
			buttonRef.current &&
			!buttonRef.current.contains(e.target as Node)
		) {
			setIsOpen(false);
		}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	const toggleMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation();
		setIsOpen((prev) => !prev);
	};

	const calculatePosition = () => {
		if (buttonRef.current && menuRef.current) {
		const rect = buttonRef.current.getBoundingClientRect();
		menuRef.current.style.left = `${rect.left + window.scrollX}px`;
		menuRef.current.style.top = `${rect.bottom + window.scrollY + 6}px`;
		}
	};

	useEffect(() => {
		if (isOpen) calculatePosition();
	}, [isOpen]);

	return (
		<li className="ore-nav__item ore-nav__dropdown">
		<a
			ref={buttonRef}
			className={`ore-nav__link ore-nav__dropdown-toggle ${
			isOpen ? "show" : ""
			}`}
			role="button"
			onClick={toggleMenu}
		>
			{label}
		</a>
		<ul
			ref={menuRef}
			className={`ore-nav__dropdown-menu ${isOpen ? "show" : ""}`}
			style={{ position: "absolute" }}
		>
			{children}
		</ul>
		</li>
	);
	};


export default OreDropdown;