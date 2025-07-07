interface OreCardImageProps {
	src: string,
	alt?: string
}

export const OreCardImage = ({ src, alt }: OreCardImageProps) => {
	return (
		<div className="ore-card__image">
			<img src={src} alt={alt ? alt : '...'} />
		</div>
	)
}
