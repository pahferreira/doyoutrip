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
                carsHeader.innerHTML = this.carsError()
            } else {
                let carsData = json.results
                carsHeader.innerHTML = this.carsHeaderHTML()
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

const YATAvalidation = /^([A-Z]){3}$/gi
const carsContainer = document.querySelector("#tbody-cars")
const carsHeader = document.querySelector("#thead-cars")
const formCars = document.querySelector("form#FormCarsID")
let buttonCar = document.querySelector("#find-cars")

buttonCar.addEventListener("click", event => {
    const formDataCars = new FormData(formCars)
    let checkLocation = formDataCars.get('location-car')
    if (checkLocation.match(YATAvalidation)) {
        const CARS_INFO = {
            location: formDataCars.get('location-car'),
            pickUp: formDataCars.get('pickup-car'),
            dropOff: formDataCars.get('dropoff-car')
        }

        carsContainer.innerHTML = ""
        carsHeader.innerHTML = ""
        let cars = new Cars(CARS_INFO)
        cars.loadCars()
    } else {
        alert("Something is wrong, check your location YATA code again.")
    }
    event.preventDefault()
})