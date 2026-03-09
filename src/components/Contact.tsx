import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import CosmicBackground from './CosmicBackground';
import './Contact.css';

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.contact-animate');
        if (!elements) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formRef.current) return;
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // TODO: Replace these with your actual EmailJS credentials
        // You can get these from https://dashboard.emailjs.com/
        const SERVICE_ID = 'service_xpl1j1u';
        const TEMPLATE_ID = 'template_b3ydgot';
        const PUBLIC_KEY = 'X3tahPLHPIo_zf6vn';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
            .then(() => {
                setSubmitStatus('success');
                if (formRef.current) formRef.current.reset();
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                setSubmitStatus('error');
            })
            .finally(() => {
                setIsSubmitting(false);
                // Clear success message after 5 seconds
                setTimeout(() => setSubmitStatus('idle'), 5000);
            });
    };

    return (
        <div className="contact-page" ref={sectionRef}>
            {/* ── FIXED BACKGROUND ──────── */}
            <div className="contact-fixed-bg">
                <CosmicBackground />
            </div>
            <img
                src="/favicon-nobg.webp"
                alt=""
                className="contact-fixed-watermark"
                draggable={false}
            />

            {/* ── HERO ───────────────────────────────── */}
            <section className="contact-hero">
                <h1 className="contact-hero-title">CONTACT US</h1>

                <p className="contact-hero-tagline">
                    REACH ACROSS THE STARS
                    <span className="tagline-dot">·</span>
                    CONNECT WITH US
                </p>

                <div className="contact-hero-scroll">
                    <div className="contact-hero-scroll-line" />
                    <span className="contact-hero-scroll-text">Scroll</span>
                </div>
            </section>

            {/* ── CONTENT SECTIONS ───────────────────────────────────────── */}
            <div className="contact-lower-wrapper">
                <section className="contact-content">
                    <div className="contact-content-inner">
                        <p className="contact-label contact-animate contact-animate-delay-1">
                            COMMUNICATIONS
                        </p>

                        <h2 className="contact-heading contact-animate contact-animate-delay-2">
                            Get In Touch
                        </h2>

                        <p className="contact-subheading contact-animate contact-animate-delay-3">
                            Questions, collaborations, or inquiries? Drop us a signal.
                        </p>

                        <div className="contact-flex-container">

                            {/* ── CONTACT INFO SIDE ────────────────────────── */}
                            <div className="contact-info-side contact-animate contact-animate-delay-4">
                                <div className="contact-info-card">
                                    <h3 className="info-card-title">Location</h3>
                                    <p className="info-card-detail">
                                        Manipal University Jaipur<br />
                                        Dehmi Kalan, Jaipur-Ajmer Expressway<br />
                                        Jaipur, Rajasthan 303007
                                    </p>
                                </div>
                                <div className="contact-info-card">
                                    <h3 className="info-card-title">Agam Bhasin</h3>
                                    <p className="info-card-detail">
                                        <a href="mailto:bhasinagamm@gmail.com">bhasinagamm@gmail.com</a><br />
                                        +91 86014 44494
                                    </p>
                                </div>
                                <div className="contact-info-card">
                                    <h3 className="info-card-title">Janvi Chawla</h3>
                                    <p className="info-card-detail">
                                        <a href="mailto:JanviChawla2615@gmail.com">JanviChawla2615@gmail.com</a><br />
                                        +91 84338 21606
                                    </p>
                                </div>
                            </div>

                            {/* ── FORM SIDE ────────────────────────────────── */}
                            <div className="contact-form-side contact-animate contact-animate-delay-4">
                                <form ref={formRef} onSubmit={sendEmail} className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" name="name" required placeholder="John Doe" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" name="email" required placeholder="john@example.com" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="title">Subject</label>
                                        <input type="text" id="title" name="title" required placeholder="How can we help?" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" name="message" required placeholder="Your message here..."></textarea>
                                    </div>

                                    <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                        {isSubmitting ? 'Transmitting...' : 'Send Message'}
                                    </button>

                                    {submitStatus === 'success' && (
                                        <div className="form-message success">
                                            Message sent successfully! We will get back to you soon.
                                        </div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <div className="form-message error">
                                            Failed to send message. Please try again later or email us directly.
                                        </div>
                                    )}
                                </form>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
