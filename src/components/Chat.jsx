import React, { useState, useEffect, useRef, useContext } from 'react';
import chatContext from '../chatContext/ChatContext'
import userContext from '../userContext/UserContext';
const Chat = () => {
    const [cmessage, setCMessage] = useState("");
    const {sendMessage,messageList} = useContext(chatContext);
    const {user}=useContext(userContext);



    const handleSubmit = async (event) => {

        event.preventDefault();

        const messageData = {
            content: cmessage,
            time: new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),

            sender:user
        };
        
        if(cmessage!=="") sendMessage(messageData);
        setCMessage('');
        console.log(messageData);



    }
    const messageEl = useRef(null);

    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
        // setMessageList(messages)
    }, []);
   
    // console.log(messageList);

    return (
        <>
            <div ref={messageEl} className="flex  flex-col scroll-smooth chat-feed overflow-y-scroll  no-scrollbar  m-4 mt-0 pl-5 pb-7 h-3/4">

                {messageList.map((msg, i) => {
                    return (
                        <ul className={msg.sender.name === user.name ? "flex flex-col items-end mb-5" : "flex flex-col items-start mb-5"} key={i}>
                                <span className='font-extralight text-xs'>{msg.sender.name}</span>
                            <li className={msg.sender.name === user.name ? "flex flex-col shadow-inner shadow-slate-300 rounded-bl-3xl rounded-tr-3xl  rounded-tl-3xl p-3 m-1 bg-blue-300" : "flex flex-col shadow-inner shadow-slate-300 rounded-br-3xl rounded-tl-3xl  rounded-tr-3xl w-fit p-3 m-1 bg-white text-black "}>
                                <p className="overflow-wrap  font-medium mx-2">{msg.content}</p>
                            </li>

                        </ul>

                    );

                })}


            </div>
            <div className="flex absolute  bottom-0 pb-4 px-3 " style={{ width: "-webkit-fill-available" }}>
                <form onSubmit={handleSubmit} style={{ width: "-webkit-fill-available" }} action="" method='post'>
                    <div className="flex shadow-inner shadow-slate-300 justify-center rounded-2xl  bg-white  " style={{ width: "-webkit-fill-available" }}>
                        <input type="text" value={cmessage} onChange={(e) => setCMessage(e.target.value)} className='px-5 rounded-l-2xl bg-transparent focus:outline-none text-lg' style={{ width: "-webkit-fill-available" }} placeholder='Write Your Message..' />
                        <button type='submit' className='m-2  px-3 py-2 rounded-xl bg-blue-500 hover:opacity-70' ><i className="fa-solid fa-paper-plane text-white"></i></button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Chat
