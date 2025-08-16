// Copyright (c) Microsoft. All rights reserved.

import { Button, Input, makeStyles, shorthands, Text, tokens } from '@fluentui/react-components';
import { SendRegular } from '@fluentui/react-icons';
import React, { useState } from 'react';
import { GetResponseOptions, useChat } from '../../libs/hooks/useChat';
import { AlertType } from '../../libs/models/AlertType';
import { ChatMessageType } from '../../libs/models/ChatMessage';
import { useAppDispatch } from '../../redux/app/hooks';
import { addAlert } from '../../redux/features/app/appSlice';

const useClasses = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        ...shorthands.padding(tokens.spacingVerticalXXL),
        ...shorthands.gap(tokens.spacingVerticalL),
    },
    welcomeText: {
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForeground1,
        textAlign: 'center',
        marginBottom: tokens.spacingVerticalL,
    },
    subtitle: {
        fontSize: tokens.fontSizeBase400,
        color: tokens.colorNeutralForeground2,
        textAlign: 'center',
        marginBottom: tokens.spacingVerticalXXL,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '600px',
        ...shorthands.gap(tokens.spacingHorizontalM),
        alignItems: 'flex-end',
    },
    input: {
        flexGrow: 1,
    },
    sendButton: {
        minWidth: '44px',
        height: '32px',
    },
});

interface SimpleLandingPageProps {
    onConversationStart: () => void;
}

export const SimpleLandingPage: React.FC<SimpleLandingPageProps> = ({ onConversationStart }) => {
    const classes = useClasses();
    const [inputValue, setInputValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const chat = useChat();
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {
        if (inputValue.trim() === '' || isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        const messageToSend = inputValue.trim();
        setInputValue('');

        try {
            // Create a new chat and get the chat ID
            const newChatId = await chat.createChat();
            
            if (newChatId) {
                // Send the message to the new chat
                const options: GetResponseOptions = {
                    value: messageToSend,
                    messageType: ChatMessageType.Message,
                    chatId: newChatId,
                };

                await chat.getResponse(options);
                onConversationStart();
            } else {
                throw new Error('Failed to create chat');
            }
        } catch (error) {
            dispatch(
                addAlert({
                    type: AlertType.Error,
                    message: `Error starting conversation: ${(error as Error).message}`,
                }),
            );
            // Restore the input value if there was an error
            setInputValue(messageToSend);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            void handleSubmit();
        }
    };

    const handleSendClick = () => {
        void handleSubmit();
    };

    return (
        <div className={classes.container}>
            <Text className={classes.welcomeText}>
                Welcome to Givino
            </Text>
            <Text className={classes.subtitle}>
                Start a conversation by typing your message below
            </Text>
            
            <div className={classes.inputContainer}>
                <Input
                    className={classes.input}
                    placeholder="Type your message here..."
                    value={inputValue}
                    onChange={(_, data) => {
                        setInputValue(data.value);
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={isSubmitting}
                />
                <Button
                    className={classes.sendButton}
                    appearance="primary"
                    icon={<SendRegular />}
                    onClick={handleSendClick}
                    disabled={inputValue.trim() === '' || isSubmitting}
                    aria-label="Send message"
                />
            </div>
        </div>
    );
};
