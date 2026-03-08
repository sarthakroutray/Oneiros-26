import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import onoLogo from '../assets/onoL.png';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
};

const socials = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/mujoneiros/',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        label: 'Website',
        href: 'https://manipal.edu',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        label: 'Email',
        href: 'mailto:oneiros@muj.manipal.edu',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M22 7l-10 7L2 7" />
            </svg>
        ),
    },
];

const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Gallery', href: '#gallery' },
];

export default function Footer() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <footer className="footer" id="contact" ref={ref}>
            <motion.div
                className="footer-inner"
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={stagger}
            >
                {/* Big branding moment */}
                <motion.div className="footer-brand" variants={fadeUp}>
                    <img src={onoLogo} alt="Oneiros" className="footer-logo-img" />
                    <div className="footer-logo-large">ONEIROS</div>
                    <p className="footer-hero-tagline">See you among the stars ✦</p>
                </motion.div>

                {/* CTA */}
                <motion.div className="footer-cta-wrap" variants={fadeUp}>
                    <a href="#events" className="footer-cta">
                        <span>Explore Events</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </motion.div>

                {/* Links + Social row */}
                <motion.div className="footer-grid" variants={fadeUp}>
                    <div className="footer-col">
                        <h4 className="footer-col-title">Navigate</h4>
                        <div className="footer-nav-links">
                            {footerLinks.map(link => (
                                <a key={link.label} href={link.href} className="footer-nav-link">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-col footer-col-center">
                        <h4 className="footer-col-title">Connect</h4>
                        <div className="social-links">
                            {socials.map(({ label, href, icon }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="social-link"
                                    whileHover={{ scale: 1.12, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div className="footer-col footer-col-right">
                        <h4 className="footer-col-title">Festival</h4>
                        <p className="footer-info">Annual Cultural Festival</p>
                        <p className="footer-info">Manipal University Jaipur</p>
                        <p className="footer-info">Rajasthan, India</p>
                    </div>
                </motion.div>

                {/* Bottom bar */}
                <motion.div className="footer-bottom" variants={fadeUp}>
                    <p className="footer-copy">
                        © {new Date().getFullYear()} Oneiros · Manipal University Jaipur · All rights reserved
                    </p>
                    <p className="footer-made">
                        Crafted with ✦ by OnO MUJ
                    </p>
                </motion.div>
            </motion.div>
        </footer>
    );
}
