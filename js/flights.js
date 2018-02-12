class Flights {
    constructor(flightsInfo) {
        this.flightsInfo = flightsInfo
        this.BASE_URL = "https://api.sandbox.amadeus.com/v1.2/flights/extensive-search?"
        this.API_KEY = "4vopySRRuG5KtjGdKoiA32X9VGQx5kiH"
    }

    loadFlights() {
        const CONST_PART = "&currency=USD&direct=true"
        const ORIGIN = this.flightsInfo.origin.toUpperCase()
        const DESTINATION = this.flightsInfo.destination.toUpperCase()
        const DEPARTURE_DATE = this.flightsInfo.departureDate.split("/").reverse().join("-")
        const DURATION = this.flightsInfo.duration
        const FETCH_URL = `${this.BASE_URL}apikey=${this.API_KEY}&origin=${ORIGIN}&destination=${DESTINATION}&departure_date=${DEPARTURE_DATE}&duration=${DURATION}&${CONST_PART}`
        fetch(FETCH_URL).then(response => response.json()).then(json => {
            if (json.results == undefined) {
                flightsContainer.innerHTML == ""
                flightsHeaderContainer.innerHTML = this.flightsError()
            } else {
                let flightsData = json.results
                flightsHeaderContainer.innerHTML = this.flightsHeaderHTML()
                flightsContainer.innerHTML == ""
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

export default class Flights {}