"use client";

import React, { useEffect, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  ControlPosition,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

import "@vis.gl/react-google-maps/examples.css";

import { toast } from "react-toastify";

import { getClientMapApiKey, getClientMapID } from "@/lib/common";

import { Button } from "../ui/button";
import { CustomMapControl } from "./map-control";
import MapHandler from "./map-handler";

interface GetLocationPointProps {
  zoom?: number;
  action: () => void;
  selectedLocation: {
    lat: number;
    lng: number;
  } | null;
  onLocationSelect: (location: { lat: number; lng: number }) => void;
  updatePlace?: (place: google.maps.places.PlaceResult | null) => void;
}
export type AutocompleteMode = { id: string; label: string };
function GetLocationpoint({
  zoom = 13,
  selectedLocation,
  action,
  onLocationSelect,
  updatePlace,
}: GetLocationPointProps) {
  const autocompleteModes: Array<AutocompleteMode> = [
    { id: "classic", label: "Google Autocomplete Widget" },
  ];
  const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
    useState<AutocompleteMode>(autocompleteModes[0]);
  const defaultLocation = selectedLocation?.lat
    ? selectedLocation
    : {
        lat: 6.4275977,
        lng: 7.525168499999999,
      };
  const [center, setCenter] = useState<google.maps.places.PlaceResult | null>(
    null,
  );

  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const fetchPlaceDetails = (lat: number, lng: number) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results) {
        const place = results[0];
        setCenter(place);
        onLocationSelect({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        updatePlace && updatePlace(place);
      } else {
        toast.error("Geocoder failed due to: " + status);
      }
    });
  };
  return (
    <APIProvider
      libraries={["places", "marker", "maps", "routes"]}
      apiKey={getClientMapApiKey() as string}
    >
      <div style={{ height: "500px", width: "100%" }} className="relative">
        <Map
          defaultCenter={defaultLocation}
          mapId={getClientMapID() as string}
          disableDefaultUI
          disableDoubleClickZoom={false}
          fullscreenControl
          zoomControl
          maxZoom={500}
          minZoom={3}
          defaultZoom={zoom}
          gestureHandling="cooperative"
          onClick={(e) => {
            const lat = e?.detail?.latLng?.lat as number;
            const lng = e.detail?.latLng?.lng as number;
            if (lat !== undefined && lng !== undefined) {
              fetchPlaceDetails(lat, lng);
            }
          }}
        >
          <CustomMapControl
            controlPosition={ControlPosition.TOP_CENTER}
            selectedAutocompleteMode={selectedAutocompleteMode}
            onPlaceSelect={(
              place: google.maps.places.PlaceResult | null,
            ): void => {
              setCenter(place);

              onLocationSelect({
                lat: place?.geometry?.location?.lat() as number,
                lng: place?.geometry?.location?.lng() as number,
              });
              updatePlace && updatePlace(place);
            }}
          />

          <MapHandler place={center} />
          <AdvancedMarker
            draggable
            onDragEnd={(e) => {
              const lat = e.latLng?.lat();
              const lng = e.latLng?.lng();
              if (lat !== undefined && lng !== undefined) {
                fetchPlaceDetails(lat, lng);
              }
            }}
            ref={markerRef}
            position={{
              lat:
                (center?.geometry?.location?.lat() as number) ??
                defaultLocation.lat,
              lng:
                (center?.geometry?.location?.lng() as number) ??
                defaultLocation.lng,
            }}
            title={center?.name ?? ""}
            onClick={() => setInfowindowOpen(true)}
          >
            <Pin
              background={"#0f7425"}
              borderColor={"#b7f0c2"}
              glyphColor={"#74e5b2"}
            />
            {infowindowOpen && center && (
              <InfoWindow
                anchor={marker}
                maxWidth={200}
                onCloseClick={() => setInfowindowOpen(false)}
              >
                {center?.formatted_address}
              </InfoWindow>
            )}
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}

export default GetLocationpoint;
