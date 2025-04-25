import http from "../http-common";

const getStudentsMarkList = async (exercise_id) => {
    try {
        console.log("Appel de l'endpoint /student_exercises/students_mark_list avec exercise_id:", exercise_id);
        const response = await http.get(`/student_exercises/students_mark_list?exercise_id=${exercise_id}`);
        console.log("Réponse de /student_exercises/students_mark_list:", response.data);
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération de la liste des notes des étudiants:', error.response?.data || error.message);
        throw error;
    }
};

const exportMarksToExcel = async (exercise_id) => {
    try {
        console.log("Appel de l'endpoint /marks/export_xlsx avec exercise_id:", exercise_id);
        const response = await http.get(`/marks/export_xlsx?exercise_id=${exercise_id}`, {
            responseType: 'blob',
        });
        console.log("Réponse de /marks/export_xlsx reçue avec succès");
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'notes_eleves.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Erreur lors de l'exportation des notes :", error.response?.data || error.message);
        throw error;
    }
};

export { getStudentsMarkList, exportMarksToExcel };