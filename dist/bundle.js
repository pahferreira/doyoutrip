/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cars_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hotels_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__flights_js__ = __webpack_require__(3);




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
            __WEBPACK_IMPORTED_MODULE_0__cars_js__["c" /* carsHeaderContainer */].innerHTML = ""
            __WEBPACK_IMPORTED_MODULE_0__cars_js__["b" /* carsContainer */].innerHTML = ""
            let cars = new __WEBPACK_IMPORTED_MODULE_0__cars_js__["a" /* Cars */](CARS_INFO)
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
            __WEBPACK_IMPORTED_MODULE_1__hotels_js__["c" /* hotelsHeaderContainer */].innerHTML = ""
            __WEBPACK_IMPORTED_MODULE_1__hotels_js__["b" /* hotelsContainer */].innerHTML = ""
            let hotels = new __WEBPACK_IMPORTED_MODULE_1__hotels_js__["a" /* Hotels */](HOTEL_INFO)
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
                    __WEBPACK_IMPORTED_MODULE_2__flights_js__["c" /* flightsHeaderContainer */].innerHTML = ""
                    __WEBPACK_IMPORTED_MODULE_2__flights_js__["b" /* flightsContainer */].innerHTML = ""
                    let flights = new __WEBPACK_IMPORTED_MODULE_2__flights_js__["a" /* Flights */](FLIGHTS_INFO)
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const carsHeaderContainer = document.querySelector("#thead-cars")
/* harmony export (immutable) */ __webpack_exports__["c"] = carsHeaderContainer;

const carsContainer = document.querySelector("#tbody-cars")
/* harmony export (immutable) */ __webpack_exports__["b"] = carsContainer;


class Cars {
    constructor(carsInfo) {
        this.carsInfo = carsInfo
        this.BASE_URL = "https://api.sandbox.amadeus.com/v1.2/cars/search-airport?"
        this.API_KEY = "R6yLXQyIkl3hof6vGGvMeJwTv8fqAldi"
    }

    loadCars() {
        const CONST_URL = "currency=USD"
        const LOCATION = this.carsInfo.location.toUpperCase()
        const PICK_UP = this.carsInfo.pickUp.split("/").reverse().join("-")
        const DROP_OFF = this.carsInfo.dropOff.split("/").reverse().join("-")
        const FETCH_URL = `${this.BASE_URL}apikey=${this.API_KEY}&location=${LOCATION}&pick_up=${PICK_UP}&drop_off=${DROP_OFF}&${CONST_URL}`

        fetch(FETCH_URL).then(response => response.json()).then(json => {
            if (json.results == undefined || json.results.length == 0) {
                carsHeaderContainer.innerHTML = this.carsError()
            } else {
                let carsData = json.results
                carsHeaderContainer.innerHTML = this.carsHeaderHTML()
                carsContainer.insertAdjacentHTML('beforeend', this.carsHTML(carsData))
            }
        })
    }

    carsError() {
        return `<p>Sorry, there are no cars available</p>`
    }

    carsHTML(cars) {
        const carsData = cars.map(car => {
            console.log(car.cars.length)
            return {
                "company_name": car.provider.company_name,
                "available_cars": car.cars.length,
                "mininum_price": car.cars[0].estimated_total.amount,
                "maximum_price": car.cars[car.cars.length - 1].estimated_total.amount,
                "address": {
                    "line": car.address.line1,
                    "city": car.address.city,
                    "country": car.address.country
                }
            }
        })

        return carsData.map(car => {
            let carString = car.available_cars > 1 ? "cars" : "car"
            return (
                `<tr>
                        <td>${car.company_name}</td>
                        <td>${car.address.line}. ${car.address.city} - ${car.address.country}</td>
                        <td>${car.available_cars} ${carString}</td>
                        <td>${car.mininum_price} USD</td>
                        <td>${car.maximum_price} USD</td>
                    </tr>`
            )
        }).join("")
    }

