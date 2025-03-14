import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import Toast from "./Toast";
import moment from 'moment';


const ActivityList = ({ activities, onActivityDeleted }) => {
    const handleDelete = async (id) => {
        withReactContent(Swal).fire({
            icon: 'question',
            title: 'Excluir atividade',
            text: 'Você realmente deseja excluir esta atividade?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(process.env.REACT_APP_API_URL + id);

                    Toast('success', 'Atividade excluída com sucesso');

                    onActivityDeleted(id);
                } catch (error) {
                    console.error('Error deleting activity:', error);
                }
            }
        })
    };

    return (
        <ListGroup className="activities">
            {activities.map((activity) => (
                <ListGroupItem key={activity.id}>
                    <div className="info">
                        <strong>{activity.name}</strong>
                        <div className="d-flex flex-column align-items-start">
                            <small>{moment(activity.startTime).format('DD/MM/YYYY - HH:mm')} até {moment(activity.endTime).format('DD/MM/YYYY - HH:mm')}</small>
                            <small>{activity.elapsedTime} Horas</small>
                        </div>
                    </div>
                    <Button variant="danger" className="ms-auto btn-sm" onClick={() => handleDelete(activity.id)}>Excluir</Button>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default ActivityList;