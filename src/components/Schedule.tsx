import { useEffect, useRef, useState } from 'react';
import './Schedule.css';

type EventType = 'major' | 'minor';
type ActiveDay = 'day1' | 'day2' | 'day3';

type ScheduleItem = {
    time: string;
    event: string;
    venue: string;
};

type ScheduleDataType = {
    [K in EventType]: {
        [D in ActiveDay]: ScheduleItem[];
    };
};

const scheduleData: ScheduleDataType = {
    major: {
    day1: [
        { time: '11:30 AM - 12:30 PM', event: 'Opening Ceremony', venue: 'Smt. Vasanti Pai Auditorium' },
        { time: '01:00 PM - 02:00 PM', event: 'Behas', venue: 'AB3 / LHC' },
        { time: '02:00 PM - 03:30 PM', event: 'Destival Prelims', venue: 'Main Stage' },
        { time: '05:00 PM - 05:30 PM', event: 'Cake Cutting', venue: 'Main Stage' },
        { time: '05:30 PM - 07:30 PM', event: 'Destival Finals', venue: 'Main Stage' },
        { time: '07:30 PM onwards', event: 'Minor Artist Performance', venue: 'Main Stage' }
    ],

    day2: [
        { time: '10:00 AM - 02:00 PM', event: 'Battle of Bands Prelims', venue: 'Main Stage' },
        { time: '02:00 PM - 04:00 PM', event: 'Cosmos Prelims', venue: 'Smt. Vasanti Pai Auditorium' },
        { time: '04:00 PM - 06:00 PM', event: 'Battle of Bands Finals', venue: 'Main Stage' },
        { time: '06:00 PM - 07:30 PM', event: 'Cosmos Finals', venue: 'Smt. Vasanti Pai Auditorium' },
        { time: '07:30 PM onwards', event: 'DJ Night', venue: 'Main Stage' }
    ],

    day3: [
        { time: '11:00 AM - 05:00 PM', event: 'Nukkad Natak', venue: 'Front of Grand Stairs' },
        { time: '05:00 PM - 07:00 PM', event: 'Sound Check', venue: 'Main Stage' },
        { time: '07:00 PM onwards', event: 'Major Artist Performance', venue: 'Main Stage' }
    ]
},
    minor: {
        day1: [
            { time: '10:00 AM', event: 'TMC (Octaves)', venue: 'Sharada Pai' },
            { time: '11:00 AM', event: '180 DC (Follow Your Dreams 3.0)', venue: 'TMA Pai' },
            { time: '12:30 PM', event: 'Human Rights Cell (Blueprints of Justice)', venue: 'Sharada Pai' },
            { time: '12:30 PM', event: 'Destival PRELIMS', venue: 'Vasanti Pai' },
            { time: '01:00 PM', event: 'Spicmacay (Sanskriti)', venue: 'TMA Pai' },
            { time: '02:00 PM', event: 'Panacea / OMPHALOS / IRC / Her Campus', venue: 'AB1 (Various Rooms)' },
            { time: '02:00 PM', event: 'Cyber Space Club / IEEE WIE', venue: 'AB1 307 / 007, 008' },
            { time: '02:00 PM', event: 'Pitcher\'s Craft / Marksoc / GOONJ', venue: 'AB2 (201-205, 213, 026)' },
            { time: '02:00 PM', event: 'Coreo / Litmus (Behas)', venue: 'AB3 (010-012, 008-019)' },
            { time: '02:00 PM', event: 'TMC (Dhwani)', venue: 'Sharada Pai' },
            { time: '02:00 PM', event: 'ACM SIGBED / APEX / Managia', venue: 'AB1 Lobby / AB2 Gallery / Staircase' },
            { time: '02:00 PM', event: 'Various Club Activities', venue: 'Old Mess Area' },
            { time: '03:00 PM', event: 'Earth Club (Consumer Protection Cell)', venue: 'Old Mess (AB1 Entry Right)' },
            { time: '04:00 PM', event: 'Devforge / Cinefilia', venue: 'AB1 308 / AB1 Cheffie Lawn' },
            { time: '04:00 PM', event: 'Requiem & Cosmos PRELIMS', venue: 'Vasanti Pai' },
            { time: '04:00 PM', event: '180 DC (Follow Your Dreams 3.0)', venue: 'Sharada Pai' }
        ],
        day2: [
            { time: '10:00 AM', event: 'Litmus (Behas)', venue: 'LHC 101, 102' },
            { time: '11:00 AM', event: 'Coreo (Ground 0)', venue: 'AB1 014, 015' },
            { time: '11:00 AM', event: 'ACM Student Chapter (Interstellar Mission)', venue: 'AB1 110-114' },
            { time: '12:00 PM', event: 'IEEE SB (Checkmate)', venue: 'AB1 018-020' },
            { time: '12:00 PM', event: 'Garuda Club (Operation Talaash)', venue: 'AB2 026' },
            { time: '12:00 PM', event: 'TMC & D Club (Cosmos & Requiem Prelims)', venue: 'AB3 010-012' },
            { time: '01:00 PM', event: 'Managia (Traitors)', venue: 'AB1 224-229' },
            { time: '01:00 PM', event: 'OMPHALOS (Among Us in Real Life 2.0)', venue: 'AB1 117A-D' },
            { time: '02:00 PM', event: 'Nexus MUJ / Her Campus / COSMOS', venue: 'AB1 (119, 126, 307)' },
            { time: '02:00 PM', event: 'Coreographia / Rotaract (Carnival)', venue: 'AB1 Lobby' },
            { time: '02:00 PM', event: 'Green Rooms (Nukkad Natak)', venue: 'AB2 028-030' },
            { time: '02:00 PM', event: 'APEX / IEI Student Chapter', venue: 'AB2 Gallery / Grand Staircase Lawn' },
            { time: '02:00 PM', event: 'Scribbles / Convergence / Cypher', venue: 'Old Mess Area' },
            { time: '04:00 PM', event: 'IEEE CIS MUJ (AI Model Quest)', venue: 'AB1 212, 213' },
            { time: '04:00 PM', event: 'Litmus (Behas Closing)', venue: 'Sharada Pai' }
        ],
        day3: [
            { time: '11:00 AM', event: 'Turing Sapiens (TuringPrompt)', venue: 'AB1 026, 027' },
            { time: '01:00 PM', event: 'Marksoc (Fanbase Face-off)', venue: 'AB1 026, 027' },
            { time: '01:00 PM', event: 'Cyber Space Club (Cyber Sphere 360)', venue: 'AB1 307, 312, 328' },
            { time: '01:30 PM', event: 'EIS (CEO For a Day)', venue: 'AB1 311' },
            { time: '02:00 PM', event: 'Coreo (Nextar)', venue: 'AB3 010-012 & Vasanti Pai' },
            { time: '02:00 PM', event: 'Cine (Stage Play)', venue: 'AB3 008' },
            { time: '02:00 PM', event: '180 DC (Follow Your Dreams 3.0)', venue: 'Sharada Pai' },
            { time: '02:00 PM', event: 'Qureka and Marksoc (Fanbase Face-off)', venue: 'TMA Pai' },
            { time: '02:00 PM', event: 'TMC (Woodstock)', venue: 'AB1 Lobby' },
            { time: '02:00 PM', event: 'APEX (Apex Metaverse)', venue: 'AB2 Gallery' },
            { time: '02:00 PM', event: 'Teach for India / CACTUS / Aperture', venue: 'Old Mess / LHC Area' },
            { time: '02:00 PM', event: 'Pratishodh (Nukkad Nattak)', venue: 'Grand Staircase Lawn' }
        ]
    }
};

