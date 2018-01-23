const hotelsContainer = document.querySelector("#content")

let hotels

loadHotels()

function loadHotels() {
    const BASE_URL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=UHXCte2m91iBbBSRUXYnGQZkJVH4gM43"
    const CONST_PART = "radius=50&lang=EN&currency=USD"
    const FETCH_URL = `${BASE_URL}&location=BOS&check_in=2018-01-15&check_out=2018-01-20&${CONST_PART}`

    fetch(FETCH_URL).then(response => response.json()).then(json => {
        hotels = json.results
        console.log(json.results)
        console.log(json.results[0].contacts[0].detail)
        hotelsContainer.innerHTML += hotelsHTML(hotels)
    })
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
                "postal_code": hotel.address.postal_code
            }
        }
    })

    return hotelsData.map(hotel => {
        return (
            `<tr>
                <td>${hotel.name}</td>
                <td>${hotel.total}</td>
                <td>${hotel.phone}</td>
            </tr>`
        )
    }).join('')
}