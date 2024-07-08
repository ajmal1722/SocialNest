import {
    FaHome,
    FaFacebookMessenger,
    FaUser,
} from 'react-icons/fa'
import { IoNotifications } from "react-icons/io5";
import { BsSave2Fill } from "react-icons/bs";

const sidebarData = [
    {
        name: 'Home',
        icon: FaHome,
        url: '/',
    },
    {
        name: 'Messages',
        icon: FaFacebookMessenger,
        url: '/messages',
    },
    {
        name: 'Notifications',
        icon: IoNotifications,
        url: '/notifications',
    },
    {
        name: 'Saved',
        icon: BsSave2Fill,
        url: '/saved-posts',
    },
    {
        name: 'Profile',
        icon: FaUser,
        url: '/profile',
    },
]

export default sidebarData
