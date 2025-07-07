import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface MenuItem {
	label: string;
	onClick?: () => void;
	icon?: IconDefinition;
	shortcut?: string;
}