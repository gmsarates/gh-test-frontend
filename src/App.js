import axios from 'axios';
import React, {useEffect, useState} from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import Report from './components/Report';
import {Modal, Button} from 'react-bootstrap';
import Toast from "./components/Toast";
import {Link, Route, Routes} from "react-router-dom";
import './App.scss'
import ReportPage from "./components/ReportPage";



const App = () => {
    const [activities, setActivities] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const fetchActivities = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/activities');
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    // Não sei se é a melhor solução, mas funcionou bem
    const handleModal = {
        show: handleShowModal,
        close: handleClose,
        isShown: showModal
    }

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleActivityAdded = (newActivity) => {
        setActivities((prevActivities) => [...prevActivities, newActivity]);
    };

    const handleActivityDeleted = (id) => {
        setActivities((prevActivities) => prevActivities.filter(activity => activity.id !== id));
    };

    return (
        <div className="App">
            <div className="header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Gerenciador de Atividades</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Atividades</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/report">Relatório</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="content">
                <div className="container">
                    <div className="card card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4 className="mb-0">Atividades registradas</h4>
                            <Button variant="primary" className="mb-0" onClick={handleShowModal}>
                                Cadastrar nova atividade
                            </Button>
                        </div>
                        <Routes>
                            <Route path="/"
                                   element={<ActivityList activities={activities} onActivityDeleted={handleActivityDeleted}/>}/>
                            <Route path="/report" element={<ReportPage/>}/>
                        </Routes>
                    </div>
                </div>

                <ActivityForm handleModal={handleModal} onActivityAdded={handleActivityAdded} />
            </div>
        </div>
    );
};

export default App;



//<div className="App">
//             <div className="header">
//                 <h1>Gerenciador de Atividades</h1>
//                 <Button variant="light" className="btn-sm px-3">Relatório</Button>
//             </div>
//             <div className="content">
//                 <div className="container">
//                     <div className="card card-body">
//                         <div className="d-flex align-items-center justify-content-between">
//                             <h4 className="mb-0">Atividades registradas</h4>
//                             <Button variant="primary" className="mb-0" onClick={handleShowModal}>
//                                 Cadastrar nova atividade
//                             </Button>
//                         </div>
//
//                         <ActivityList activities={activities} onActivityDeleted={handleActivityDeleted}/>
//                         {/*<Report />*/}
//                     </div>
//                 </div>
//             </div>
//
//
//         </div>