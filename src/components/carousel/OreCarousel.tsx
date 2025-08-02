import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState, type ReactNode } from 'react'

interface OreCarouselProps {
    hasArrows?: boolean;
    autoScroll?: boolean;
    autoScrollSpeed?: number;
    behavior?: 'smooth' | 'auto';
    children?: ReactNode[];
}

export const OreCarousel = ({ hasArrows = false, autoScroll = false, autoScrollSpeed = 2, behavior = "auto", children }: OreCarouselProps) => {

    const ref = useRef<HTMLUListElement>(null);

    const [scrollHeight, setScrollHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            // Actualizar el scrollHeight
            setScrollHeight(ref.current.scrollHeight);
        }

        // Recalcular el scrollHeight cuando la ventana cambie de tamaño
        const handleResize = () => {
            if (ref.current) {
                setScrollHeight(ref.current.scrollHeight);
            }
        };

        // Agregar el listener para el cambio de tamaño
        window.addEventListener('resize', handleResize);

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [children]);  // Recalcular cuando `children` cambie


    const scroll = (scrollSort: number) => {
        if (!ref.current || !children) return;
        if (children.length === 0) return;

        const steps = ref.current.scrollWidth / children.length;


        if (scrollSort < 0) {
            if (ref.current.scrollLeft - steps < 0) {
                ref.current.scrollTo({
                    left: ref.current.scrollWidth,
                    behavior,
                });
            } else {
                ref.current.scrollTo({
                    left: ref.current.scrollLeft - steps,
                    behavior,
                });
            }
        } else {
            if (ref.current.scrollLeft + steps > ref.current.scrollWidth - 7) {
                ref.current.scrollTo({
                    left: 0,
                    behavior
                });
            } else {
                ref.current.scrollTo({
                    left: ref.current.scrollLeft + steps,
                    behavior
                });
            }
        }
    };

    useEffect(() => {
        if (autoScroll && ref.current) {
            const interval = setInterval(() => {
                scroll(1);
            }, (autoScrollSpeed * 1000) || 2000);

            return () => clearInterval(interval);
        }
    }, []);

    return (
        <div className='ore-carousel__container'>
            <ul ref={ref} className="ore-carousel__content">
                {children}
            </ul>
            <div className='ore-carousel__controls' style={{
                display: hasArrows ? 'flex' : 'none',
                justifyContent: 'space-between', width: '100%',
                position: 'relative', bottom: ref.current ? `${scrollHeight / 1.8 + 20}px` : '0px',
                boxSizing: 'border-box',
                padding: '0 20px',
            }}>
                <div className="ore-button ore-button__basic" style={{
                    marginBlock: "10px"
                }} onClick={() => {
                    scroll(-1)
                }}>
                    <button style={{ width: "100%", padding: "10px" }}>
                        <label><FontAwesomeIcon icon={faArrowLeft} /></label>
                    </button>
                </div>

                <div className="ore-button ore-button__basic" style={{
                    marginBlock: "10px"
                }} onClick={() => {
                    scroll(1)
                }}>
                    <button style={{ width: "100%", padding: "10px" }}>
                        <label><FontAwesomeIcon icon={faArrowRight} /></label>
                    </button>
                </div>
            </div>
        </div>
    )
}
