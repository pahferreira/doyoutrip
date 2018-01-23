const flightsHeaderContainer = document.querySelector("#thead-flights")
const flightsContainer = document.querySelector("#tbody-flights")

let inputOrigin = document.querySelector("#origin-flight")
let inputDestination = document.querySelector("#destination-flight")
let inputDepartureDate = document.querySelector("#departure-date-flight")
let inputDuration = document.querySelector("#duration-flight")

const button = document.querySelector("#find-flights")

button.addEventListener("click", event => {
    event.preventDefault()
    let origin = inputOrigin.value
    let destination = inputDestination.value
    let departureDate = inputDepartureDate.value.split("/").reverse().join("-")
    let duration = inputDuration.value

    let flights
    loadFlights(origin, destination, departureDate, duration)
})

function loadFlights(origin, destination, departureDate, duration) {
    const BASE_URL = "https://api.sandbox.amadeus.com/v1.2/flights/extensive-search?apikey=UHXCte2m91iBbBSRUXYnGQZkJVH4gM43"
    const CONST_PART = "&currency=USD&direct=true"
    const ORIGIN = origin.toUpperCase()
    const DESTINATION = destination.toUpperCase()
    const DEPARTURE_DATE = departureDate
    const DURATION = duration
    const FETCH_URL = `${BASE_URL}&origin=${ORIGIN}&destination=${DESTINATION}&departure_date=${DEPARTURE_DATE}&duration=${DURATION}&${CONST_PART}`

    fetch(FETCH_URL).then(response => response.json()).then(json => {
        flights = json.results
        flightsHeaderContainer.innerHTML = flightsHeader()
        flightsContainer.innerHTML += flightsHTML(flights, ORIGIN)
    })
}

function flightsHeader() {
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

function flightsHTML(flights, origin) {
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