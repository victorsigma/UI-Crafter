export interface RawMessage {
    text?: string;
    rawtext?: RawMessage[],
    translate?: string,
    with?: string[] | RawMessage[],
}