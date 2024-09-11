import { useState, useEffect } from 'react'
import { ChevronDown, Star } from 'lucide-react'

const HOTELS_PER_PAGE = 4

export default function HotelSelection() {
  const [hotels, setHotels] = useState([])
  const [rooms, setRooms] = useState([])
  const [foods, setFoods] = useState([])
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRoomTypes, setSelectedRoomTypes] = useState({})
  const [selectedFoodType, setSelectedFoodType] = useState({})
  const [roomNotAvailable, setRoomNotAvailable] = useState({})

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://192.168.89.246:5432/api/V1/Hotel')
        const data = await response.json()
        console.log(data); 
        
        setHotels(data)
        if (data.length > 0) {
          setSelectedHotel(data[0].id)
        }
      } catch (error) {
        console.error('Error fetching hotels:', error)
      }
    }

    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:3000/room')
        const data = await response.json()
        setRooms(data)
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
    }

    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:3000/food')
        const data = await response.json()
        setFoods(data)
      } catch (error) {
        console.error('Error fetching foods:', error)
      }
    }

    fetchHotels()
    fetchRooms()
    fetchFoods()
  }, [])

  useEffect(() => {
    if (selectedHotel) {
      const hotelRooms = rooms.filter(room => room.hotel_id === selectedHotel)
      const availableRoomTypes = hotelRooms.map(room => room.type)
      const defaultRoomType = availableRoomTypes.length > 0 ? availableRoomTypes[0] : null
      setSelectedRoomTypes(prevState => ({
        ...prevState,
        [selectedHotel]: defaultRoomType
      }))
    }
  }, [selectedHotel, rooms])

  const handleRoomTypeChange = (hotelId, roomType) => {
    const hotelRooms = rooms.filter(room => room.hotel_id === hotelId)
    const availableRoomTypes = hotelRooms.map(room => room.type)
    
    if (availableRoomTypes.includes(roomType)) {
      setSelectedRoomTypes(prevState => ({
        ...prevState,
        [hotelId]: roomType
      }))
      setRoomNotAvailable(prevState => ({
        ...prevState,
        [hotelId]: ''
      }))
    } else {
      setRoomNotAvailable(prevState => ({
        ...prevState,
        [hotelId]: `El hotel no presenta este tipo de habitación: ${roomType}`
      }))
    }
  }

  const handleFoodTypeChange = (hotelId, foodType) => {
    setSelectedFoodType(prevState => ({
      ...prevState,
      [hotelId]: foodType
    }))
  }

  const getHotelRooms = (hotelId) => {
    return rooms.filter(room => room.hotel_id === hotelId)
  }

  const getFoodOptions = () => {
    const options = foods.map(food => {
      switch (food.id) {
        case 1:
          return 'Desayuno'
        case 2:
          return 'Desayuno y Almuerzo'
        case 3:
          return 'Desayuno, Almuerzo y Cena'
        default:
          return 'Sin Alimentación'
      }
    })
    return [...new Set(options)] 
  }

  const calculatePrice = (roomPrice, foodType) => {
    const food = foods.find(f => {
      switch (foodType) {
        case 'Desayuno':
          return f.id === 1
        case 'Desayuno y Almuerzo':
          return f.id === 2
        case 'Desayuno, Almuerzo y Cena':
          return f.id === 3
        default:
          return f.id === 0
      }
    })
    const foodPrice = food ? food.price : 0
    return roomPrice + foodPrice
  }

  const paginatedHotels = hotels.slice((currentPage - 1) * HOTELS_PER_PAGE, currentPage * HOTELS_PER_PAGE)
  const totalPages = Math.ceil(hotels.length / HOTELS_PER_PAGE)

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-800">Selecciona el hotel</h2>
        <div className="flex space-x-2">
          {pageNumbers.length > 1 && pageNumbers.map((page) => (
            <button
              key={page}
              className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === page ? 'bg-green-800 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-green-700`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <button className="text-gray-600 flex items-center border border-gray-300 rounded px-4 py-2">
          Precio <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4">
        {paginatedHotels.map((hotel) => (
          <div 
            key={hotel.id} 
            className={`overflow-hidden border rounded-lg shadow-md ${selectedHotel === hotel.id ? 'ring-2 ring-yellow-400' : ''}`}
            onClick={() => setSelectedHotel(hotel.id)}
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 relative">
                <img 
                  src={`/api/hotels/${hotel.id}/image`} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    <div className="flex items-center">
                      {[...Array(hotel.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  {hotel.popular && (
                    <span className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">{hotel.description}</p>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 border-b border-gray-200">
                    {['Sencilla', 'Doble', 'Triple', 'Familiar'].map((type) => (
                      <button
                        key={type}
                        className={`py-1 px-3 text-sm font-medium rounded ${selectedRoomTypes[hotel.id] === type ? 'bg-green-800 text-white border border-green-800' : 'bg-gray-200 text-gray-700 border border-gray-300'} hover:bg-green-700 hover:text-white`}
                        onClick={() => handleRoomTypeChange(hotel.id, type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {roomNotAvailable[hotel.id] && (
                    <p className="mt-2 text-red-600">{roomNotAvailable[hotel.id]}</p>
                  )}
                  <div className="flex flex-wrap gap-2 border-b border-gray-200 mt-4">
                    {getFoodOptions().map((type) => (
                      <button
                        key={type}
                        className={`py-1 px-3 text-sm font-medium rounded ${selectedFoodType[hotel.id] === type ? 'bg-green-800 text-white border border-green-800' : 'bg-gray-200 text-gray-700 border border-gray-300'} hover:bg-green-700 hover:text-white`}
                        onClick={() => handleFoodTypeChange(hotel.id, type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  {getHotelRooms(hotel.id)
                    .filter(room => room.type === selectedRoomTypes[hotel.id])
                    .map((room) => (
                      <div key={room.id} className="mt-2">
                        <img src={`/api/rooms/${room.id}/image`} alt={`${room.type} room`} className="w-full h-32 object-cover rounded-md" />
                        <div className="mt-2 flex justify-between items-center">
                          <button className="text-green-800 border border-green-800 rounded px-4 py-2">Ver Fotos</button>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-800">COP {calculatePrice(room.price, selectedFoodType[hotel.id]).toLocaleString()}</p>
                            <p className="text-sm text-gray-600">3 noches, 2 adultos</p>
                            <p className="text-xs text-gray-500">Impuestos y cargos incluidos</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button className="bg-green-800 text-white hover:bg-green-700 py-2 px-4 rounded-full">Siguiente</button>
      </div>
    </div>
  )
}
