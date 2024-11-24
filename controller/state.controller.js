import {State} from "../model/association.js";

export const save=async(request,response,next)=>{
    try {
        for (let object of request.body.states) 
          await State.create({ stateName: object.state });
        
        return response.status(200).json({ message: "State Saved" });
    }
    catch (err) {
       return response.status(500).json({ error: "Internal Server Error" });
    }

}
export const stateList = async (request, response, next) => {
    try {
        const stateList = await State.findAll();
        return response.status(500).json({ stateList, status: true });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}
