import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, setDoc, getDocs, collection, arrayUnion, addDoc, updateDoc, onSnapshot, serverTimestamp, getDoc } from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import firebase from "firebase/app";
import NewChat from "./components/newChat/newChat";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default {
    fbPopup: async () => {
        const provider = new FacebookAuthProvider();



        try {
            const result = await signInWithPopup(auth, provider);

            const user = result.user;
            console.log('Usuário logado:', user);

            return result;
        } catch (error) {
            console.error("Erro ao fazer login com Facebook:", error);
        }

    },

    addUsers: async (u) => {

        try {
            await setDoc(doc(db, 'users', u.id), {
                Name: u.Name || u.name,
                avatar: u.avatar
            }, { merge: true });



        } catch (error) {
            console.log('ruim')
        }
    },

    getContactList: async (userId) => {
        const list = [];

        try {
            const querySnapshot = await getDocs(collection(db, 'users'));

            querySnapshot.forEach((doc) => {
                const data = doc.data();

                if (doc.id !== userId) {
                    list.push({
                        id: doc.id,
                        name: data.Name || data.name,
                        avatar: data.avatar
                    });
                    console.log('Usuário:', list);
                }
            });

            return list;
        } catch (error) {
            console.error('Erro ao buscar contatos:', error);
            return [];
        }
    },


    addNewChat: async (user, user2) => {
        try {

            const newChatRef = await addDoc(collection(db, 'chats'), {
                messages: [],
                users: [user.id, user2.id]
            });


            const user1Ref = doc(db, 'users', user.id);
            const user2Ref = doc(db, 'users', user2.id);


            await updateDoc(user1Ref, {
                chats: arrayUnion({
                    chatId: newChatRef.id || "0gn9JPHUeUUEfAoSUcfVW1l1Q3p2",
                    title: user2.name,
                    image: user2.avatar,
                    with: user2.id
                })
            });


            await updateDoc(user2Ref, {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    title: user.name,
                    image: user.avatar,
                    with: user.id
                })
            });

        } catch (error) {
            console.error('Erro ao adicionar novo chat:', error);
        }
    },

    onChatList: (userId, setChatList) => {
        const userDocRef = doc(db, 'users', userId);

        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();

                if (data.chats) {

                    let chats = [...data.chats]
                    chats.sort((a, b) => {
                        if (a.lastMessageDate === undefined) {
                            return -1
                        }

                        if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
                            return 1
                        } else { return -1 }
                    })

                    setChatList(chats);
                }
            }
        });

        return unsubscribe;
    },

    onChatContent: (chatId, setList, setUsers) => {
        const chatRef = doc(db, 'chats', chatId);

        return onSnapshot(chatRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setList(data.messages || []);
                setUsers(data.users)
            }
        });
    },

    sendMessage: async (chatData, userId, type, body, users) => {
        const chatRef = doc(db, 'chats', chatData.chatId);
        const now = new Date();

        try {
            await updateDoc(chatRef, {
                messages: arrayUnion({
                    type,
                    author: userId,
                    body,
                    date: now
                })
            });
            console.log('Mensagem enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }

        for (let i in users) {
            const userRef = doc(db, 'users', users[i]);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const uData = userSnap.data();

                if (uData.chats) {
                    const chats = [...uData.chats];

                    for (let e in chats) {
                        if (chats[e].chatId === chatData.chatId) {
                            chats[e].lastMessage = body;
                            chats[e].lastMessageDate = now;
                        }
                    }

                    try {
                        await updateDoc(userRef, { chats });
                    } catch (error) {
                        console.error(`Erro ao atualizar chats do usuário ${users[i]}:`, error);
                    }
                }
            }
        }
    }
}
