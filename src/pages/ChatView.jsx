import React from 'react'
import { Chats } from './chat/Chats'
import { ChatsDesktop } from './chat/ChatsDesktop'
import { Banner } from '../components/home/Banner'

const ChatView = () => {
    return (
        <div className='pb-10'>
            <div>
                <Banner />
                <h2 className='text-neutral-200 text-center font-bold text-2xl mb-4'>
                    Sala de Chat
                </h2>
            </div>
            <div className='hidden lg:block px-4'>
                <ChatsDesktop />
            </div>
            <div className='lg:hidden'>
                <Chats />
            </div>
        </div>
    )
}

export default ChatView