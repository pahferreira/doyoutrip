import Cars from './cars.js'
import Hotels from './hotels.js'
import Flights from './flights.js'


//Cars Constants
const carsContainer = document.querySelector("#tbody-cars")
const carsHeader = document.querySelector("#thead-cars")
const formCars = document.querySelector("form#FormCarsID")
let buttonCar = document.querySelector("#find-cars")

//Hotels Constants
const hotelsHeaderContainer = document.querySelector("#thead-hotels")
const hotelsContainer = document.querySelector("#tbody-hotels")
const formHotels = document.querySelector("form#FormHotelsID")
const buttonHotel = document.querySelector("#find-hotels")

//Flights Constants
const flightsHeaderContainer = document.querySelector("#thead-flights")
const flightsContainer = document.querySelector("#tbody-flights")
const formFlights = document.querySelector("form#FormFlightsID")
const buttonFlight = document.querySelector("#find-flights")

//Event to Car button
buttonCar.addEventListener("click", event => {
    const formDataCars = new FormData(formCars)
    const CARS_INFO = {
        location: formDataCars.get('location-car'),
        pickUp: formDataCars.get('pickup-car'),
        dropOff: formDataCars.get('dropoff-car')
    }

    let cars = new Cars(CARS_INFO)
    cars.loadCars()
    event.preventDefault()
})

//Event to Hotel Button
buttonHotel.addEventListener("click", event => {
    const formDataHotel = new FormData(formHotels)
    const HOTEL_INFO = {
        location: formDataHotel.get('location-hotel'),
        checkin: formDataHotel.get('checkin-hotel'),
        checkout: formDataHotel.get('checkout-hotel')
    }

    let hotels = new Hotels
    hotels.loadHotels()
    event.preventDefault()
})

buttonFlight.addEventListener("click", event => {
    const formDataFlight = new FormData(formFlights)
    const FLIGHTS_INFO = {
        origin: formDataFlight.get('origin-flight'),
        destination: formDataFlight.get('destination-flight'),
        departureDate: formDataFlight.get('departure-date-flight'),
        duration: formDataFlight.get('duration')
    }
    let flights = new Flights(FLIGHTS_INFO)
    flights.loadFlights()
    event.preventDefault()
})