export default function Schedule() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [eventType, setEventType] = useState<EventType>('major'); 
    const [activeDay, setActiveDay] = useState<ActiveDay>('day1');

    useEffect(() => {
        const elements = sectionRef.current?.querySelectorAll('.schedule-animate');
        if (!elements) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.15 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [activeDay, eventType]);

    const handleTypeChange = (type: EventType) => {
        setEventType(type);
        setActiveDay('day1');
    };

    return (
        <div className="schedule-page" ref={sectionRef}>

            {/* ── HERO ───────────────────────────────── */}
            <section className="schedule-hero">
                <h1 className="schedule-hero-title schedule-animate">SCHEDULE</h1>
                <p className="schedule-hero-tagline schedule-animate schedule-animate-delay-1">
                    EVERY MOMENT
                    <span className="schedule-tagline-dot">·</span>
                    PLANNED TO PERFECTION
                </p>
            </section>

            {/* ── SCHEDULE CONTENT SECTION ───────────── */}
            <section className="schedule-content">
                <p className="schedule-label schedule-animate">ONEIROS 2026</p>
                
                {/* MAJOR / MINOR TOGGLE */}
                <div className="schedule-type-toggle schedule-animate schedule-animate-delay-1">
                    <button 
                        className={`type-toggle-btn ${eventType === 'major' ? 'active' : ''}`}
                        onClick={() => handleTypeChange('major')}
                    >
                        Major Events
                    </button>
                    <button 
                        className={`type-toggle-btn ${eventType === 'minor' ? 'active' : ''}`}
                        onClick={() => handleTypeChange('minor')}
                    >
                        Minor Events
                    </button>
                </div>

                {/* DAY TABS */}
                <div className="schedule-tabs schedule-animate schedule-animate-delay-2">
                    <button 
                        className={`schedule-tab-btn ${activeDay === 'day1' ? 'active' : ''}`}
                        onClick={() => setActiveDay('day1')}
                    >
                        DAY 1 <span>Mar 13</span>
                    </button>
                    <button 
                        className={`schedule-tab-btn ${activeDay === 'day2' ? 'active' : ''}`}
                        onClick={() => setActiveDay('day2')}
                    >
                        DAY 2 <span>Mar 14</span>
                    </button>
                    <button 
                        className={`schedule-tab-btn ${activeDay === 'day3' ? 'active' : ''}`}
                        onClick={() => setActiveDay('day3')}
                    >
                        DAY 3 <span>Mar 15</span>
                    </button>
                </div>

                {/* TABLE CONTAINER */}
                <div className="schedule-table-wrapper schedule-animate schedule-animate-delay-3">
                    <table className="schedule-table">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Event Details</th>
                                <th>Venue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleData[eventType][activeDay].length > 0 ? (
                                scheduleData[eventType][activeDay].map((item, index) => (
                                    <tr key={index}>
                                        <td className="time-col">{item.time}</td>
                                        <td className="event-col">{item.event}</td>
                                        <td className="venue-col">{item.venue}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} style={{ textAlign: 'center', padding: '3rem', opacity: 0.5 }}>
                                        No events scheduled for this block yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="schedule-dots schedule-animate schedule-animate-delay-4">
                    <span className="schedule-dot schedule-dot--pink" />
                    <span className="schedule-dot schedule-dot--cyan" />
                    <span className="schedule-dot schedule-dot--cyan" />
                </div>
            </section>
        </div>
    );
}