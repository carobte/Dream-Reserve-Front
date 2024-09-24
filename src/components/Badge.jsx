export default function Card({ children, className = '' }) {

    return (
        <span className={`inline-block bg-[#276F62] text-white text-xs font-semibold px-2.5 py-0.5 rounded ${className}`}>
            {children}
        </span>
    )
}