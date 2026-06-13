def calculate_carbon(car_km, bus_km, electricity_units):

    car_emission = car_km * 0.192
    bus_emission = bus_km * 0.105
    electricity_emission = electricity_units * 0.82

    total = car_emission + bus_emission + electricity_emission

    return round(total, 2)