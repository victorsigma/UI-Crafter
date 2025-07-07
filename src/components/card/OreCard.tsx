import type { JSX, ReactNode } from "react"

interface CardProps {
	children?: ReactNode | null;
}


export const OreCard = ({ children }: CardProps): JSX.Element => {
	return (
		<div className="ore-card">
			{children}
		</div>
	)
}
