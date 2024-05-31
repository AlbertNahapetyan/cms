import db from "../config/sequelize.js"

export const createAssociations = (references, name, model, models) => {
    for(const reference of references) {
        const associatedWithModelName = models.find(associatedModel => associatedModel.name === model.fields[reference].reference.model)?.name
        db.models[associatedWithModelName].hasMany(db.models[name], { foreignKey: reference })
        db.models[name].belongsTo(db.models[associatedWithModelName], { foreignKey: reference })
    }
}