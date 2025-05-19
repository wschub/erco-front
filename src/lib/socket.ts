import { io } from "socket.io-client";
const BASE_URL = import.meta.env.VITE_URL_SERVICE;
const socket = io(BASE_URL);

export default socket;