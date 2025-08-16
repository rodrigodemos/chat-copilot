import { makeStyles, shorthands, Text, tokens } from '@fluentui/react-components';
import { getFriendlyChatName } from '../../../libs/hooks/useChat';
import { ChatMessageType } from '../../../libs/models/ChatMessage';
import { useAppSelector } from '../../../redux/app/hooks';
import { RootState } from '../../../redux/app/store';
import { Conversations } from '../../../redux/features/conversations/ConversationsState';
import { Breakpoints } from '../../../styles';
import { ChatListItem } from './ChatListItem';

const useClasses = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap(tokens.spacingVerticalXXS),
        paddingBottom: tokens.spacingVerticalXS,
    },
    header: {
        marginTop: 0,
        paddingBottom: tokens.spacingVerticalXS,
        marginLeft: tokens.spacingHorizontalXL,
        marginRight: tokens.spacingHorizontalXL,
        fontWeight: tokens.fontWeightRegular,
        fontSize: tokens.fontSizeBase200,
        color: tokens.colorNeutralForeground3,
        ...Breakpoints.small({
            display: 'none',
        }),
    },
});

interface IChatListSectionProps {
    header?: string;
    conversations: Conversations;
}

export const ChatListSection: React.FC<IChatListSectionProps> = ({ header, conversations }) => {
    const classes = useClasses();
    const { selectedId } = useAppSelector((state: RootState) => state.conversations);
    const keys = Object.keys(conversations);

    return keys.length > 0 ? (
        <div className={classes.root}>
            <Text className={classes.header}>{header}</Text>
            {keys.map((id) => {
                const convo = conversations[id];
                const messages = convo.messages;
                const lastMessage = messages.length > 0 ? messages[messages.length - 1] : undefined;
                const isSelected = id === selectedId;
                
                let preview = 'Click to start the chat';
                if (messages.length > 0 && lastMessage) {
                    if (lastMessage.type === ChatMessageType.Document) {
                        preview = 'Sent a file';
                    } else if (lastMessage.type === ChatMessageType.Plan) {
                        preview = 'Click to view proposed plan';
                    } else {
                        preview = lastMessage.content;
                    }
                }
                
                return (
                    <ChatListItem
                        id={id}
                        key={id}
                        isSelected={isSelected}
                        header={getFriendlyChatName(convo)}
                        timestamp={convo.lastUpdatedTimestamp ?? lastMessage?.timestamp ?? Date.now()}
                        preview={preview}
                        botProfilePicture={convo.botProfilePicture}
                    />
                );
            })}
        </div>
    ) : null;
};
