import React from 'react'
import "./ChatHeader.scss"
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Help, Mail, PeopleAlt, PushPin, Send } from '@mui/icons-material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

type Props = {
    channelName: string | null
}

const ChatHeader = (props: Props) => {
    const {channelName} = props;
  return (
    <div className='chatHeader'>
        <div className='chatHeaderLeft'>
            <h3>
                <span className='chatHeaderHash'>#</span>
                {channelName}
            </h3>
        </div>
        <div className='chatHeaderRight'>
            <NotificationsIcon />
            <PushPin />
            <PeopleAlt />
            <div className='chatHeaderSearch'>
                <input type="text" placeholder='Search' />
                <ZoomInIcon />
            </div>
                <Send />
                <Help />
        </div>
    </div>
  )
}

export default ChatHeader