import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const ReportPage = () => {
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
        <div className="container mt-4">
            <h5>Relatório de tempo gasto por dia</h5>
            <table className="table">
                <thead>
                <tr>
                    <th>Dia</th>
                    <th>Tempo</th>
                </tr>
                </thead>
                <tbody>
                {reportData.map((item) => (
                    <tr key={item.day}>
                        <td>{moment(item.day).format('DD/MM/YYYY')}</td>
                        <td>{parseFloat(item.total_hours).toFixed(2)} hrs</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportPage;