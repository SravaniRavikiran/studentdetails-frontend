import React, { useState } from 'react';

const COForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        coCode: '',
        description: '',
        bloomLevel: '',
        correlationStrength: 1,
        pos: [],
        psos: [],
        justification: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="coCode" placeholder="CO Code" onChange={handleChange} required />
            <input name="description" placeholder="Description" onChange={handleChange} required />
            <input name="bloomLevel" placeholder="Bloom's Level" onChange={handleChange} required />
            <input name="correlationStrength" type="number" placeholder="Correlation Strength" onChange={handleChange} required />
            <input name="pos" placeholder="POs (comma-separated)" onChange={handleChange} required />
            <input name="psos" placeholder="PSOs (comma-separated)" onChange={handleChange} />
            <input name="justification" placeholder="Justification" onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default COForm;
