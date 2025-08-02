import type { ReactNode } from "react"

interface DocSliderProps {
    children?: ReactNode[];
}

export const DocSlider = ({ children }: DocSliderProps) => {
    return (
        <div className="docs-sidebar">
            <nav className="docs-sidebar__nav">
                {
                    children
                }
            </nav>
        </div>
    )
}
