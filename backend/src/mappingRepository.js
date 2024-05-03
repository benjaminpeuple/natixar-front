const MAX_MAPPINGS_IN_STORAGE = 2000
let currentMappings = []
let currentMappingIds = []
let knownMappings = []

const getIds = () => {
    return [...currentMappingIds]
}

const getMappings = () => {
    return [...currentMappings]
}

const addMapping = (mapping) => {
    if (currentMappings.length > MAX_MAPPINGS_IN_STORAGE) {
        currentMappings = []
        currentMappingIds = []
    }

    currentMappings.push(mapping)
    currentMappingIds.push(mapping.id)
}

const addMappings = (mappings) => {
    mappings.forEach(mapping => addMapping(mapping))
}

const storeKnownMappingsFn = (mappings) => {
    const knownIds = mappings.map(mapping => mapping.id)
    currentMappings = currentMappings.filter(mapping => !knownIds.includes(mapping.id))
    currentMappingIds = _.difference(currentMappingIds, knownIds)

    knownMappings.push(mappings)
}

const getKnownMappingsFn = () => {
    return [...knownMappings]
}

module.exports.getCurrentMappings = getMappings
module.exports.getCurrentMappingIds = getIds
module.exports.storeMapping = addMapping
module.exports.storeMappings = addMappings
module.exports.storeKnownMappings = storeKnownMappingsFn
module.exports.getKnownMappings = getKnownMappingsFn
