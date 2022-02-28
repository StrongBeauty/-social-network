import { io } from "socket.io-client";

function createChanel() {
    const socket = io('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
}

export const ioAPI = {
    start() {
        createChanel()
    }
}
