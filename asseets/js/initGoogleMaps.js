function initMap() {
    if (typeof googleLocationMap === "function") {
        googleLocationMap();
    }

    if (typeof googleDirectionsMap === "function") {
        googleLocationMap();
    }
}
