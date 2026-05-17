export interface ExplainRequest {
    code: string
}

export interface ExplainResponse {
    explanation: string
}

export interface DebugRequest {
    code: string;
    errorMessage?: string;
}

export interface DebugResponse {
    debugging: string
}

export interface GenerateCodeRequest {
    programmingLanguage?: string;
    description: string;
}

export interface GenerateCodeResponse {
    code: string
}

export interface Tab {
    id: "explain" | "debug" | "generate";
    label: string;
    icon: string;
    gradiantColor: string;
}

export interface FeatureGrid {
    title: string;
    description: string;
    icon: string;
}

export interface HistoryItem {
    id: string;
    type: "explain" | "debug" | "generate";
    input: string;
    output: string;
    timestamp: string;
}