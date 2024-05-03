const _ = require("lodash")
const { v4: uuidv4 } = require('uuid')
const { getCurrentMappingIds, getCurrentMappings, storeMappings, getKnownMappings } = require("./mappingRepository")

const DEFAULT_NEW_MAPPINGS_IN_BULK = 12
const MAPPINGS_MAX_DELAY_SECONDS = 8

const tools = [
    "Kool",
    "Sage",
    "File"
]

const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const generateTool = () => {
    return _.sample(tools)
}

const generateCodeFromTool = () => {
    return generateRandomString(6)
}

const generateDescription = () => {
    return generateRandomString(20)
}

const generateMapping = (timestamp) => {
    return {
        id: uuidv4(),
        tool: generateTool(),
        codeFromTool: generateCodeFromTool(),
        description: generateDescription(),
        timestamp
    }
}

const generateMappings = () => {
    const timestamp = Date.now()
    const bulkAmount = _.random(1, DEFAULT_NEW_MAPPINGS_IN_BULK)
    const mappingsBulk = Array.from({ length: bulkAmount }, () => generateMapping(timestamp))

    storeMappings(mappingsBulk)
}

setInterval(generateMappings, MAPPINGS_MAX_DELAY_SECONDS * 1000)

const getMappings = () => {
    return getCurrentMappings()
}

const getMappingIds = () => {
    return getCurrentMappingIds()
}

const storeKnownMappingsFn = (mappings) => {
    storeKnownMappings(mappings)
}

const getMappingsBundle = () => {
    const mappings = _.sortBy(getMappings(), "timestamp").reverse()
    const mostRecentTimestamp = _.maxBy(mappings, "timestamp").timestamp
    const mappingIds = getMappingIds()
    return {
        ids: mappingIds,
        mappings: mappings,
        mostRecentTimestamp
    }
}

module.exports.getMappingsWithUnknownCodes = getMappings
module.exports.getMappingsWithUnknownCodeIds = getMappingIds
module.exports.getMappingsBundleData = getMappingsBundle
module.exports.storeKnownMappings = storeKnownMappingsFn
module.exports.retrieveKnownMappings = getKnownMappings