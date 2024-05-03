const _ = require("lodash")
const { v4: uuidv4 } = require('uuid')

const DEFAULT_BULK_PER_TIMESTAMP = 200
const PREVIOUS_TIME_DELTA = 5 * 1000
const TIME_WINDOW_DELTA = 1 * 1000

LAT_MIN = 40
LAT_MAX = 60
LON_MIN = 0
LON_MAX = 40

const Categories = [
    "OPERATION",
    "UPSTREAM",
    "DOWNSTREAM"
]

const companies = [
    "Company A",
    "Company B",
    "Some other company",
    "Some company",
    "Company 123"
]

const countries = [
    "France",
    "Germany",
    "Netherlands",
    "Poland",
    "Spain",
    "Italy"
]

const generateCategory = () => {
    return _.sample(Categories)
}

const generateCompany = () => {
    return _.sample(companies)
}

const generateLocation = () => {
    const latitude = _.random(LAT_MIN, LAT_MAX, true)
    const longitude = _.random(LON_MIN, LON_MAX, true)
    const country = _.sample(countries)

    const location = {
        "lat": latitude,
        "lon": longitude,
        "country": country
    }
    return location
}

const generateAmount = () => {
    return _.random(20, 2000)
}

const generateEmissionPoint = (timestamp) => {
    const emissionPoint = {
        id: uuidv4(),
        time: timestamp,
        category: generateCategory(),
        company: generateCompany(),
        location: generateLocation(),
        emission_amount: generateAmount()
    }

    return emissionPoint
}

const generateCoordinatesBulk = (timestamp, amount = DEFAULT_BULK_PER_TIMESTAMP) => {
    const generatedBulk = Array.from({ length: amount }, () => generateEmissionPoint(timestamp))
    return generatedBulk
}

const groupByTime = (emissionPoints) => {
    const groupKey = (point) => point["time"]

    const groupedData = _.groupBy(emissionPoints, groupKey)
    const allTimestamps = Object.keys(groupedData)
        .map(timeStr => parseInt(timeStr, 10))
        .sort()

    return {
        "partitionsByTime": groupedData,
        "min_time": _.min(allTimestamps),
        "max_time": _.max(allTimestamps)
    }
}

const getCoordinatesCluster = () => {
    const currentMoment = Date.now()
    let moment = currentMoment - PREVIOUS_TIME_DELTA
    const delta = TIME_WINDOW_DELTA

    const allData = []
    while (moment <= currentMoment) {
        const generatedBulk = generateCoordinatesBulk(moment)
        allData.push(generatedBulk)

        moment += delta
    }

    const coordinatesBulk = generateCoordinatesBulk(currentMoment)
    return groupByTime(coordinatesBulk)
}


module.exports.getCoordinates = getCoordinatesCluster
