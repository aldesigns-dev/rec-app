const OPTIONS_API_URL = 'http://localhost:3000/options';
const INSPECTIONS_API_URL = 'http://localhost:3000/inspections';

export const fetchOptions = async () => {
  try {
    const response = await fetch(OPTIONS_API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching options data:', error);
    throw error;
  }
};

export const fetchInspections = async () => {
  try {
    const response = await fetch(INSPECTIONS_API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching inspection data:', error);
    throw error; 
  }
};