    carsHeaderHTML() {
        return (
            `<tr>
                <th>Company Name</th>
                <th>Address</th>
                <th>Available Cars</th>
                <th>Mininum Price</th>
                <th>Maximum Price</th>
            </tr>`
        )
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Cars;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const hotelsHeaderContainer = document.querySelector("#thead-hotels")
/* harmony export (immutable) */ __webpack_exports__["c"] = hotelsHeaderContainer;

const hotelsContainer = document.querySelector("#tbody-hotels")
/* harmony export (immutable) */ __webpack_exports__["b"] = hotelsContainer;

class Hotels {
    constructor(hotelsInfo) {
        this.hotelsInfo = hotelsInfo
        this.BASE_URL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?"
        this.API_KEY = "R6yLXQyIkl3hof6vGGvMeJwTv8fqAldi"
    }

    loadHotels() {
        const CONST_PART = "radius=50&lang=EN&currency=USD"
        const LOCATION = this.hotelsInfo.location.toUpperCase()
        const CHECK_IN = this.hotelsInfo.checkin.split("/").reverse().join("-")
        const CHECK_OUT = this.hotelsInfo.checkout.split("/").reverse().join("-")
        const FETCH_URL = `${this.BASE_URL}apikey=${this.API_KEY}&location=${LOCATION}&check_in=${CHECK_IN}&check_out=${CHECK_OUT}&${CONST_PART}`


        fetch(FETCH_URL).then(response => response.json()).then(json => {
            if (json.results == undefined || json.results.length == 0) {
                hotelsHeaderContainer.innerHTML = this.hotelsError()
            } else {
                let hotelsData = json.results
                hotelsHeaderContainer.innerHTML = this.hotelsHeader()
                hotelsContainer.insertAdjacentHTML('beforeend', this.hotelsHTML(hotelsData))
            }
        })
    }

    hotelsError() {
        return `<p>Sorry, there are no hotels available</p>`
    }

    hotelsHeader() {
        return (
            `<tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Total</th>
            </tr>`
        )
    }

    hotelsHTML(hotels) {
        const hotelsData = hotels.map(hotel => {
            return {
                "name": hotel.property_name,
                "phone": hotel.contacts[0].detail,
                "total": hotel.total_price.amount,
                "address": {
                    "city": hotel.address.city,
                    "country": hotel.address.country,
                    "line": hotel.address.line1,
                }
            }
        })

        return hotelsData.map(hotel => {
            return (
                `<tr>
                    <td>${hotel.name}</td>
                    <td>${hotel.address.line}. ${hotel.address.city} - ${hotel.address.country}</td>
                    <td>${hotel.phone}</td>
                    <td>${hotel.total} USD</td>
                </tr>`
            )
        }).join('')
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Hotels;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const flightsHeaderContainer = document.querySelector("#thead-flights")
/* harmony export (immutable) */ __webpack_exports__["c"] = flightsHeaderContainer;

const flightsContainer = document.querySelector("#tbody-flights")
/* harmony export (immutable) */ __webpack_exports__["b"] = flightsContainer;


class Flights {
    constructor(flightsInfo) {
        this.flightsInfo = flightsInfo
        this.BASE_URL = "https://api.sandbox.amadeus.com/v1.2/flights/extensive-search?"
        this.API_KEY = "R6yLXQyIkl3hof6vGGvMeJwTv8fqAldi"
    }

    loadFlights() {
        const CONST_PART = "&currency=USD&direct=true"
        const ORIGIN = this.flightsInfo.origin.toUpperCase()
        const DESTINATION = this.flightsInfo.destination.toUpperCase()
        const DEPARTURE_DATE = this.flightsInfo.departureDate.split("/").reverse().join("-")
        const DURATION = this.flightsInfo.duration
        const FETCH_URL = `${this.BASE_URL}apikey=${this.API_KEY}&origin=${ORIGIN}&destination=${DESTINATION}&departure_date=${DEPARTURE_DATE}&duration=${DURATION}&${CONST_PART}`
        fetch(FETCH_URL).then(response => response.json()).then(json => {
            if (json.results == undefined || json.results.length == 0) {
                flightsHeaderContainer.innerHTML = this.flightsError()
            } else {
                let flightsData = json.results
                flightsHeaderContainer.innerHTML = this.flightsHeaderHTML()
                flightsContainer.insertAdjacentHTML('beforeend', this.flightsHTML(flightsData, ORIGIN))
            }
        })
    }

    flightsError() {
        return `<p>Sorry, there are no flights available</p>`
    }
    flightsHeaderHTML() {
        return (
            `<tr>
                <th>Airline</th>
                <th>Itinerary</th>
                <th>Departure Date</th>
                <th>Return Date</th>
                <th>Price</th>
            </tr>`
        )
    }
    flightsHTML(flights, origin) {
        const flightsData = flights.map(flight => {
            return {
                "airline": flight.airline,
                "origin": origin,
                "destination": flight.destination,
                "departure_date": flight.departure_date.split("-").reverse().join("/"),
                "return_date": flight.return_date.split("-").reverse().join("/"),
                "price": flight.price
            }
        })

        return flightsData.map(flight => {
            return (
                `<tr>
                    <td>${flight.airline}</td>
                    <td>${flight.origin} - ${flight.destination}</td>
                    <td>${flight.departure_date}</td>
                    <td>${flight.return_date}</td>
                    <td>${flight.price} USD</td>
                </tr>`
            )
        }).join('')
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Flights;


/***/ })
/******/ ]);