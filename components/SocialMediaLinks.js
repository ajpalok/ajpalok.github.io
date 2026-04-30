import { SocialIcon } from './SVGS';

export default function SocialMediaLinks({ className = "" }) {
    const data = SocialMediaLinksJSON();
    const links = (data && data[0] && data[0].en && data[0].en.links) || [];

    return (
        <>
            {links.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    title={link.name}
                    className={`text-gray-400 hover:text-white flex justify-center items-center transition-colors p-1 rounded ${className}`}
                >
                    <span className="sr-only">{link.name}</span>
                    <SocialIcon iconName={link.icon} className="w-6 h-6 fill-white" />
                </a>
            ))}
        </>
    );
}

export function SocialMediaLinksJSON() {
    return [
        {
            en: {
                title: "Connect with me on social media",
                links: [
                    {
                        name: "GitHub",
                        url: "https://github.com/ajpalok",
                        username: "ajpalok",
                        icon: "github"
                    },
                    {
                        name: "LinkedIn",
                        url: "https://linkedin.com/in/ajpalok",
                        username: "ajpalok",
                        icon: "linkedin"
                    },
                    {
                        name: "Stack Overflow",
                        url: "https://stackoverflow.com/users/14387700",
                        username: "14387700",
                        icon: "stackoverflow"
                    },
                    {
                        name: "Twitter",
                        url: "https://twitter.com/ajpalok",
                        username: "ajpalok",
                        icon: "twitter"
                    },
                    {
                        name: "Instagram",
                        url: "https://instagram.com/ajpalok_insta",
                        username: "ajpalok_insta",
                        icon: "instagram"
                    },
                    {
                        name: "Facebook",
                        url: "https://facebook.com/ajpalok.fb",
                        username: "ajpalok.fb",
                        icon: "facebook"
                    },
                    {
                        name: "YouTube",
                        url: "https://youtube.com/@ajpalok",
                        username: "@ajpalok",
                        icon: "youtube"
                    },
                    {
                        name: "Medium",
                        url: "https://medium.com/@ajpalok",
                        username: "@ajpalok",
                        icon: "medium"
                    },
                    {
                        name: "Telegram",
                        url: "https://t.me/ajpalok",
                        username: "@ajpalok",
                        icon: "telegram"
                    }
                ]
            }
        }
    ];
}