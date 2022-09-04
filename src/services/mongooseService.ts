import mongoose from "mongoose";
import MongooseError from "../exceptions/mongooseError";

const ObjectId = mongoose.Types.ObjectId;

class MongooseService {

	ToObjectId(id: string) {
		try {
			return new ObjectId(id);
		} catch(err) {
			throw MongooseError.ArgumentFormat();
		}
	}

	IsValidObjectId(id: string | mongoose.Types.ObjectId) {
		if(ObjectId.isValid(id)) {
            
			if((String)(new ObjectId(id)) === id) {
				return true;
			}

			return false;
		}
		return false;
	}
}

export default new MongooseService();