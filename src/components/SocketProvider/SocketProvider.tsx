
import socketIoClient from 'socket.io-client'
import { getItem } from '../../api/localStorage'


const SocketProvider = (props: any) => {

    const socket = socketIoClient('http://localhost:3500')


    // const emitActionEvent = () => {
    //     const username = getItem('username')
    //     socket.emit('action', { username })
    //     console.log('action')
    // }
    socket.connect()

    console.log(socket)


    socket.emit('action', {username: getItem('username')})

    return (
        <>
            {props.children}
        </>
    )
}

export default SocketProvider