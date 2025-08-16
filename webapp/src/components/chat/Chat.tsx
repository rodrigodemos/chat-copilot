import { Subtitle1 } from '@fluentui/react-components';
import React from 'react';
import { AuthHelper } from '../..//libs/auth/AuthHelper';
import { AppState, useClasses } from '../../App';
import { useAppSelector } from '../../redux/app/hooks';
import { RootState } from '../../redux/app/store';
import { UserSettingsMenu } from '../header/UserSettingsMenu';
import { PluginGallery } from '../open-api-plugins/PluginGallery';
import { BackendProbe, ChatView, Error, Loading, SimpleLandingPage } from '../views';

const Chat = ({
    classes,
    appState,
    setAppState,
}: {
    classes: ReturnType<typeof useClasses>;
    appState: AppState;
    setAppState: (state: AppState) => void;
}) => {
    const { conversations, selectedId } = useAppSelector((state: RootState) => state.conversations);
    const [isChatListVisible, setIsChatListVisible] = React.useState(true);
    const [hasStartedConversation, setHasStartedConversation] = React.useState(false);
    
    // Check if there are any conversations to determine if we should show the simple landing page
    const hasConversations = Object.keys(conversations).length > 0;
    // Show simple landing page if we're in chat state, have no selected conversation, and haven't started one yet
    // This ensures new users see the simple interface, but returning users with existing chats see the full interface
    const shouldShowLandingPage = appState === AppState.Chat && selectedId === '' && !hasStartedConversation;
    
    // Debug logging
    React.useEffect(() => {
        console.log('Chat Debug:', {
            appState,
            hasConversations,
            selectedId,
            hasStartedConversation,
            shouldShowLandingPage,
            conversationCount: Object.keys(conversations).length
        });
    }, [appState, hasConversations, selectedId, hasStartedConversation, shouldShowLandingPage, conversations]);
    
    const onBackendFound = React.useCallback(() => {
        setAppState(
            AuthHelper.isAuthAAD()
                ? // if AAD is enabled, we need to set the active account before loading chats
                  AppState.SettingUserInfo
                : // otherwise, we can load chats immediately
                  AppState.LoadChats,
        );
    }, [setAppState]);

    const handleSubtitleClick = () => {
        // Only toggle chat list if we're in the chat state and have conversations
        if (appState === AppState.Chat && hasConversations && selectedId) {
            setIsChatListVisible(!isChatListVisible);
        } else if (appState === AppState.Chat && hasConversations && !selectedId) {
            // If we have conversations but no selection, clicking title should show the landing page
            setHasStartedConversation(false);
        }
    };

    const handleConversationStart = () => {
        setHasStartedConversation(true);
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Subtitle1 
                    as="h1" 
                    style={{ cursor: hasConversations ? 'pointer' : 'default' }}
                    onClick={handleSubtitleClick}
                >
                    Chat Copilot
                </Subtitle1>
                {appState > AppState.SettingUserInfo && (
                    <div className={classes.cornerItems}>
                        <div className={classes.cornerItems}>
                            <PluginGallery />
                            <UserSettingsMenu
                                setLoadingState={() => {
                                    setAppState(AppState.SigningOut);
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
            {appState === AppState.ProbeForBackend && <BackendProbe onBackendFound={onBackendFound} />}
            {appState === AppState.SettingUserInfo && (
                <Loading text={'Hang tight while we fetch your information...'} />
            )}
            {appState === AppState.ErrorLoadingUserInfo && (
                <Error text={'Unable to load user info. Please try signing out and signing back in.'} />
            )}
            {appState === AppState.ErrorLoadingChats && (
                <Error text={'Unable to load chats. Please try refreshing the page.'} />
            )}
            {appState === AppState.LoadingChats && <Loading text="Loading chats..." />}
            {shouldShowLandingPage && <SimpleLandingPage onConversationStart={handleConversationStart} />}
            {appState === AppState.Chat && !shouldShowLandingPage && <ChatView isChatListVisible={isChatListVisible} />}
        </div>
    );
};
export default Chat;
