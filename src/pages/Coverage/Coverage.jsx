import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router'

// FlyToLocation helper to animate map movement
function FlyToLocation ({ position }) {
  const map = useMap()
  if (position) {
    map.flyTo(position, 12, { duration: 2 })
  }
  return null
}

const CoverageSection = () => {
  const [search, setSearch] = useState('')
  const [flyTo, setFlyTo] = useState(null)
  const locationData = useLoaderData()


  const handleSearch = e => {
    e.preventDefault()
    const found = locationData.find(
      loc =>
        loc.district.toLowerCase().includes(search.toLowerCase()) ||
        loc.city.toLowerCase().includes(search.toLowerCase()) ||
        loc.covered_area.some(area =>
          area.toLowerCase().includes(search.toLowerCase())
        )
    )
    if (found) {
      setFlyTo([found.latitude, found.longitude])
    }
  }

  return (
    <section className='px-4 md:px-16 py-16 bg-white rounded-4xl my-15'>
      <h2 className='text-3xl md:text-4xl font-bold  text-gray-800'>
        We are available in 64 districts
      </h2>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className='max-w-md  mt-8 flex  gap-2'
      >
        <input
          type='text'
          placeholder='Search district or area...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='input input-bordered w-full rounded-full'
        />
        <button
          type='submit'
          className='btn bg-color-green text-white hover:bg-green-600 rounded-full'
        >
          Search
        </button>
      </form>

      {/* Divider */}
      <div className='divider my-8'></div>

      {/* Subheading */}
      <h3 className='text-xl md:text-2xl font-semibold text-center text-gray-700 mb-6'>
        We deliver almost all over Bangladesh
      </h3>

      {/* Map */}
      <div className='h-[400px] rounded overflow-hidden shadow'>
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={false}
          className='h-full w-full'
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {locationData.map((loc, index) => (
            <Marker key={index} position={[loc.latitude, loc.longitude]}>
              <Popup>
                <strong>{loc.city}</strong>
                <br />
                District: {loc.district}
                <br />
                Areas: {loc.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
          <FlyToLocation position={flyTo} />
        </MapContainer>
      </div>
    </section>
  )
}

export default CoverageSection

