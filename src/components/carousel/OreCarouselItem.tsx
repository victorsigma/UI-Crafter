import { type ReactNode } from 'react'

interface OreCarouselItemProps {
    children?: ReactNode;
    image?: string;
    title?: string;
}

export const OreCarouselItem = ({ children, image, title }: OreCarouselItemProps) => {
    return (
        <li className='ore-carousel__item' style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <img
                    src={image}
                    alt={title}
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover'
                    }}
                />
                {children && (
                    <div style={{
                        position: "absolute",
                        top: "50%",           // Centrado vertical
                        left: "50%",          // Centrado horizontal
                        transform: "translate(-50%, -50%)", // Ajusta el centro exacto
                        zIndex: 1,            // Asegúrate de que los children se muestren sobre la imagen
                        width: '100%',        // Asegura que el contenido ocupe todo el ancho de la imagen
                        textAlign: 'center',  // Opcional: Centrar el texto si hay texto en `children`
                    }}>
                        {children}
                    </div>
                )}
            </div>
        </li>
    );
}
