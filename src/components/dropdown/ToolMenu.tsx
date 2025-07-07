import type { MenuItem } from '../../models/MenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ToolMenuProps {
    items: (MenuItem | string)[]
    setOpenId: (id: string | null) => void;
}

export const ToolMenu = ({ items, setOpenId }: ToolMenuProps) => {
    return (
        <>
            {items.map((item, i) => {
                if (typeof item === "string") {
                    return (
                        <li key={i}>
                            <hr className="tool-nav__dropdown-divider" />
                        </li>
                    );
                }

                return (
                    <li key={i}>
                        <button
                            className="tool-nav__dropdown-item"
                            title={item.shortcut}
                            onClick={() => {
                                item.onClick?.();
                                setOpenId(null);
                            }}
                        >
                            <span style={{ display: "flex", alignItems: "center", margin: "0px" }}>
                                {item.icon && <div className="tool-nav__dropdown-icon"><FontAwesomeIcon icon={item.icon} /></div>}
                                {item.label}
                            </span>
                        </button>
                    </li>
                );
            })}
        </>
    )
}
