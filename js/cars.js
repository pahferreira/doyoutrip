const carsContainer = document.querySelector("#tbody-cars")
const carsHeader = document.querySelector("#thead-cars")

let inputLocation = document.querySelector("#location-car")
let inputPickUp = document.querySelector("#pickup-car")
let inputDropOff = document.querySelector("#dropoff-car")

let button = document.querySelector("#find-cars")

button.addEventListener("click", event => {
    let location = inputLocation.value
    let pickUp = inputPickUp.value
    let dropOff = inputDropOff.value
    let cars

    loadCars(location, pickUp, dropOff)
})


function loadCars(location, pickUp, dropOff) {
    const BASE_URL = "https://api.sandbox.amadeus.com/v1.2/cars/search-airport?apikey=UHXCte2m91iBbBSRUXYnGQZkJVH4gM43"
    const LOCATION = location.toUpperCase()
    const PICK_UP = pickUp.split("/").reverse().join("-")
    const DROP_OFF = dropOff.split("/").reverse().join("-")
    const CONST_URL = "currency=USD"
    const FETCH_URL = `${BASE_URL}&location=${LOCATION}&pick_up=${PICK_UP}&drop_off=${DROP_OFF}&${CONST_URL}`
    console.log(FETCH_URL)

    fetch(FETCH_URL).then(response => response.json()).then(json => {
        cars = json.results
        carsHeader.innerHTML = carsHeaderHTML()
        carsContainer.innerHTML += carsHTML(cars)
    })
}

function carsHTML(cars) {
    const carsData = cars.map(car => {
        return {
            "company_name": car.provider.company_name,
            "available_cars": car.cars.length(),
            "mininum_price": car.cars[0].estimated_total.amount,
            "maximum_price": car.cars[car.cars.length() - 1].estimated_total.amount,
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

function carsHeaderHTML() {
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