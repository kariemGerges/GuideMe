import React from 'react';
import {APIProvider, Map, AdvancedMarker, MapCameraChangedEvent, Pin} from '@vis.gl/react-google-maps';

const MapComponent = ({state}) => {

  const places = Array.isArray(state) ? state : [state];

  const PlacesMarkers = ({places}) => {

    return (
      <>
        {places.map( (place, i) => (
            <AdvancedMarker
              key={i}
              position={{lat: place.location.latitude, lng: place.location.longitude}}
              title={place.displayName?.text || 'No Name'}
              // onClick={place.onMarkerClick}
              
            >
            <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
            </AdvancedMarker>
        ))}
      </>
    );
  };
  const locationCenter = ({places}) => {

    places.map( (place, i) => (

      console.log(`places location ${place.location.latitude} ${i}`)

    ))

    // console.log(`places location`)
  };

  locationCenter({places});

  return(
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <Map
          defaultZoom={13}
          defaultCenter={ { lat: -33.860664, lng: 151.208138 } }
          mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
          onCameraChanged={ (ev: MapCameraChangedEvent) =>
          console.log("ev")
        }
      >
        <PlacesMarkers places={places} />
      </Map>
    </APIProvider>
  )
};

export default MapComponent;
