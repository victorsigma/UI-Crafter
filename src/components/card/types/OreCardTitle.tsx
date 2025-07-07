interface TitleProps {
    label: string;
}

export const OreCardTitle = ({ label }: TitleProps) => {
    return (
        <div className="ore-card__header">
        <h2>{label}</h2>
        </div>
    );
}
