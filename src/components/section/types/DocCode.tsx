interface DocCodeProps {
    code?: string;
}

export const DocCode = ({ code = "//plaseholder" }: DocCodeProps) => {
    return (
        <pre className='docs-precode'>
            <code className='docs-code'>{code}
            </code>
        </pre>
    )
}
