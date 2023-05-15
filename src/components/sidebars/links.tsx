import { AiOutlineHome } from "solid-icons/ai";
import { CgProfile, CgMoreO } from "solid-icons/cg";
import { IoNotificationsCircleOutline } from "solid-icons/io";
import { RiMapCompassDiscoverLine } from "solid-icons/ri";

const SIZE = 24;

export const links = [
    {
        name: 'Home',
        href: '/',
        icon: () =>  <AiOutlineHome size={SIZE} />
    },
    {
        name: 'Profile',
        href: '/profile',
        icon: () =>  <CgProfile size={SIZE} />
    },
    {
        name: 'More',
        href: '/auth/login',
        icon: () =>  <CgMoreO size={SIZE} />
    },
    {
        name: 'Notification',
        href: '/notification',
        icon: () =>  <IoNotificationsCircleOutline size={SIZE} />
    },
    {
        name: 'Discover',
        href: '/discover',
        icon: () =>  <RiMapCompassDiscoverLine size={SIZE} />
    }
]