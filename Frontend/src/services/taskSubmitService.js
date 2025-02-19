import userExerciseDataService from "./userExerciseDataService";

const taskSubmitService = async (data, navigate) => {
  console.log("🟢 Datos recibidos en taskSubmitService:", data);
  const { statementsData, taskId, exerciseId } = data;

  if (!exerciseId) {
    console.error("❌ Error: exerciseId es undefined en taskSubmitService");
    return;
  }

  const mark = 5;

  const marksAttributes = Object.entries(statementsData).map(([statementId, data]) => ({
    statement_id: statementId,
    mark: mark,
    student_entries_attributes: (data.entries || []).map((entry) => ({
      entry_number: entry.entry_number,
      entry_date: entry.entry_date,
      student_annotations_attributes: (data.annotations || [])
        .filter((annotation) => annotation.student_entry_id === entry.entry_number)
        .map(({ account_id, account_number, credit, debit }) => ({
          account_id: account_id || 9999,
          account_number,
          credit: credit || 0,
          debit: debit || 0,
        })),
    })),
  }));

  const exerciseData = {
    exercise: {
      task_id: taskId,
      marks_attributes: marksAttributes,
    },
  };

  console.log("✅ Datos preparados:", JSON.stringify(exerciseData, null, 2));

  try {
    console.log("🔍 Intentando actualizar con exerciseId:", exerciseId);
    await userExerciseDataService.update(exerciseId, exerciseData);
    navigate("/home");
  } catch (err) {
    console.error("Error al enviar los datos:", err);
    throw err;
  }
};

export default taskSubmitService;