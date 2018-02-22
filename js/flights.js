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

const YATAvalidation = /^([A-Z]){3}$/gi
const durationValidation = /^(1[0-5]|0?[1-9])$/g
const flightsHeaderContainer = document.querySelector("#thead-flights")
const flightsContainer = document.querySelector("#tbody-flights")
const formFlights = document.querySelector("form#FormFlightsID")
const buttonFlight = document.querySelector("#find-flights")

buttonFlight.addEventListener("click", event => {
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
    event.preventDefault()
})