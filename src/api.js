export const getOutcomes = async () => {
    const response = await fetch('/api/outcomes');
    return response.json();
};

export const submitOutcomes = async (outcomeData) => {
    const response = await fetch('/api/outcomes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(outcomeData),
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to submit outcome: ${errorMessage}`);
    }
  
    return response.json();
  };
  
