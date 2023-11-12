const MapDirection = (direction) => {
    if (direction === 0) {
        return "东 E";
    }
    if (direction === 1) {
        return "南 S";
    }
    if (direction === 2) {
        return "西 W";
    }
    if (direction === 3) {
        return "北 N";
    }
};

export default MapDirection