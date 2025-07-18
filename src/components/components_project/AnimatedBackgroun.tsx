// src/components/components_project/CircuitBackground.tsx
import './AnimatedBackground.css'; // Importe o novo CSS

export function AnimatedBackground() {
    // Criamos um array para renderizar 9 "faíscas" facilmente
    const sparks = Array.from({ length: 9 });

    return (
        <div className="circuit-background">
            {sparks.map((_, index) => (
                <div key={index} className="spark"></div>
            ))}
        </div>
    );
}