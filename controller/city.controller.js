import { City } from "../model/association.js";

export const saveList = async (request, response, next) => {
    let count = 0;
    try {
        for (let object of request.body.states) {
            count++;
            for (let districts of object.districts) {
                await City.create({ cityName: districts, stateId: count });
            }
        }
        return response.status(200).json({ message: "cities saved" });
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal Server Error" });
    }

}
export const list = async (request, response, next) => {
    try {
        const list = await City.findAll();
        return response.status(500).json({ list: list, status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}
export const byStateId = async (request, response, next) => {
    try {
        let city = await City.findAll({
            where: {
              stateId  : request.body.stateId
            }
        });
        return response.status(200).json({ city, status: true });

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ message: "internal server error", status: false });

    }
}
