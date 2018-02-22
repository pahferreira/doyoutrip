import { Cars, carsHeaderContainer, carsContainer } from './cars.js'
import { Hotels, hotelsHeaderContainer, hotelsContainer } from './hotels.js'
import { Flights, flightsHeaderContainer, flightsContainer } from './flights.js'

const YATAvalidation = /^([A-Z]){3}$/gi

//CARS
const buttonCar = document.querySelector("#find-cars")

if (buttonCar) {
    buttonCar.addEventListener("click", event => {
        event.preventDefault()
        const formCars = document.querySelector("form#FormCarsID")
        const formDataCars = new FormData(formCars)
        let checkLocationCar = formDataCars.get('location-car')
        if (checkLocationCar.match(YATAvalidation)) {
            const CARS_INFO = {
                location: formDataCars.get('location-car'),
                pickUp: formDataCars.get('pickup-car'),
                dropOff: formDataCars.get('dropoff-car')
            }
            carsHeaderContainer.innerHTML = ""
            carsContainer.innerHTML = ""
            let cars = new Cars(CARS_INFO)
            cars.loadCars()
        } else {
            alert("Something is wrong, check your location YATA code again.")
        }
    })
}

//HOTELS
const buttonHotel = document.querySelector("#find-hotels")

if (buttonHotel) {
    buttonHotel.addEventListener("click", event => {
        event.preventDefault()
        const formHotels = document.querySelector("form#FormHotelsID")
        const formDataHotel = new FormData(formHotels)
        let checkLocationHotel = formDataHotel.get('location-hotel')
        if (checkLocationHotel.match(YATAvalidation)) {
            const HOTEL_INFO = {
                location: formDataHotel.get('location-hotel'),
                checkin: formDataHotel.get('checkin-hotel'),
                checkout: formDataHotel.get('checkout-hotel')
            }
            hotelsHeaderContainer.innerHTML = ""
            hotelsContainer.innerHTML = ""
            let hotels = new Hotels(HOTEL_INFO)
            hotels.loadHotels()
        } else {
            alert("Something is wrong, check your location YATA code again.")
        }
    })
}

//FLIGHTS
const buttonFlight = document.querySelector("#find-flights")

if (buttonFlight) {
    buttonFlight.addEventListener("click", event => {
        event.preventDefault()
        const durationValidation = /^(1[0-5]|0?[1-9])$/g
        const formFlights = document.querySelector("form#FormFlightsID")
        const formDataFlight = new FormData(formFlights)

        let checkOrigin = formDataFlight.get('origin-flight')
        if (checkOrigin.match(YATAvalidation)) {
            let checkDestination = formDataFlight.get('destination-flight')
            if (checkDestination.match(YATAvalidation)) {
                let checkDuration = formDataFlight.get('duration')
                if (checkDuration.match(durationValidation)) {
                    const FLIGHTS_INFO = {
                        origin: formDataFlight.get('origin-flight'),
                        destination: formDataFlight.get('destination-flight'),
                        departureDate: formDataFlight.get('departure-date-flight'),
                        duration: formDataFlight.get('duration')
                    }
                    flightsHeaderContainer.innerHTML = ""
                    flightsContainer.innerHTML = ""
                    let flights = new Flights(FLIGHTS_INFO)
                    flights.loadFlights()
                } else {
                    alert("Your trip duration should be between 1 and 15")
                }
            } else {
                alert("Something is wrong, check your destination YATA code again.")
            }
        } else {
            alert("Something is wrong, check your origin YATA code again.")
        }
    })
}