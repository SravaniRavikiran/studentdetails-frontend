import React from 'react';

const calculatePOAttainment = (coOutcomes = [], po) => {
    if (coOutcomes.length === 0) return 0; // handle cases where no outcomes are present
    
    let totalStrength = 0;
    let totalWeightedAttainment = 0;

    coOutcomes.forEach(co => {
        if (co.pos.includes(po)) {
            totalStrength += co.correlationStrength;
            totalWeightedAttainment += co.correlationStrength * co.attainment;
        }
    });

    return totalStrength ? totalWeightedAttainment / totalStrength : 0;
}


const POAttainment = ({ outcomes }) => {
    const poAttainment = calculatePOAttainment(outcomes, 'PO1');  // Example for PO1

    return (
        <div>
            <h2>PO1 Attainment: {poAttainment}</h2>
        </div>
    );
}

export default POAttainment;
