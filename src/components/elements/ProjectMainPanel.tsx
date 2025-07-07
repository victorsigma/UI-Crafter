import { useEffect, useRef, useState } from 'react'
import { CodeEditor } from '../editor/CodeEditor';
import { PreView } from '../editor/PreView';
import { NodeEditor } from '../editor/NodeEditor';
import type { EntryTypes, SelectEntrie } from '../../models/Form';
import { monacoThemes } from '../../libs/defineTheme';

interface ProjectMainPanelPros {
    expandedLeft: boolean;
    expandedRight: boolean;
    entrie: EntryTypes | null
    entries: EntryTypes[];
    selectEntrie: SelectEntrie | null;
    onChange: (data: any, action: any) => void;
    setEntries: (id: EntryTypes[]) => void;
    handleUndoUpdate: () => void;
}

export const ProjectMainPanel = ({ expandedLeft, expandedRight, entrie, entries, selectEntrie, onChange, setEntries, handleUndoUpdate }: ProjectMainPanelPros) => {
    const [tabId, setTabId] = useState("views");
    const tabList = [
        { id: "views", label: "Preview" },
        { id: "nodes", label: "Nodes" }
    ];
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);


    const [theme, setTheme] = useState("vs-dark")

    useEffect(() => {
        const seletTheme = localStorage.getItem("theme") as keyof typeof monacoThemes
        setTheme(seletTheme || "vs-dark");
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Evita cambiar pestaña si el foco está en un input, textarea o select
            const activeTag = document.activeElement?.tagName.toLowerCase();
            if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") return;

            const index = tabList.findIndex(t => t.id === tabId);

            if (e.key === "ArrowRight") {
                const nextIndex = (index + 1) % tabList.length;
                setTabId(tabList[nextIndex].id);
                tabRefs.current[nextIndex]?.focus();
            }

            if (e.key === "ArrowLeft") {
                const prevIndex = (index - 1 + tabList.length) % tabList.length;
                setTabId(tabList[prevIndex].id);
                tabRefs.current[prevIndex]?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [tabId, tabList]);


    useEffect(() => {
        setTabId("views");
    }, [selectEntrie?.entrie])

    return (
        <div className="project-main__panel" style={{
            width: `calc(100% 
                            ${expandedLeft ? '- 260px' : ''}
                            ${expandedRight ? '- 260px' : ''})`,
            transition: "width 0.3s"
        }}>
            <div className="project-main__tabs">
                {tabList.map((tab, i) => (
                    <button
                        key={tab.id}
                        role="tab"
                        ref={(el) => { (tabRefs.current[i] = el); }}
                        className={`project-main__tab ${tabId === tab.id ? "active" : ""}`}
                        onClick={() => setTabId(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="project-main__content" style={{ padding: entrie?.type == "Function" && tabId === "views" ? "0px" : "20px", }}>
                {
                    tabId === "views" ? (
                        entrie?.type === "Function" ? (
                            <CodeEditor code={entrie.content} onChange={onChange} theme={theme} />
                        ) : (
                            <PreView entries={entries} selectEntrie={selectEntrie} />
                        )
                    ) : (
                        <NodeEditor entries={entries} setEntries={setEntries} handleUndoUpdate={handleUndoUpdate}></NodeEditor>
                    )
                }
            </div>
        </div>
    )
}
