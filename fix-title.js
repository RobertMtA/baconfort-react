const axios = require('axios');

const BACKEND_URL = 'http://localhost:5000';
const ADMIN_TOKEN = 'ADMIN_DEMO_TOKEN';

async function fixTitle() {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/properties/moldes1680`, {
            title: 'Moldes 1680'
        }, {
            headers: {
                'Authorization': `Bearer ${ADMIN_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('✅ Título restaurado:', response.data.message);
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

fixTitle();
