const navFooter = [
    {
        name: 'About',
        href: '/about',
    },
    {
        name: 'Privacy Policy',
        href: '/privacy-policy',
    },
    {
        name: 'Terms of Service',
        href: '/terms-of-service',
    },
    {
        name: 'Contact Us',
        href: '/contact-us',
    },
]


export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="flex justify-between items-center">
                <div className="text-lg font-bold">My Website</div>
                <ul className="flex space-x-4">
                    {navFooter.map((link) => (
                        <li key={link.name}>
                            <a href={link.href} className="hover:text-gray-400">{link.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}