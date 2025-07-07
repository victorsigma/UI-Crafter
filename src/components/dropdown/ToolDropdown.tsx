import { useRef, useEffect, type ReactNode, type JSX } from 'react';

interface DropdownProps {
    id: string;
    label: string;
    children: ReactNode;
    openId: string | null;
    setOpenId: (id: string | null) => void;
}

const ToolDropdown = ({ id, label, children, openId, setOpenId }: DropdownProps): JSX.Element => {
    const isOpen = openId === id;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const buttonRef = useRef<HTMLAnchorElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const toggleMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();


        setOpenId(isOpen ? null : id);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                setOpenId(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [setOpenId]);

    useEffect(() => {
        if (isOpen) {
            const rect = buttonRef.current?.getBoundingClientRect();
            if (rect && menuRef.current) {
                menuRef.current.style.left = `${rect.left + window.scrollX}px`;
                menuRef.current.style.top = `${rect.bottom + window.scrollY + 7}px`;
            }
        }
    }, [isOpen]);

    return (
        <li className="tool-nav__item tool-nav__dropdown"
            onMouseEnter={() => {
                if(!isTouch && openId !== id && openId !== null) {
                    setOpenId(id);
                }
            }}>
            <a
                ref={buttonRef}
                className={`tool-nav__link tool-nav__dropdown-toggle ${isOpen ? "show" : ""}`}
                role="button"
                onClick={toggleMenu}

            >
                {label}
            </a>
            <ul
                ref={menuRef}
                className={`tool-nav__dropdown-menu ${isOpen ? "show" : ""}`}
                style={{ position: "absolute" }}
            >
                {children}
            </ul>
        </li>
    );
};


export default ToolDropdown;