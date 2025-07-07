import type { ReactNode } from "react";

interface OreCardBodyProps {
	children?: ReactNode | null;
}

export const OreCardBody = ({children}: OreCardBodyProps) => {
	return (
		<div className="ore-card__body">
			{children}
		</div>
	);
};
