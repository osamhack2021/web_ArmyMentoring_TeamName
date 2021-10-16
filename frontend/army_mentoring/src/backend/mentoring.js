import axios from "axios";

const _addMentoring = async (form) => {
    try {
        const response = await axios.post("mentoring", form)
        return response;
    } catch (error) {
        throw(error);
    }
}

export {_addMentoring}