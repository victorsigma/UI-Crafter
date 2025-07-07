import type { ReactNode } from "react";

interface OreCardButtonsProps {
	children: ReactNode;
}

export const OreCardButtons = ({ children }: OreCardButtonsProps) => {
	return (
		<div className="ore-card__buttons">
			{children}
		</div>
	);
};
