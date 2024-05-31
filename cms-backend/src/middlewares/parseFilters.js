import { Op } from "sequelize";

export const parseFilters = (req, res, next) => {
    const filters = { ...req.query?.filters }

    if(!Object.keys(filters).length) {
        return next()
    }

    for(const key in filters) {
        filters[key][Object.keys(filters[key])[0]] = filters[key][Object.keys(filters[key])[0]].replaceAll("'", '"')

        try {
            filters[key][Object.keys(filters[key])[0]] = JSON.parse(filters[key][Object.keys(filters[key])[0]])
        } catch (e) {
            continue
        }
    }

    const parsedFilters = {}

    Object.keys(filters).map((key) => {
        const opKey = Object.keys(filters[key])[0].replaceAll("$", "")

        parsedFilters[key] = {
                [Op[opKey]]: filters[key][Object.keys(filters[key])[0]]
        }
    })

    req.query.filters = parsedFilters

    return next()
}