import React, { useEffect, useState } from "react";
import './newChat.css'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Api from "../../Api";


export default function NewChat({ chatList, user, show, setShow }) {

    const [list, setList] = useState([])

    useEffect(() => {

        const getList = async () => {
            if (user !== null) {
                let result = await Api.getContactList(user.id)
                setList(result)

            }
        }

        getList()

    }, [])


    const addNewChat = async (user2) => {

        if (!user || !user2) return;

        await Api.addUsers({
            id: user.id,
            name: user.name,
            avatar: user.avatar
        });

        await Api.addUsers({
            id: user2.id,
            name: user2.name,
            avatar: user2.avatar
        });

        await Api.addNewChat(user, user2);

    }

    const handleClose = () => {
        setShow(false)
    }




    return (
        <div className="newChat"
            style={{ left: show ? 0 : -415 }}
        >

            <div className="newChat-head">
                <div
                    className="newChat-backButton"
                    onClick={handleClose}
                >
                    <ArrowBackIcon style={{ color: '#FFF' }} />
                </div>
                <div className="newChat-headtitle">
                    nova conversa
                </div>
            </div>

            <div className="newChat-lista">
                {list.map((item, key) => (
                    <div
                        className="newChat-item"
                        key={key}
                        onClick={() => addNewChat(item)}
                    >
                        <img
                            className="newChat-avatar"
                            src={item.avatar} alt="" />

                        <div className="newChat-name">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
