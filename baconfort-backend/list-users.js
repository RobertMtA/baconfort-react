const mongoose = require('mongoose');
const User = require('./models/User');

async function listUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://baconfort:Baconfort123@baconfort.lc4nfir.mongodb.net/baconfort?retryWrites=true&w=majority');
        
        console.log('🔗 Conectado a MongoDB');
        
        const users = await User.find({}, 'firstName lastName email role').limit(20);
        
        console.log(`📋 Total de usuarios: ${users.length}`);
        console.log('👥 Lista de usuarios:');
        
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.firstName} ${user.lastName} - ${user.email} (${user.role})`);
        });
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Desconectado de MongoDB');
        process.exit(0);
    }
}

listUsers();
