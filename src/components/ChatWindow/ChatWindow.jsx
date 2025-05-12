import React, { useState } from 'react'
import './ChatWindow.css'
import EmojiPicker from 'emoji-picker-react';

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AddReactionIcon from '@mui/icons-material/AddReaction';

export default function ChatWindow() {

  const [emojiOpen, setEmojiOpen] = useState(false)
  const [text, setText] = useState('')



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

  return (
    <div className='chatWindow'>

      <div className='chatWindow--header'>

        <div className='chatWindow-headerinfo'>
          <img className='chatWindow-avatar' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyyYZ2N2uQrOktRkIsi1ZS0NBnq5VVXlpAw&s' alt='' />
          <div className='chatWindow-name'>Eduardo Guerra</div>
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



      <div className='chatWindow--body'>

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
          />

        </div>



        <div className='chatWindow-pos'>
          <div className='chatWindow-btn'>
            <SendIcon style={{ color: "#919191" }} />
          </div>

        </div>

      </div>

    </div>
  );
}
