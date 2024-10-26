import { useEffect, useRef, useState } from 'react';
import './styles.css'; // Import the CSS file
import { gsap } from 'gsap';
import { TimelineMax } from 'gsap/gsap-core';

// eslint-disable-next-line react/prop-types
const CircularProgress = ({ currentPage, setNextPage }) => {
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);
    const yearRef = useRef(2006);
    const targetYear = 2024;
    const years = Array.from({ length: targetYear - 2005 }, (_, i) => 2006 + i);

    const runAnimation = () => {
        let i = 0;

        let testProgress = 0;
        let timeline = gsap.timeline({
            onRepeat: () => {
                testProgress += 7;
                setProgress(testProgress)
            },
            repeat: -1,
            duration: 0.2,
            delay: 1,
        });
        timeline.play();

        const interval = new TimelineMax({ repeat: -1 }).call(function () {
            if (yearRef.current <= targetYear) {

                const yearElements = document.querySelectorAll('.year div');
                const yearElement = yearElements[i + 2];
                gsap.to(yearElement, {
                    scale: 3,
                    duration: 2,
                    onComplete: () => {
                        gsap.to(yearElement, {
                            scale: 2,
                            duration: 2,
                        });
                    },
                });

                gsap.to('.year', {
                    x: -(160 + 48) * i,
                    duration: 3,
                    delay: 1,
                });

                yearRef.current++;
                i++;
            } else {
                interval.kill();

                //navigate to the next page
                // navigate('/avatar-creator')
                setTimeout(() => {
                    setNextPage();
                    clearInterval(intervalRef.current);
                    timeline.kill();

                }, 4000);

            }


        }, null, null, 1000);


    };

    useEffect(() => {
        if (currentPage === 2) {
            setTimeout(runAnimation, 2000)
        }

        return () => clearInterval(intervalRef.current);
    }, [currentPage]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="relative">
                <svg width="320" height="320" viewBox="0 0 320 320" className="circular-progress rounded-full"
                    style={{ '--progress': progress }}>
                    <circle className="bg" cx="160" cy="160" r="300" />
                    <circle className="fg" cx="160" cy="160" r="300" />
                </svg>
                <div
                    className='shadow-1 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full w-[285px] h-[285px]' />
                <div
                    className='shadow-2 absolute top-[110px] -translate-y-1/2 left-1/2 -translate-x-1/2 w-[130px] h-[10px]' />
                <div className='shadow-2 absolute top-16 left-1/2 -translate-x-1/2 w-[130px] h-[140px]' />

                <div className="absolute top-1/2 -translate-y-1/2 translate-x-[36px] ">
                    <div className="w-[250px] h-32 overflow-hidden flex items-center">
                        <div className="flex year gap-40">
                            <div className='-mr-[220px]'></div>
                            <div></div>
                            {years.map((year) => (
                                <div key={year} className='text-[20px] font-montserrat-extrabold text-[#686868] font-extrabold'>{year}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircularProgress;