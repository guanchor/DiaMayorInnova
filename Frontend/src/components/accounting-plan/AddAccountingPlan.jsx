import React, { useState } from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService";
import { Link } from "react-router-dom";

const AddAccountingPlan = () => {
    const initialAccountingPlanState = {
        id: null,
        name: "",
        description: "",
        acronym: ""
    };
    const [accountingPlan, setAccountingPlan] = useState(initialAccountingPlanState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setAccountingPlan({...accountingPlan, [name]:value});
    };

    const saveAccountingPlan = () => {
        var data = {
            name: accountingPlan.name,
            description: accountingPlan.description,
            acronym: accountingPlan.acronym
        };

        AccountingPlanDataService.create(data)
            .then(response => {
                    setAccountingPlan({
                        id: response.data.id,
                        name:response.data.name,
                        description:response.data.description,
                        acronym:response.data.acronym
                    });
                    setSubmitted(true);
                    console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newAccountingPlan = () => {
        setAccountingPlan(initialAccountingPlanState);
        setSubmitted(false);
    };

    return (
        <>
            <Link to={"/accounting-plans"}>
                Atrás
            </Link>

            <div>
                {submitted ? (
                    <div>
                        <h4>You submitted succesfully</h4>
                        <button onClick={newAccountingPlan}>Add</button>
                    </div>
                ) : (
                    <div>
                        <h4>Nuevo plan de cuentas</h4>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={accountingPlan.name}
                                onChange={handleInputChange}
                                name="name">
                            </input>
                        </div>

                        <div>
                            <label>Description</label>
                            <input
                                type="text"
                                id="description"
                                required
                                value={accountingPlan.description}
                                onChange={handleInputChange}
                                name="description">
                            </input>
                        </div>

                        <div>
                            <label>Acronym</label>
                            <input
                                type="text"
                                id="acronym"
                                required
                                value={accountingPlan.acronym}
                                onChange={handleInputChange}
                                name="acronym">
                            </input>
                        </div>

                        <button onClick={saveAccountingPlan}>Submit</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AddAccountingPlan;