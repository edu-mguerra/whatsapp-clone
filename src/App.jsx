import React, { useState } from 'react'
import './App.css'

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ChatList from './components/chatListItem/chatListItem';
import ChatIntro from './components/chatIntro/chatIntro';
import ChatWindow from './components/ChatWindow/ChatWindow'



export default () => {

  const [chatList, setChatList] = useState([
    { chatId: 1, title: "Eduardo", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyyYZ2N2uQrOktRkIsi1ZS0NBnq5VVXlpAw&s' },
    { chatId: 2, title: "Eduardo", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyyYZ2N2uQrOktRkIsi1ZS0NBnq5VVXlpAw&s' },
    { chatId: 3, title: "Eduardo", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyyYZ2N2uQrOktRkIsi1ZS0NBnq5VVXlpAw&s' },
    { chatId: 4, title: "Eduardo", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyyYZ2N2uQrOktRkIsi1ZS0NBnq5VVXlpAw&s' }
  ])

  const [user, setUser] = useState({
    id: 1234,
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyyYZ2N2uQrOktRkIsi1ZS0NBnq5VVXlpAw&s',
    name: 'Eduardo Guerraa'
  })
  const [activeChat, setActiveChat] = useState({})


  return (
    <div className='app-window'>
      <div className='green'></div>
      <div className='sidebar'>

        <header>

          <img src={user.avatar} alt='Avatar' className='header-avatar' />


          <div className='header-buttons'>


            <div className='header-btn'>
              <DonutLargeIcon style={{ color: "#919191" }} />
            </div>

            <div className='header-btn'>
              <ChatIcon style={{ color: "#919191" }} />
            </div>

            <div className='header-btn'>
              <MoreVertIcon style={{ color: "#919191" }} />
            </div>


          </div>
        </header>

        <div className='search'>
          <div className="search-input">
            <SearchIcon fontSize='small' style={{ color: "#919191" }} />
            <input type='search' placeholder='Pesquisar' />
          </div>
        </div>

        <div className='chatlist'>
          {chatList.map((item, key) => (
            <ChatList
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              // verifica que activeChat.chatId que eu cliquei foi igual o que vai abrir/aberto (chatList[key].chatId) muda a cor
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}

        </div>


      </div>
      <div className='content-area'>

        {activeChat.chatId !== undefined &&
          <ChatWindow
            user={user}
          />
        }
        {activeChat.chatId === undefined &&

          <ChatIntro />
        }


      </div>
    </div>
  )
}
