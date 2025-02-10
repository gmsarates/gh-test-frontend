import React, {useState} from 'react';
import axios from 'axios';
import {Button, Modal, Row, Col, Form} from "react-bootstrap";
import Toast from './Toast';

const ActivityForm = ({handleModal, onActivityAdded}) => {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newActivity = {name, startTime, endTime};
        console.log(newActivity)
        try {
            const response = await axios.post('http://localhost:3000/api/activities', newActivity);
            onActivityAdded(response.data);
            setName('');
            setStartTime('');
            setEndTime('');

            handleModal.close();
            Toast('success', 'Atividade adicionada com sucesso');
        } catch (error) {
            console.error('Error adding activity:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Modal show={handleModal.isShown} onHide={handleModal.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar atividade</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Início da atividade</label>
                    <input
                        type="text"
                        placeholder="Nome da Atividade"
                        className="form-control mb-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Row>
                        <Col>
                            <label>Início da atividade</label>
                            <input
                                type="datetime-local"
                                className="form-control mb-3"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </Col>
                        <Col>
                            <label>Início da atividade</label>
                            <input
                                type="datetime-local"
                                className="form-control mb-3"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModal.close}>
                        Fechar
                    </Button>
                    <Button type="submit" onClick={handleSubmit}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    );
};

export default ActivityForm;