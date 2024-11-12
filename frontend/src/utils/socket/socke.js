import {io} from 'socket.io-client'

const socket = io('https://social-nest-backend.vercel.app')

export default socket