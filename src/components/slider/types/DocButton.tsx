
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DocButtonProps {
    onClick?: () => void;
    text?: string;
    icon?: IconDefinition;
}

export const DocButton = ({ text, onClick, icon }: DocButtonProps) => {
    return (
        <button className="docs-sidebar__button" onClick={onClick}>{icon != undefined && (
            <FontAwesomeIcon icon={icon} style={{marginRight: "7px"}} />
        )}{text}</button>
    )
}
