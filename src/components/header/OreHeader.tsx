import { useId, useState, type JSX, type ReactNode } from 'react';

interface HeaderProps {
    logoSrc?: string;
    logoAlt?: string;
    children?: ReactNode;
}


const OreHeader = ({ logoSrc, logoAlt = "Logo", children }: HeaderProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const id = useId();
    const navId = `ore-header-nav-${id}`;

    return (
        <>
            <header className="ore-header">
                <div className="ore-header__logo">
                    {logoSrc && <img src={logoSrc} alt={logoAlt} />}
                </div>
                <button
                    className="ore-header__toggle"
                    aria-label="Toggle navigation"
                    aria-expanded={isOpen}
                    aria-controls={navId}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
                <nav id={navId} className={`ore-header__nav ${isOpen ? "show" : ""}`}>
                    <ul className="ore-header__nav-list">
                        {children}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default OreHeader;