import React, { useState } from "react";
import SchoolServices from "../../services/SchoolsServices.js";
import { Link } from "react-router-dom";
import "./SchoolCenters.css";
import ListSchoolCenter from "./list-school-center/ListSchoolCenter.jsx";
import AddSchoolCenter from "./add-school-center/AddSchoolCenter.jsx";
import FindNameSchoolCenter from "./find-name-school-center/FindNameSchoolCenter.jsx";

const SchoolCenters = () => {
    const initialSchoolState = {
        school_name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        province: ""
    }
    const [formData, setFormData] = useState(initialSchoolState);
    const [updateState, setUpdateState] = useState(false);
    const [newSchool, setNewSchool] = useState(false);


    const addSchool = (e) => {
        e.preventDefault();
        SchoolServices.create(formData)
            .then(response => {
                setNewSchool(true);
            }).catch(e => {
                console.log(e);
            });
    }

    const deleteSchool = (id) => {
        SchoolServices.remove(id)
            .then(response => {
                setNewSchool(true);
            }).catch(e => {
                console.log(e);
            });
    }

    const updateForm = (school) => {
        setUpdateState(true);
        if (formData != initialSchoolState) {
            setFormData(initialSchoolState);
        }
        setFormData(school);
    }

    const editSchool = (e) => {
        e.preventDefault();
        SchoolServices.update(formData.id, formData)
            .then(response => {
                allSchools();
            }).catch(e => {
                console.log(e);
            });
        setFormData(initialSchoolState);
    }

    return (
        <main className="school-center_page">
            <ListSchoolCenter
                newSchool={newSchool}
            />
            <AddSchoolCenter
                addSchool={addSchool}
                editSchool={editSchool}
                updateForm={updateForm}
                deleteSchool={deleteSchool}
                updateState={updateState}
                formData={formData}
                setFormData={setFormData}
            />
            <FindNameSchoolCenter />
        </main>
    )
};
export default SchoolCenters;