import React, { useEffect, useRef, useState } from 'react'
import './ChatWindow.css'
import EmojiPicker from 'emoji-picker-react';
import MessageItem from '../MessageItem/MessageItem';

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import Api from '../../Api';


export default function ChatWindow({ user, data }) {

  const body = useRef()

  let recognition = null
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition()
  }


  const [emojiOpen, setEmojiOpen] = useState(false)
  const [text, setText] = useState('')
  const [listening, setListening] = useState(false)
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
    }
  }, [list])


  useEffect(() => {
    setList([])
    let unsub = Api.onChatContent(data.chatId, setList, setUsers)
    return unsub

  }, [data.chatId])



  const handleEmojiClick = (e, emojiObject) => {
    console.log(e.emoji)

    setText((prevText) => prevText + e.emoji)

  }

  const handleOpenEmoji = () => {
    setEmojiOpen(true)
  }



  const handleCloseEmoji = () => {
    setEmojiOpen(false)
  }


  const handleMicClik = () => {
    if (recognition !== null) {

      recognition.onstart = () => {
        setListening(true)
      }
      recognition.onend = () => {
        setListening(false)
      }

      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript)
      }

      recognition.start()


    }


  }

  const hadleKeyUp = (e) => {
    if (e.keyCode == 13) {

      handleSendClik()
    }
  }

  const handleSendClik = () => {

    if (text !== '') {
      Api.sendMessage(data, user.id, 'text', text, users)
      setText('')
      setEmojiOpen(false)
    }


  }


  return (
    <div className='chatWindow'>

      <div className='chatWindow--header'>

        <div className='chatWindow-headerinfo'>
          <img className='chatWindow-avatar' src={data.image} alt='' />
          <div className='chatWindow-name'>{data.title}</div>
        </div>

        <div className='chatWindow-headerbuttons'>
          <div className='chatWindow-btn'>
            <SearchIcon style={{ color: "#919191" }} />
          </div>
          <div className='chatWindow-btn'>
            <AttachFileIcon style={{ color: "#919191" }} />
          </div>
          <div className='chatWindow-btn'>
            <MoreVertIcon style={{ color: "#919191" }} />
          </div>
        </div>

      </div>



      <div className='chatWindow--body' ref={body}>
        {list.map((item, key) => (
          <MessageItem
            key={key}
            data={item}
            user={user}
          />

        ))}
      </div>


      <div className='chatWindow-emojiarea' style={{ height: emojiOpen ? '350px' : '0px' }}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          searchDisabled
          defaultSkinTone='false'
        />
      </div>



      <div className='chatWindow--footer'>

        <div className='chatWindow-pre'>


          <div className='chatWindow-btn' onClick={handleCloseEmoji} style={{ width: emojiOpen ? 40 : 0 }}>
            <CloseIcon style={{ color: "#919191" }} />
          </div>

          <div className='chatWindow-btn' onClick={handleOpenEmoji} >
            <AddReactionIcon style={{ color: emojiOpen ? '#009688' : "#919191" }} />
          </div>


        </div>



        <div className='chatWindow-inputarea'>


          <input
            className='chatWindow-input'
            type='text'
            placeholder='Digite uma mensagem'
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyUp={hadleKeyUp}
          />

        </div>



        <div className='chatWindow-pos'>

          {text === '' &&
            <div className='chatWindow-btn'>
              <KeyboardVoiceIcon
                onClick={handleMicClik}
                style={{ color: listening ? '#126ECE' : "#919191" }} />
            </div>
          }
          {text !== '' &&
            <div className='chatWindow-btn'>
              <SendIcon
                onClick={handleSendClik}
                style={{ color: "#919191" }} />
            </div>
          }
        </div>

      </div>

    </div>
  );
}
