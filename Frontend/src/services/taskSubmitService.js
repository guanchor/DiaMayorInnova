import userExerciseDataService from "./userExerciseDataService";

const taskSubmitService = async ({ entries, annotations, taskId, exerciseId }, navigate) => {
  const mark = 5;
  const safeEntries = Array.isArray(entries) ? entries : [];
  const safeAnnotations = Array.isArray(annotations) ? annotations : [];


  const prepareExerciseData = () => {
    return {
      exercise: {
        id: exerciseId,
        task_id: taskId,
        marks_attributes: [
          {
            mark: mark,
            student_entries_attributes: safeEntries.map((entry) => ({
              entry_number: entry.entry_number,
              entry_date: entry.entry_date,
              student_annotations_attributes: safeAnnotations
                .filter((annotation) => annotation.student_entry_id === entry.entry_number)
                .map(({ account_id, account_number, credit, debit }) => ({
                  account_id,
                  account_number,
                  credit: credit || 0,
                  debit: debit || 0,
                })),
            })),
          },
        ],
      },
    };
  };

  const exerciseData = prepareExerciseData();

  try {
    await userExerciseDataService.update(exerciseId, exerciseData)
    navigate("/home");
  } catch (err) {
    console.error("Error al enviar los datos:", err);
    throw err;
  }
};

export default taskSubmitService;
