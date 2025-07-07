import {
    ReactFlow,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    BackgroundVariant,
    type Edge,
    type EdgeChange,
    applyEdgeChanges,
    type Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback, useEffect } from 'react';
import type { EntryTypes } from '../../models/Form';
import { EntrieNode, type EntryEdge } from './EntrieNode';
import { makeEdgeEntries, makeNodeEntries } from '../../libs/nodeEditor';
import { toast } from 'react-toastify';

interface NodeEditorProps {
    entries: EntryTypes[];
    setEntries: (id: EntryTypes[]) => void;
    handleUndoUpdate: () => void;
}

const nodeTypes = {
    entry: EntrieNode
};

export const NodeEditor = ({ entries, setEntries, handleUndoUpdate }: NodeEditorProps) => {
    useEffect(() => {
        const nodeEntries: (EntrieNode | Node)[] = makeNodeEntries(entries);
        setNodes(nodeEntries)

        const edgeEntries: EntryEdge[] = makeEdgeEntries(entries);
        setEdges(edgeEntries)

        handleUndoUpdate()
    }, [entries])


    const [nodes, setNodes, onNodesChange] = useNodesState<EntrieNode | Node>([]);
    const [edges, setEdges] = useEdgesState<Edge>([]);

    const handleAddRemoveRef = (clonedEntries: EntryTypes[], sourceEntry: EntryTypes, sourceHandle: string, sourceEntryIndex: number, option: "add" | "remove", target?: string) => {
        if (!sourceEntry || sourceEntry.type === "Function") return;
        
        const match = sourceHandle.match(/:button:(\d+)$/);
        if (!match) return;

        const componentIndex = Number(match[1]);
        const component = sourceEntry.components[componentIndex];

        const isButton =
            component.type === "button" ||
            component.type === "button1" ||
            component.type === "button2";

        if (isButton && option == "add") {
            if (!target) return
            const [functionRef, typeOfRef] = target.split(":")
            const updatedComponent = {
                ...component,
                data: {
                    ...component.data,
                    functionRef,
                    typeOfRef
                },
            };

            const updatedEntry = {
                ...sourceEntry,
                components: [
                    ...sourceEntry.components.slice(0, componentIndex),
                    updatedComponent,
                    ...sourceEntry.components.slice(componentIndex + 1),
                ],
            };

            clonedEntries[sourceEntryIndex] = updatedEntry as EntryTypes;
            setEntries(clonedEntries);
        }

        if (isButton && option == "remove") {
            delete component.data["functionRef"]
            delete component.data["typeOfRef"]

            const updatedComponent = {
                ...component
            };

            const updatedEntry = {
                ...sourceEntry,
                components: [
                    ...sourceEntry.components.slice(0, componentIndex),
                    updatedComponent,
                    ...sourceEntry.components.slice(componentIndex + 1),
                ],
            };

            clonedEntries[sourceEntryIndex] = updatedEntry as EntryTypes;
            setEntries(clonedEntries);
        }
    }


    const onConnect = useCallback(
        (params: any) => {
            const { source, sourceHandle, target, targetHandle } = params;

            if (source === target) return toast.info("You cannot connect a node to itself.");
            const edgeId = `${sourceHandle}->${targetHandle}`;

            // Evitar duplicados
            if (edges.some(edge => edge.id === edgeId)) return toast.warn("You cannot make the same connection twice.");

            if (edges.some(edge => edge.sourceHandle === sourceHandle)) return toast.info("A button cannot be connected to two functions.");
            

            // Crear nuevo edge
            const newEdge = { ...params, id: edgeId,  };

            const [sourceRef] = source.split(":");

            const clonedEntries = structuredClone(entries);
            const sourceEntryIndex = clonedEntries.findIndex(e => e.formRef === sourceRef);
            const sourceEntry = clonedEntries[sourceEntryIndex];

            handleAddRemoveRef(clonedEntries, sourceEntry, sourceHandle, sourceEntryIndex, "add", target)

            setEdges((eds) => [...eds, newEdge]);
        },
        [edges, entries]
    );


    const onEdgesChanges = (changes: EdgeChange[]) => {
        const clonedEntries = structuredClone(entries);

        changes.forEach((change) => {
            if (change.type === 'remove') {
                const [sourceHandle] = change.id.split("->");
                const [source] = sourceHandle.split(":");

                const sourceEntryIndex = clonedEntries.findIndex(e => e.formRef === source);
                const sourceEntry = clonedEntries[sourceEntryIndex];

                handleAddRemoveRef(clonedEntries, sourceEntry, sourceHandle, sourceEntryIndex, "remove")
            }
        });

        setEdges((eds) => applyEdgeChanges(changes, eds));
    };

    return (
        <div style={{ width: '100%', height: "100%" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChanges}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
            >
                <Controls  />
                <Background variant={BackgroundVariant.Cross} color='#313233' gap={12} size={1} />
            </ReactFlow>
        </div>
    )
}
