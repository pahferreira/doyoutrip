const hotelsHeaderContainer = document.querySelector("#thead-hotels")
const hotelsContainer = document.querySelector("#tbody-hotels")

let inputLocationHotel = document.querySelector("#location-hotel")
let inputCheckInHotel = document.querySelector("#checkin-hotel")
let inputCheckOutHotel = document.querySelector("#checkout-hotel")

const button = document.querySelector("#find-hotels")

button.addEventListener("click", event => {
    event.preventDefault()
    let locationHotel = inputLocationHotel.value
    let checkInHotel = inputCheckInHotel.value.split("/").reverse().join("-")
    let checkOutHotel = inputCheckOutHotel.value.split("/").reverse().join("-")

    let hotels
    loadHotels(locationHotel, checkInHotel, checkOutHotel)
})

function loadHotels(location, checkIn, checkOut) {
    const BASE_URL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?"
    const API_KEY = "4vopySRRuG5KtjGdKoiA32X9VGQx5kiH"
    const CONST_PART = "radius=50&lang=EN&currency=USD"
    const LOCATION = location.toUpperCase()
    const CHECK_IN = checkIn
    const CHECK_OUT = checkOut
    const FETCH_URL = `${BASE_URL}apikey=${API_KEY}&location=${LOCATION}&check_in=${CHECK_IN}&check_out=${CHECK_OUT}&${CONST_PART}`

    fetch(FETCH_URL).then(response => response.json()).then(json => {
        hotels = json.results
        hotelsHeaderContainer.innerHTML = hotelsHeader()
        hotelsContainer.innerHTML += hotelsHTML(hotels)
    })
}

function hotelsHeader() {
    return (
        `<tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Total</th>
        </tr>`
    )
}

function hotelsHTML(hotels) {
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