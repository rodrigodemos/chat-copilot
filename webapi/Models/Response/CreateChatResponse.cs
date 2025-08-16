// Copyright (c) Microsoft. All rights reserved.

using System.Text.Json.Serialization;
using CopilotChat.WebApi.Models.Storage;

namespace CopilotChat.WebApi.Models.Response;

/// <summary>
/// Response object definition to the 'chats' POST request.
/// Contains the chat session information.
/// </summary>
public class CreateChatResponse
{
    /// <summary>
    /// The chat session that was created.
    /// </summary>
    [JsonPropertyName("chatSession")]
    public ChatSession ChatSession { get; set; }

    public CreateChatResponse(ChatSession chatSession)
    {
        this.ChatSession = chatSession;
    }
}
