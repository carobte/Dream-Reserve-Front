export default function Card({children, className}) {

    return (
        <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
            {children}
        </div>
    )
}