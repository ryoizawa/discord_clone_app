import ControlPointIcon from '@mui/icons-material/ControlPoint';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import React, { useEffect, useState } from 'react'
import "./Chat.scss"
import ChatHeader from './ChatHeader'
import GifIcon from '@mui/icons-material/Gif';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '../../app/hooks';
import { addDoc, collection, CollectionReference, DocumentData, DocumentReference, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { async } from '@firebase/util';
import useSubCollection from '../../hooks/useSubCollection';

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  }
}

const Chat = () => {
  const channelId = useAppSelector((state) => state.channel.channelId)
  const [inputText, setInputText] = useState<string>("");
  //const [messages, setMessages] = useState<Messages[]>([]) // 5. messagesの中に残るようになる
  const channelName = useAppSelector((state) => state.channel.channelName);
  const user = useAppSelector((state) => state.user.user)
  const {subDocuments: messages} = useSubCollection("channels", "messages")
  //console.log(channelName);

  

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // 送ったときにページをリロードするのを防ぐ
    // channelsコレクションの中にあるmessagesコレクションの中にメッセージ情報を入れる
  const collectionRef: CollectionReference<DocumentData> = collection(
    db, 
    "channels", 
    String(channelId), // typescriptのエラー。stringにキャスト 
    "messages"
    )
    const docRef: DocumentReference<DocumentData> = await addDoc(collectionRef, { //collectionRefに従ったものに入れる
      message: inputText,
      timestamp: serverTimestamp(),
      user: user, // 呼び出していないのでselectorで呼び出す。Reduxなのでどのファイルからでも呼び出せる
    })
    //console.log(docRef)
    setInputText("")
  }

  return (
    <div className='chat'>
        {/* chatHeader */}
        <ChatHeader channelName={channelName}/>
        {/* chatMessage */}
        <div className='chatMessage'>
          {messages.map((message, index) => (
            <ChatMessage
            key={index}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}/>
          ))}
            {/* <ChatMessage />
            <ChatMessage />
            <ChatMessage /> */}

        </div>
        {/* chatInput */}
        <div className='chatInput'>
        <ControlPointIcon />
          <form>
            <input
              type="text"
              placeholder='Send a message to #Udemy'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
              value={inputText}/>
            <button type="submit" className='chatInputButton' onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => sendMessage(e)}>Send</button>
          </form>
          <div className='chatInputIcons'>
            <CardGiftcardIcon />
            <GifIcon />
            <EmojiEmotionsIcon />
          </div>
        </div>
    </div>
  )
}

export default Chat