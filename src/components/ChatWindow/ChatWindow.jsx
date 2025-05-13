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

export default function ChatWindow({ user }) {

  const body = useRef()

  let recognition = null
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition()
  }


  const [emojiOpen, setEmojiOpen] = useState(false)
  const [text, setText] = useState('')
  const [listening, setListening] = useState(false)
  const [list, setList] = useState([
    { author: 123, body: 'Oi, tudo bem?' },
    { author: 1234, body: 'Oi! Tudo sim, e com você?' },
    { author: 123, body: 'Também estou bem. Como foi seu fim de semana?' },
    { author: 1234, body: 'Foi tranquilo. Saí um pouco no sábado e fiquei em casa no domingo. E o seu?' },
    { author: 123, body: 'Fui visitar meus pais. A gente fez um churrasco, foi bem legal.' },
    { author: 1234, body: 'Que delícia! Faz tempo que não como um bom churrasco.' },
    { author: 123, body: 'Pois é, estava com saudade disso também.' },
    { author: 1234, body: 'Você ainda está trabalhando naquele projeto da empresa?' },
    { author: 123, body: 'Sim! Estamos na reta final, mas ainda tem muita coisa pra ajustar.' },
    { author: 1234, body: 'Imagino! Esses momentos finais sempre dão mais trabalho.' },
    { author: 123, body: 'Verdade. Mas estou confiante de que vai dar tudo certo.' },
    { author: 1234, body: 'Se precisar de ajuda com alguma coisa, me avisa.' },
    { author: 123, body: 'Obrigado! Vou lembrar disso sim.' },
    { author: 1234, body: 'Aliás, lembra daquela viagem que a gente estava planejando?' },
    { author: 123, body: 'Claro! Já pensou em alguma data?' },
    { author: 1234, body: 'Estava pensando no feriado do mês que vem. O que acha?' },
    { author: 123, body: 'Boa! Dá pra emendar com o fim de semana.' },
    { author: 1234, body: 'Exato! Aí conseguimos aproveitar mais.' },
    { author: 123, body: 'Tem algum destino em mente?' },
    { author: 1234, body: 'Pensei em ir pra serra. Um lugar mais tranquilo, natureza, lareira...' },
    { author: 123, body: 'Adorei a ideia! Um friozinho agora ia cair bem.' },
    { author: 1234, body: 'Então vou pesquisar alguns lugares e te mando.' },
    { author: 123, body: 'Fechado. Já estou animado.' },
    { author: 1234, body: 'Eu também! Vai ser ótimo dar uma desligada.' },
    { author: 123, body: 'Total. E com boa companhia, melhor ainda.' },
    { author: 1234, body: 'Haha! Concordo plenamente.' },
    { author: 123, body: 'Aliás, você viu a nova série da Netflix?' },
    { author: 1234, body: 'Vi sim! Assisti os três primeiros episódios ontem.' },
    { author: 123, body: 'E aí, o que achou?' },
    { author: 1234, body: 'Achei bem interessante. Meio lenta no começo, mas depois engrena.' },
    { author: 123, body: 'Boa! Vou começar hoje à noite, então.' },
    { author: 1234, body: 'Depois me conta o que achou.' },
    { author: 123, body: 'Combinado! Valeu pela dica.' },
    { author: 1234, body: 'Imagina! Gosto de trocar essas sugestões com você.' },
    { author: 123, body: 'A gente tem um gosto parecido, né?' },
    { author: 1234, body: 'Pois é! Acho que é por isso que sempre dá certo.' },
    { author: 123, body: 'Bom, preciso voltar aqui pro trabalho. Depois a gente continua esse papo!' },
    { author: 1234, body: 'Beleza! Boa sorte aí e até mais tarde :)' },
    { author: 123, body: 'Obrigado! Até mais :)' }
  ])

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
    }
  }, [list])



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

  const handleSendClik = () => {



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
