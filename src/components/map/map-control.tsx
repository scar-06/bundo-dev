import React from "react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";

import { AutocompleteCustom } from "./autocomplete-alpha";
import { AutocompleteMode } from "./getLocationpoint";

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  selectedAutocompleteMode: AutocompleteMode;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export function CustomMapControl({
  controlPosition,
  selectedAutocompleteMode,
  onPlaceSelect,
}: CustomAutocompleteControlProps) {
  const { id } = selectedAutocompleteMode;

  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control">
        {id === "classic" && (
          <AutocompleteCustom onPlaceSelect={onPlaceSelect} />
        )}
      </div>
    </MapControl>
  );
}
