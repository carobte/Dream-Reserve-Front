import { Plane } from "lucide-react"

export default function TravelLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 border-t-4 border-custom-green rounded-full animate-[spin_1s_linear_infinite]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Plane className="text-custom-green w-16 h-16 animate-bounce" />
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-semibold text-gray-700">Dream Reserve</h2>
      <p className="mt-2 text-gray-500 animate-pulse">Preparando tu viaje...</p>
      <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="w-1/2 h-full bg-custom-green rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
      </div>
    </div>
  )
}