import { useState, useEffect, useRef } from 'react'
import taskSubmitService from '../../services/taskSubmitService'
import EntryHeader from './entry-header/EntryHeader'
import Entry from './entry/Entry'
import Modal from '../modal/Modal';
import { useNavigate } from 'react-router-dom'
import "./EntriesSection.css"

const EntriesSection = ({ selectedStatement, taskId, onStatementComplete, exercise, examStarted }) => {
  const [statementData, setStatementData] = useState({});
  const [allStatementsData, setAllStatementsData] = useState({});
  const accounts = exercise?.chartOfAccounts || [];
  const confirmModalRef = useRef(null);
  const navigate = useNavigate();

  const currentStatementData = selectedStatement ? statementData[selectedStatement.id] : null;
  const entries = currentStatementData?.entries || [];
  const annotations = currentStatementData?.annotations || [];

  useEffect(() => {
    if (selectedStatement && !statementData[selectedStatement.id]) {
      setStatementData((prevData) => ({
        ...prevData,
        [selectedStatement.id]: { entries: [], annotations: [] },
      }));
    }
  }, [selectedStatement]);

  const addEntry = (statementId) => {
    if (!statementData[statementId]) {

      setStatementData((prevData) => ({
        ...prevData,
        [statementId]: {
          ...prevData[statementId],
          entries: [...(prevData[statementId]?.entries || []), {
            entry_number: (prevData[statementId]?.entries?.length || 0) + 1,
            entry_date: "2024-10-10",
          }],
        },
      }));
    }

    const newEntry = {
      entry_number: statementData[statementId].entries.length + 1,
      entry_date: "2024-10-10",
    };

    setStatementData((prevData) => ({
      ...prevData,
      [statementId]: {
        ...prevData[statementId],
        entries: [...prevData[statementId].entries, newEntry],
      },
    }));
  };

  const removeEntry = (entryNumber) => {
    if (!selectedStatement) return;

    const updatedEntries = entries.filter(entry => entry.entry_number !== entryNumber);
    const updatedAnnotations = annotations.filter((annotation) => annotation.student_entry_id !== entryNumber);

    setStatementData((prevData) => ({
      ...prevData,
      [selectedStatement.id]: {
        entries: updatedEntries,
        annotations: updatedAnnotations,
      },
    }));
  };

  const addAnnotation = (statementId, entryId) => {
    if (!statementData[statementId]) {
      setStatementData((prevData) => ({
        ...prevData,
        [statementId]: {
          ...prevData[statementId],
          annotations: [...(prevData[statementId]?.annotations || []), {
            uid: `annotation-${Date.now()}`,
            student_entry_id: entryId,
            account_id: "",
            account_number: "",
            debit: 0,
            credit: 0,
          }],
        },
      }));
    }

    const newAnnotation = {
      uid: `annotation-${Date.now()}`,
      student_entry_id: entryId,
      account_id: "",
      account_number: "",
      debit: 0,
      credit: 0,
    };

    setStatementData((prevData) => ({
      ...prevData,
      [statementId]: {
        ...prevData[statementId],
        annotations: [...prevData[statementId].annotations, newAnnotation],
      },
    }));
  };

  const updateAnnotation = (statementId, annotationUid, updatedAnnotation) => {
    if (!statementId || !statementData[statementId]) return;

    console.log("Actualizar ", updatedAnnotation.account_id)

    if (updatedAnnotation.account_number !== undefined) {
      const foundAccount = updatedAnnotation.account_id

      updatedAnnotation.account_id = foundAccount

    }

    setStatementData((prevData) => ({
      ...prevData,
      [statementId]: {
        ...prevData[statementId],
        annotations: prevData[statementId].annotations.map((annotation) =>
          annotation.uid === annotationUid ? { ...annotation, ...updatedAnnotation } : annotation
        ),
      },
    }));
  };

  const handleDeleteAnnotation = (annotationUid) => {
    if (!selectedStatement) return;

    const updatedAnnotations = annotations.filter(
      (annotation) => annotation.uid !== annotationUid
    );

    setStatementData((prevData) => ({
      ...prevData,
      [selectedStatement.id]: {
        entries: entries,
        annotations: updatedAnnotations,
      },
    }));
  };

  const handleSubmitStatement = () => {
    if (!selectedStatement) return;

    setAllStatementsData((prevData) => ({
      ...prevData,
      [selectedStatement.id]: { entries, annotations },
    }));

    setStatementData((prevData) => ({
      ...prevData,
      [selectedStatement.id]: prevData[selectedStatement.id] || { entries: [], annotations: [] },
    }));

    onStatementComplete(selectedStatement.id, { entries, annotations });
  };

  const handleFinalSubmit = () => {
    if (!exercise || !exercise.id) {
      console.error("El objeto exercise no está definido correctamente:", exercise);
      return;
    }

    const updatedStatementsData = { ...allStatementsData, ...statementData };

    if (Object.keys(updatedStatementsData).length === 0) {
      console.error("❌ Error: No hay datos en updatedStatementsData", updatedStatementsData);
      return;
    }

    const dataToSubmit = {
      statementsData: updatedStatementsData,
      taskId: exercise.task.id,
      exerciseId: exercise.id,
    };

    taskSubmitService(dataToSubmit, navigate);
  };

  const updateEntryDate = (statementId, entryNumber, newDate) => {
    setStatementData((prevData) => ({
      ...prevData,
      [statementId]: {
        ...prevData[statementId],
        entries: prevData[statementId].entries.map((entry) =>
          entry.entry_number === entryNumber ? { ...entry, entry_date: newDate } : entry
        ),
      },
    }));
  };

  return (
    <div className='entry_container'>
      <EntryHeader addEntry={() => addEntry(selectedStatement.id)} selectedStatement={selectedStatement} examStarted={examStarted} />
      <section className='modes-entries-containner scroll-style'>
        {entries.map((entry, index) => (
          <Entry
            key={entry.entry_number}
            entryIndex={entry.entry_number}
            number={index + 1}
            date={entry.entry_date}
            // markId={entry.mark_id}
            annotations={annotations.filter(
              (annotation) => annotation.student_entry_id === entry.entry_number
            )}
            updateAnnotation={updateAnnotation}
            deleteAnnotation={handleDeleteAnnotation}
            addAnnotation={(entryId) => addAnnotation(selectedStatement.id, entryId)}
            deleteEntry={removeEntry}
            selectedStatement={selectedStatement}
            updateEntryDate={updateEntryDate}
          />
        ))}
      </section>
      <div className='modes-entries-container--buttons'>
        <button onClick={handleSubmitStatement} className='btn light' disabled={!examStarted}>
          Guardar y Continuar
        </button>
        <button onClick={() => confirmModalRef.current?.showModal()} className='btn' disabled={!examStarted}>
          Enviar Examen
        </button>
      </div>

      <Modal ref={confirmModalRef} modalTitle="Confirmar envío" showButton={false}>
        <p>¿Está seguro de enviar el examen?</p>
        <div className="modal__buttons">
          <button 
            className="btn" 
            onClick={() => {
              confirmModalRef.current?.close();
              handleFinalSubmit();
            }}
          >
            Sí
          </button>
          <button 
            className="btn light" 
            onClick={() => confirmModalRef.current?.close()}
          >
            No
          </button>
        </div>
      </Modal>
      
    </div >
  )
}

export default EntriesSection
