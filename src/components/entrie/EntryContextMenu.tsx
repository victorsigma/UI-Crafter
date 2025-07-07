import { useCallback, useEffect, useRef, type ReactNode } from "react";

interface EntryContextMenuProps {
    context: {
        x: number,
        y: number,
        visible: boolean
    },
    setContext: (id: {
        x: number,
        y: number,
        visible: boolean
    }) => void;
    children: ReactNode,
}

export const EntryContextMenu = ({ context, setContext, children }: EntryContextMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = useCallback((e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setContext({ x: 0, y: 0, visible: false });
        }
    }, [setContext]);

    const handleNoVisibility = useCallback(() => {
    setContext({ ...context, visible: false });
}, [setContext]);

    useEffect(() => {
        if (context.visible) {
            window.addEventListener("mousedown", handleOutsideClick);
            window.addEventListener("visibilitychange", handleNoVisibility);

            return () => {
                window.removeEventListener("mousedown", handleOutsideClick);
                window.removeEventListener("visibilitychange", handleNoVisibility);
            };
        }
    }, [context.visible, handleOutsideClick, setContext]);

    return (
        <div ref={menuRef} style={{
            display: context.visible ? "block" : "none",
            position: "absolute",
            top: context.y,
            left: context.x,
            backgroundColor: "#fff",
            listStyle: "none",
            padding: "0px",
            margin: 0,
            zIndex: 1000,
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }} onContextMenu={(e) => e.preventDefault()}>
            {children}
        </div>
    )
}
