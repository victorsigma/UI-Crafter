import { useId, useState, type JSX, type ReactNode } from 'react';

interface HeaderProps {
    logoSrc?: string;
    logoAlt?: string;
    className?: string
    children?: ReactNode;
}


const ToolHeader = ({ logoSrc, className = "", logoAlt = "Logo", children }: HeaderProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const id = useId();
    const navId = `tool-header-nav-${id}`;

    return (
        <>
            <header className={`tool-header ${className}`} role="banner">
                <div className="tool-header__logo">
                    {logoSrc && <img src={logoSrc} alt={logoAlt} />}
                </div>
                <button
                    className="tool-header__toggle"
                    aria-label="Toggle navigation"
                    aria-expanded={isOpen}
                    aria-controls={navId}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
                <nav id={navId} className={`tool-header__nav ${isOpen ? "show" : ""}`}>
                    <ul className="tool-header__nav-list">
                        {children}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default ToolHeader;