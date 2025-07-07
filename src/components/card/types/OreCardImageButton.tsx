import type { JSX } from "react"

interface OreCardImageProps {
	src: string,
	alt?: string,
	onClick?: () => void,
	title: string,
	description?: string,
}

export const OreCardImageButton = ({ src, alt, onClick, title, description }: OreCardImageProps) : JSX.Element => {
	return (
		<div className="ore-card__image-button" onClick={onClick} role="button">

			<picture>
				<source media="(min-width: 640px)"
					srcSet={src}/>

				<img src={src} alt={alt ? alt : '...'} style={{width: "100%"}}/>
			</picture>


			
			<button >
				<p>{title}</p>
				{
					description && <span>{description}</span>
				}
			</button>
		</div>
	)
}
