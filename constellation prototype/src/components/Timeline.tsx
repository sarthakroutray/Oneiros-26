import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const schedule = [
    { day: 'Day 1', title: 'Opening Ceremony & Art Exhibition', desc: 'The cosmos awakens. Inauguration followed by interstellar art installations.' },
    { day: 'Day 1', title: 'War of Bands', desc: 'College bands compete in an epic musical showdown under the night sky.' },
    { day: 'Day 2', title: 'Dance Battle & Fashion Show', desc: 'Gravity-defying dance moves and a cosmic catwalk through the stars.' },
    { day: 'Day 2', title: 'Stand-Up Comedy Night', desc: 'India\'s top comedians deliver a laughter supernova on stage.' },
    { day: 'Day 3', title: 'E-Sports & Short Film Fest', desc: 'Digital warriors clash while filmmakers premiere their cosmic sagas.' },
    { day: 'Day 3', title: 'Star Night & DJ Night', desc: 'The grand finale — celebrity performances and beats that shake the galaxy.' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function Timeline() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="section" id="schedule" ref={ref}>
            <motion.div
                className="section-header"
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                transition={{ duration: 0.7 }}
            >
                <p className="section-label">✦ The Cosmic Timeline</p>
                <h2 className="section-title">Festival Schedule</h2>
                <div className="section-divider" />
            </motion.div>

            <div className="timeline">
                {schedule.map((item, i) => (
                    <motion.div
                        className="timeline-item"
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                        transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                    >
                        <div className="timeline-dot" />
                        <div className="timeline-card">
                            <span className="timeline-day">{item.day}</span>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
