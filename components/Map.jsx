import React from 'react'
import MapViewDirections from 'react-native-maps-directions'
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import { GOOGLE_MAPS_KEY } from "@env"
import { useRef } from 'react'
import { useEffect } from 'react'

export default function Map() {

  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if(!origin || !destination) return;

    const getTravelTime = async () => {
        const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?
        units=imperial&origins=${origin?.description}&destinations=${destination?.description}&key=${GOOGLE_MAPS_KEY}`;
        const response = await fetch(URL);
        const data = await response.json()
        dispatch(setTravelTimeInformation(data?.rows[0]?.elements[0]))
    }

    getTravelTime()
  },[origin, destination, GOOGLE_MAPS_KEY])


  return (
    <MapView
        ref={mapRef} 
        className="flex-1"
        mapType="mutedStandard"
        initialRegion={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
        }}
    >
        {origin && destination && (
            <MapViewDirections 
                origin={origin?.description}
                destination={destination?.description}
                apikey={GOOGLE_MAPS_KEY}
                strokeWidth={3}
                strokeColor="black"
                lineDashPattern={[0]}
            />
        )}
        {origin?.location && (
            <Marker 
                coordinate={{
                    latitude: origin?.location?.lat,
                    longitude: origin?.location?.lng,
                }}
                title="Origin"
                description={origin?.description}    
                identifier="origin"
            />
        )}

        {destination?.location && (
            <Marker 
                coordinate={{
                    latitude: destination?.location?.lat,
                    longitude: destination?.location?.lng,
                }}
                title="Destination"
                description={destination?.description}    
                identifier="destination"
            />
        )}
    </MapView>
  )
}