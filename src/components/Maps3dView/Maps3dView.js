import React, { useEffect, useRef, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ThreeJSOverlayView } from '@googlemaps/three';
import Loading from '../Loading/Loading';



const Maps3dView = ({state}) => {

const containerStyle = { width: '80vh', height: '50vh' };

const places = state;

const mapOptions = {
  tilt: 0,
  heading: 0,
  zoom: 18,
  center: { lat: places.latitude, lng: places.longitude },
  mapId: process.env.REACT_APP_GOOGLE_MAP_ID,
  disableDefaultUI: true,
  gestureHandling: "none",
  keyboardShortcuts: false,
};


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  });

  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;

    if (mapRef.current) {
      const scene = new THREE.Scene();
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
      directionalLight.position.set(0, 10, 50);
      scene.add(directionalLight);

      const loader = new GLTFLoader();
      const url = "https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf";
      loader.load(url, (gltf) => {
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.rotation.x = Math.PI / 2;
        scene.add(gltf.scene);

        let { tilt, heading, zoom } = mapOptions;
        const animate = () => {
          if (mapRef.current) {
            if (tilt < 67.5) {
              tilt += 0.5;
            } else if (heading <= 360) {
              heading += 0.2;
              zoom -= 0.0005;
            } else {
              return; // Exit animation loop
            }
            mapRef.current.moveCamera({ tilt, heading, zoom });
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      });

      const overlay = new ThreeJSOverlayView({
        map: mapRef.current,
        scene,
        anchor: { ...mapOptions.center, altitude: 100 },
        THREE,
      });

      const mapDiv = mapRef.current.getDiv();
      if (mapDiv instanceof Element) {
        overlay.setMap(mapRef.current);
      } else {
        const observer = new MutationObserver((mutations, observer) => {
          const mapDiv = mapRef.current.getDiv();
          if (mapDiv instanceof Element) {
            overlay.setMap(mapRef.current);
            observer.disconnect();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, []);

  return isLoaded ? (
    <div className='className="relative w-full h-0 pb-[50%] sm:pb-[30%] md:pb-[20%]'>
      <GoogleMap
      mapContainerStyle={containerStyle}
      options={mapOptions}
      onLoad={onLoad}
    />
    </div>
  ) 
  :
  <div>Loading<Loading /></div>; 
};

export default Maps3dView;
