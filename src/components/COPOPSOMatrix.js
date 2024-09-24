import React from 'react';

const COPOPSOMatrix = ({ outcomes = [] }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>CO Code</th>
                    <th>Description</th>
                    <th>Bloom's Level</th>
                    <th>Correlation Strength</th>
                    <th>POs</th>
                    <th>PSOs</th>
                    <th>Justification</th>
                </tr>
            </thead>
            <tbody>
                {outcomes.length > 0 ? (
                    outcomes.map((outcome, index) => (
                        <tr key={index}>
                            <td>{outcome.coCode}</td>
                            <td>{outcome.description}</td>
                            <td>{outcome.bloomLevel}</td>
                            <td>{outcome.correlationStrength}</td>
                            <td>{outcome.pos.join(', ')}</td>
                            <td>{outcome.psos.join(', ')}</td>
                            <td>{outcome.justification}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">No data available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default COPOPSOMatrix;
