import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const events = [
    {
        icon: '🎸',
        title: 'War of Bands',
        description: 'Battle of the best college bands. Raw energy, epic riffs, and thunderous applause under the stars.',
        tag: 'Music',
    },
    {
        icon: '🎧',
        title: 'DJ Night',
        description: 'An interstellar sonic journey with India\'s top DJs spinning cosmic beats till the stars fade.',
        tag: 'Music',
    },
    {
        icon: '👗',
        title: 'Fashion Show',
        description: 'A runway through the galaxy — where fashion meets futurism in a spectacular cosmic catwalk.',
        tag: 'Fashion',
    },
    {
        icon: '🎤',
        title: 'Stand-Up Comedy',
        description: 'Laugh your way through the cosmos with India\'s funniest comedians lighting up the stage.',
        tag: 'Comedy',
    },
    {
        icon: '💃',
        title: 'Dance Battle',
        description: 'Gravity-defying moves and stellar choreography. Dance crews unleash their cosmic energy.',
        tag: 'Dance',
    },
    {
        icon: '🎨',
        title: 'Art Exhibition',
        description: 'From nebula paintings to constellation sculptures — an artistic journey across the universe.',
        tag: 'Art',
    },
    {
        icon: '🎬',
        title: 'Short Film Fest',
        description: 'Student filmmakers showcase cinematic stories that transport you to other worlds.',
        tag: 'Film',
    },
    {
        icon: '🏆',
        title: 'E-Sports Arena',
        description: 'Competitive gaming tournaments across multiple titles. Battle for galactic supremacy.',
        tag: 'Gaming',
    },
    {
        icon: '⭐',
        title: 'Star Night',
        description: 'The grand finale featuring celebrity performances and Bollywood stars under the open sky.',
        tag: 'Headline',
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function Events() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="section" id="events" ref={ref}>
            <motion.div
                className="section-header"
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                transition={{ duration: 0.7 }}
            >
                <p className="section-label">✦ What Awaits You</p>
                <h2 className="section-title">Stellar Events</h2>
                <p className="section-description">
                    From music to art, comedy to fashion — every corner of the cosmos has something for you.
                </p>
                <div className="section-divider" />
            </motion.div>

            <div className="events-grid">
                {events.map((event, i) => (
                    <motion.div
                        className="event-card"
                        key={event.title}
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{
                            delay: i * 0.08,
                            duration: 0.6,
                            ease: 'easeOut',
                        }}
                        whileHover={{ y: -8 }}
                    >
                        <span className="event-icon">{event.icon}</span>
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <span className="event-tag">{event.tag}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
