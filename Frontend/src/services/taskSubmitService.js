import userExerciseDataService from "./userExerciseDataService";

const taskSubmitService = ({ entries, annotations }, navigate) => {
  const mark = 0;


  const prepareExerciseData = () => {
    return {
      exercise: {
        task_id: 2,
        marks_attributes: entries.map(() => ({
          mark: mark || 5,
          student_entries_attributes: entries.map(entry => ({
            entry_number: entry.entry_number,
            entry_date: entry.entry_date,
            student_annotations_attributes: annotations
              .filter(annotation => annotation.student_entry_id === entry.entry_number)
              .map(({ account_id, account_number, credit, debit }) => ({
                account_id,
                account_number,
                credit,
                debit,
              }))
          }))
        }))
      }
    };

  };

  const exerciseData = prepareExerciseData();
  userExerciseDataService.create(exerciseData)
    .then(() => {
      navigate("/home")
    })



  return {
    prepareExerciseData,
  }
}

export default taskSubmitService
