import { SocialIcon } from './SVGS';
import { getSocialMediaLinksJSON } from '@/lib/social-links';

export default function SocialMediaLinks({ className = "" }) {
    const data = getSocialMediaLinksJSON();
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
                    className={`group flex justify-center items-center transition-colors p-1 rounded ${className}`}
                >
                    <span className="sr-only">{link.name}</span>
                    <SocialIcon iconName={link.icon} className="w-6 h-6 fill-ink-3 group-hover:fill-accent transition-colors" />
                </a>
            ))}
        </>
    );
}

export function SocialMediaLinksJSON() {
    return getSocialMediaLinksJSON();
}