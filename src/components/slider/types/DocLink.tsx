
interface DocLinkProps {
    href: string;
    text: string;
}

export const DocLink = ({ href, text }: DocLinkProps) => {
    return (
        <a className="docs-sidebar__element" href={href}>{text}</a>
    )
}
