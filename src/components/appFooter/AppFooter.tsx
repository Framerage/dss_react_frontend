import React from "react";
import {useLocation} from "react-router-dom";
import classes from "./appFooter.module.css";

import VkIcon from "assets/icons/vk.svg";
import WhatsappIcon from "assets/icons/whatsapp.svg";
import TelegramIcon from "assets/icons/telegram.svg";
const sharedContacts = [
  {
    name: "Telegram",
    link: "https://telegram.me/share/url?url=",
    img: TelegramIcon,
  },
  {
    name: "Whatsapp",
    link: "https://wa.me/?text=",
    img: WhatsappIcon,
  },
  {
    name: "Vkontakte",
    link: "https://vk.com/share.php?text=",
    img: VkIcon,
  },
];
//TODO: check убрать при деплое на реальный серв
const domen = "framerage.github.io";
const AppFooter: React.FC = () => {
  const router = useLocation();
  const currentPath = domen + router.pathname;

  return (
    <div className={classes.footerContainer}>
      Share in:
      {sharedContacts.map(link => (
        <a
          key={link.name}
          href={link.link + currentPath}
          title={link.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={link.img} alt="footerLink" width={35} height={35} />
        </a>
      ))}
    </div>
  );
};
export default AppFooter;
