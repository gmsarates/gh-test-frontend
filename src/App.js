import axios from 'axios';
import React, {useEffect, useState} from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import Report from './components/Report';
import {Modal, Button} from 'react-bootstrap';
import Toast from "./components/Toast";


import './App.scss'

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
                <h1>Gerenciador de Atividades</h1>
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

                        <ActivityList activities={activities} onActivityDeleted={handleActivityDeleted}/>
                        {/*<Report />*/}
                    </div>
                </div>
            </div>

            <ActivityForm handleModal={handleModal} onActivityAdded={handleActivityAdded} />
        </div>
    );
};

export default App;