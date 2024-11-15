import React, { useState, useEffect} from "react";
import AccountingPlanDataService from "../../services/AccountingPlanService"
import { Link } from "react-router-dom";
import AddAccountingPlan from "./AddAccountingPlan";

const AccountingPlansList = () => {
    const [accountingPlans, setAccountingPlans] = useState([]);
    const [currentAccountingPlan, setCurrentAccountingPlan] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    
    useEffect(() => {
        retrieveAccountingPlans();
    }, []);

    const retrieveAccountingPlans = () => {
        AccountingPlanDataService.getAll()
            .then(response => {
                setAccountingPlans(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveAccountingPlans();
        setCurrentAccountingPlan(null);
        setCurrentIndex(-1);
    };

    const setActiveAccountingPlan = (accountingPlan, index) => {
        setCurrentAccountingPlan(accountingPlan);
        setCurrentIndex(index);
    };

    const removeAllAccountingPlans = () => {
        AccountingPlanDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <>
            <Link to={"/home"}>
                Volver al home
            </Link>
            <div>
                <h4>Accounting Plans list</h4>

                <ul>
                    {accountingPlans && accountingPlans.map((accountingPlan, index) => (
                        <li onClick={() => setActiveAccountingPlan(accountingPlan, index)} key={index}>
                            {accountingPlan.name}
                        </li>
                    ))}
                </ul>

                <button><Link to={"/add-accounting-plan"}>Añadir nuevo plan</Link></button>
                <button onClick={removeAllAccountingPlans}>Borrar todo</button>

            </div>

            <div>
                {currentAccountingPlan ? (
                    <div>
                        <h4>Accounting Plan</h4>
                        <div>
                            <label>
                                <strong>Nombre: </strong>
                            </label>{""}
                            {currentAccountingPlan.name}
                        </div>
                        <div>
                            <label>
                                <strong>Descripción: </strong>
                            </label>{""}
                            {currentAccountingPlan.description}
                        </div>
                        <div>
                            <label>
                                <strong>Acrónimo: </strong>
                            </label>{""}
                            {currentAccountingPlan.acronym}
                        </div>
                        <Link to={"/accounting-plans/" + currentAccountingPlan.id}>
                            Editar
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Haga click sobre un plan de cuentas</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default AccountingPlansList;