import { makeStyles, shorthands } from '@fluentui/react-components';
import { FC } from 'react';
import { useAppSelector } from '../../redux/app/hooks';
import { RootState } from '../../redux/app/store';
import { ChatWindow } from '../chat/ChatWindow';
import { ChatList } from '../chat/chat-list/ChatList';

const useClasses = makeStyles({
    container: {
        ...shorthands.overflow('hidden'),
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'start',
        height: '100%',
    },
});

interface ChatViewProps {
    isChatListVisible?: boolean;
}

export const ChatView: FC<ChatViewProps> = ({ isChatListVisible = true }) => {
    const classes = useClasses();
    const { selectedId } = useAppSelector((state: RootState) => state.conversations);

    return (
        <div className={classes.container}>
            {isChatListVisible && <ChatList />}
            {selectedId !== '' && <ChatWindow />}
        </div>
    );
};
