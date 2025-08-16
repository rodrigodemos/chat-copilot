// Copyright (c) Microsoft. All rights reserved.

export interface IChatSession {
    id: string;
    title: string;
    systemDescription: string;
    memoryBalance: number;
    enabledPlugins: string[];
}

export interface ICreateChatSessionResponse {
    chatSession: IChatSession;
}
