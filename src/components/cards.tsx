import { useEffect, useState } from "react";
import "./cards.scss";

const getSocialIcon = (url: string) => {
    const icons: { [key: string]: string } = {
        instagram: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png',
        facebook: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
        x: 'https://cdn.worldvectorlogo.com/logos/x-2.svg',
        linkedin: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/500px-LinkedIn_logo_initials.png',
        youtube: 'https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png',
        github: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
        pinterest: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Pinterest_Logo_2017.svg',
        tiktok: 'https://cdn.worldvectorlogo.com/logos/tiktok-icon-2.svg',
        whatsapp: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
        snapchat: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Snapchat_logo_2021.svg',
        reddit: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Reddit_logo_2023.svg',
        tumblr: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Tumblr_logo_2023.svg',
        vimeo: 'https://www.svgrepo.com/show/156567/vimeo.svg',
        discord: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Discord_logo.svg',
        telegram: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Telegram_Logo_2021.svg',
        twitch: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Twitch_Logo_2019.svg'
    };

    for (let platform in icons) {
        if (url.includes(platform)) {
            return icons[platform];
        }
    }

    return 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Icon_default.svg'; // Ícone padrão
};

const Cards = ({ link, name }: { link: string, name: string }) => {
    const [icon, setIcon] = useState<string>('');

    useEffect(() => {
        const socialIcon = getSocialIcon(link);
        setIcon(socialIcon);
    }, [link]);

    return (
        <div className="card">
            <a href={link.startsWith("http") ? link : `https://${link}`} target="_blank" rel="noopener noreferrer" className="card">
                <img src={icon} alt={`${name} Icon`} className="social-icon" />
                <p>{name}</p>
            </a>
        </div>
    );
};

export default Cards;
