import Editor, { type Monaco } from "@monaco-editor/react";
import { useMediaQuery } from 'react-responsive'
import type { editor } from "monaco-editor";
import { useEffect, useState } from "react";
import serverTypes from "../../libs/utils/minecraft-server.d.ts?raw";
import systemTypes from "../../libs/utils/bedrock-system.d.ts?raw";


interface CodeEditorProps {
    onChange: (value: string | undefined, ev: editor.IModelContentChangedEvent | undefined) => void;
    code: string;
    theme: string;
}

export const CodeEditor = ({ onChange, code, theme }: CodeEditorProps) => {
    const isMobil = useMediaQuery({ query: '(max-width: 439px)' })
    const [value, setValue] = useState(code || "");

    useEffect(() => {
        setValue(code || "");
    }, [code]);


    const handleEditorWillMount = (monaco: Monaco) => {
        const uriServer = monaco.Uri.parse("file:///node_modules/@minecraft/server/index.d.ts");
        const uriSystem = monaco.Uri.parse("file:///node_modules/@bedrock/system/index.d.ts");

        // Añade los tipos como extraLib
        monaco.languages.typescript.javascriptDefaults.addExtraLib(serverTypes, uriServer.toString());
        monaco.languages.typescript.javascriptDefaults.addExtraLib(systemTypes, uriSystem.toString());
    };


    const handleEditorChange = (value: string | undefined, event: editor.IModelContentChangedEvent) => {
        setValue(value || "");
        onChange(value, event);
    };

    return (
        <div>
            <Editor
                height={isMobil ? "calc(100vh - 107px)" :"calc(100vh - 72px)"}
                width={`100%`}
                language={"javascript"}
                value={value}
                theme={theme}
                beforeMount={handleEditorWillMount}
                onChange={handleEditorChange}
            />
        </div>
    );
}
