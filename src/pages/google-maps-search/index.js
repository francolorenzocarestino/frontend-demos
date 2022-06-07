import { useState, useMemo, Fragment } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import usePlacesAutocomplete, { getGeocode, getLatLng, getDetails } from 'use-places-autocomplete'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'

const GoogleMapsSearch = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS,
    libraries: ['places']
  })

  if (!isLoaded) return <div>Loading...</div>
  return <Map />
}

export default GoogleMapsSearch

const Map = () => {
  const center = useMemo(() => ({ lat: -34.603744, lng: -58.381688 }), [])
  const zoom = useMemo(() => 12, [])
  const [mapCenter, setMapCenter] = useState(center)
  const [mapZoom, setMapZoom] = useState(zoom)
  const [selected, setSelected] = useState(null)
  const [address, setAddress] = useState(null)
  const [coordinates, setCoordinates] = useState(null)

  const handleDrag = (event) => {
    setCoordinates({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    })
  }

  return (
    <main className="bg-teal-50/30 md:flex-row flex flex-col w-full h-screen">
      <div className="w-full md:w-[50%] h-auto md:h-screen md:m-4 mt-6 mb-4">
        <PlacesAutocomplete
          setSelected={setSelected}
          setAddress={setAddress}
          setMapCenter={setMapCenter}
          setMapZoom={setMapZoom}
        />
        <div className="md:pb-60 flex flex-col items-center justify-center w-full h-full text-left">
          <div className="shadow-gray-100 flex flex-col px-10 m-20 bg-white border border-gray-100 rounded-md shadow-xl">
            {address && (
              <>
                <h2 className="text-slate-700 pb-4 mt-10 uppercase">Direccion Ingresada</h2>
                <p className="mb-4 text-sm font-bold text-teal-700">{address}</p>
              </>
            )}
            {selected || coordinates ? (
              <div className="w-full py-6 text-left">
                <h2 className="text-slate-700 pb-4 uppercase">Coordenadas</h2>
                <h3 className="text-slate-600 text-sm">
                  Latitud:{' '}
                  <span className="font-bold text-teal-700">
                    {coordinates?.lat || selected?.lat}
                  </span>
                </h3>
                <h3 className="text-slate-600 mb-10 text-sm">
                  Longitud:{' '}
                  <span className="font-bold text-teal-700">
                    {coordinates?.lng || selected?.lng}
                  </span>
                </h3>
                <p className="text-center">
                  <span className="px-4 py-2 mt-10 text-[10px] font-medium text-teal-700 uppercase bg-teal-100 rounded-full">
                    Arrastre el marcador en el mapa para ajustar las coordenadas
                  </span>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto md:w-[50%] h-96 md:h-auto my-2 md:m-6 border-2 rounded-xl border-teal-700 overflow-hidden">
        <GoogleMap zoom={mapZoom} center={mapCenter} mapContainerClassName="map-container">
          {selected && <Marker key={0} position={selected} draggable onDragEnd={handleDrag} />}
        </GoogleMap>
      </div>
    </main>
  )
}
const PlacesAutocomplete = ({ setSelected, setMapCenter, setMapZoom, setAddress }) => {
  const { ready, value, setValue, suggestions, clearSuggestions } = usePlacesAutocomplete()
  const handleSelect = async (address) => {
    setValue(address, false)
    setAddress(address)
    clearSuggestions()
    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])
    const parameter = {
      placeId: results[0].place_id
    }
    getDetails(parameter)
      .then((details) => {
        console.log('Details: ', details)
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
    setSelected({ lat, lng })
    setMapCenter({ lat, lng })
    setMapZoom(18)
  }
  return (
    <div className="max-w-[85%] md:max-w-md m-auto">
      <Combobox value={value} onChange={handleSelect}>
        <div className="relative mt-1">
          <div className="sm:text-sm relative w-full overflow-hidden text-left bg-white border-2 border-teal-600 rounded-lg shadow-md cursor-default">
            <Combobox.Input
              className="focus:outline-none text-slate-600 w-full px-3 py-2 text-sm leading-5 border-none"
              displayValue={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!ready}
              placeholder="Busque una dirección"
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options
              className={`max-h-60 z-50 focus:outline-none sm:text-sm absolute w-full mt-1 overflow-auto text-base bg-white rounded-md  ${
                suggestions.data.length > 0
                  ? 'ring-1 ring-black ring-opacity-5 py-1 shadow-lg'
                  : null
              } `}
            >
              {suggestions.status === 'OK' &&
                suggestions.data.map(({ placeId, description }, index) => (
                  <Combobox.Option
                    key={`${placeId}_place-${index}`}
                    value={description}
                    className={({ active }) =>
                      `relative cursor-default select-none hover:cursor-pointer py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-slate-600'
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {description}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
