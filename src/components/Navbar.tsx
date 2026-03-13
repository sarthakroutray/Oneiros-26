import { useState, useCallback, useEffect } from 'react';
import './Navbar.css';

interface NavbarProps {
    onNavigate?: (page: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navMenuId = 'primary-navigation';

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;
        const className = 'mobile-nav-open';

        if (isMobileMenuOpen) {
            root.classList.add(className);
            body.classList.add(className);
        } else {
            root.classList.remove(className);
            body.classList.remove(className);
        }

        return () => {
            root.classList.remove(className);
            body.classList.remove(className);
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    const handleHomeClick = useCallback(() => {
        setIsMobileMenuOpen(false);
        onNavigate?.('');
    }, [onNavigate]);

    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        onNavigate?.(page);
    }, [onNavigate]);

    return (
        <nav className="cosmos-navbar font-manrope">
            <button type="button" className="cosmos-nav-logo mobile-logo nav-logo-btn" onClick={handleHomeClick} aria-label="Go to home">
                <img src="/oneiros-logo.webp" alt="ONEIROS" className="logo-img" width="300" height="56" />
            </button>

            <button
                type="button"
                className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle Navigation"
                aria-expanded={isMobileMenuOpen}
                aria-controls={navMenuId}
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            <div id={navMenuId} className={`nav-links-container ${isMobileMenuOpen ? 'mobile-visible' : ''}`}>
                <ul className="cosmos-nav-links left-links">
                    <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="font-medium tracking-[0.1em]">ABOUT</a></li>
                    <li><a href="#team" onClick={(e) => handleNavClick(e, 'team')} className="font-medium tracking-[0.1em]">TEAM</a></li>
                    <li><a href="#major-events" onClick={(e) => handleNavClick(e, 'major-events')} className="font-medium tracking-[0.1em]">MAJOR EVENTS</a></li>
                    <li><a href="#minor-events" onClick={(e) => handleNavClick(e, 'minor-events')} className="font-medium tracking-[0.1em]">MINOR EVENTS</a></li>
                </ul>
                <button type="button" className="cosmos-nav-logo desktop-logo nav-logo-btn" onClick={handleHomeClick} aria-label="Go to home">
                    <img src="/oneiros-logo.webp" alt="ONEIROS" className="logo-img" width="300" height="56" />
                </button>
                <ul className="cosmos-nav-links right-links">
                    <li><a href="#artist" onClick={(e) => handleNavClick(e, 'artist')} className="font-medium tracking-[0.1em]">ARTISTS</a></li>
                    <li><a href="#schedule" onClick={(e) => handleNavClick(e, 'schedule')} className="font-medium tracking-[0.1em]">SCHEDULE</a></li>
                    <li><a href="#sponsors" onClick={(e) => handleNavClick(e, 'sponsors')} className="font-medium tracking-[0.1em]">SPONSORS</a></li>
                    <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="font-medium tracking-[0.1em]">CONTACT</a></li>
                </ul>
            </div>
        </nav>
    );
}
