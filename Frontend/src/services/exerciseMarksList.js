import axios from "axios";
import { API_BASE_URL } from "../config";

const getStudentsMarkList = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/student_exercises/students_mark_list`);
        console.log("Serviciooo: ", response.data)
        return response.data
    }
    catch (error) {
        console.error('Error fetching students mark list', error);
        return null
    }
}

export default getStudentsMarkList;