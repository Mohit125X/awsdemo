
import { Admin } from "../model/admin.model";
export const viewBalance = async (request, response, next) => {
    try {
        let admin = await Admin.findOne();
        if(admin)
        return response.status(200).json({ balance: admin.balance, status: true });
        return response.status(500).json({ message: "wrong email password", status: false });
    } catch (err) {
        return response.status(500).json({ message: "internal server error", status: false });
    }
}

