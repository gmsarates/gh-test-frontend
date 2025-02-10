import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Report = () => {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/activities/report');
                setReportData(response.data);
            } catch (error) {
                console.error('Error fetching report:', error);
            }
        };

        fetchReport();
    }, []);

    return (
        <div>
            <h2>Relatório de Tempo Gasto por Dia</h2>
            <table>
                <thead>
                <tr>
                    <th>Dia</th>
                    <th>Tempo</th>
                </tr>
                </thead>
                <tbody>
                {reportData.map((item) => (
                    <tr key={item.day}>
                        <td>{new Date(item.day).toLocaleDateString()}</td>
                        <td>{item.total_hours.toFixed(2)} hrs</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;