class Hotels {
    constructor(hotelsInfo) {
        this.hotelsInfo = hotelsInfo
        this.BASE_URL = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?"
        this.API_KEY = "4vopySRRuG5KtjGdKoiA32X9VGQx5kiH"
    }

    loadHotels() {
        const CONST_PART = "radius=50&lang=EN&currency=USD"
        const LOCATION = this.hotelsInfo.location.toUpperCase()
        const CHECK_IN = this.hotelsInfo.checkin.split("/").reverse().join("-")
        const CHECK_OUT = this.hotelsInfo.checkout.split("/").reverse().join("-")
        const FETCH_URL = `${this.BASE_URL}apikey=${this.API_KEY}&location=${LOCATION}&check_in=${CHECK_IN}&check_out=${CHECK_OUT}&${CONST_PART}`

        fetch(FETCH_URL).then(response => response.json()).then(json => {
            if (json.results == undefined) {
                hotelsContainer.innerHTML == ""
                hotelsHeaderContainer.innerHTML = this.hotelsError()
            } else {
                let hotelsData = json.results
                hotelsHeaderContainer.innerHTML = this.hotelsHeader()
                hotelsContainer.innerHTML == ""
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

export default class Hotels {}