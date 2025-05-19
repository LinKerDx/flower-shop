const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
]


export default function Header() {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between items-center">
                <div className="text-2xl font-bold">My Website</div>
                <ul className="flex space-x-4">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a href={link.path} className="hover:text-gray-400">{link.name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}