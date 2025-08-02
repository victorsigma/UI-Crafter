import type { ReactNode } from "react";

interface DocSectionProps {
    id?: string;
    children?: ReactNode;
}

export const DocSection = ({ id, children }: DocSectionProps) => {
    return (
        <section className="docs-section" id={id}>
            {children}
        </section>
    )
}
