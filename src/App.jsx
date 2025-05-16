import React, { useEffect, useState } from 'react'
import './App.css'

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ChatList from './components/chatListItem/chatListItem';
import ChatIntro from './components/chatIntro/chatIntro';
import ChatWindow from './components/ChatWindow/ChatWindow'
import NewChat from './components/newChat/newChat';
import Login from './components/login/login';
import Api from './Api';



export default () => {

  const [chatList, setChatList] = useState([])

  const [user, setUser] = useState(null)
  const [activeChat, setActiveChat] = useState({})
  const [showNewChat, setShowNewChat] = useState(false)

  useEffect(() => {
    if (user !== null) {
      let unsub = Api.onChatList(user.id, setChatList)
      return unsub
    }
  }, [user])


  const AddNewChat = () => {
    setShowNewChat(true)
  }

  const logindata = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };

    try {
      await Api.addUsers(newUser)
      setUser(newUser)

    } catch (error) {
      console.log('erro')
    }


  }

  if (user === null) {
    return (<Login onReceive={logindata} />)
  }

  return (
    <div className='app-window'>
      <div className='green'></div>
      <div className='sidebar'>


        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>

          <img src={user.avatar} alt='Avatar' className='header-avatar' />


          <div className='header-buttons'>


            <div className='header-btn'>
              <DonutLargeIcon style={{ color: "#919191" }} />
            </div>

            <div className='header-btn'
              onClick={AddNewChat}
            >
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
          {(chatList || []).map((item, key) => (
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
            data={activeChat}
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
