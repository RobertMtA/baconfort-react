const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function checkRobertoUser() {
    try {
        await mongoose.connect('mongodb+srv://baconfort:Baconfort123@baconfort.lc4nfir.mongodb.net/baconfort?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('🔗 Conectado a MongoDB');
        
        // Buscar usuarios con email relacionado a Roberto
        const users = await User.find({
            $or: [
                { email: /roberto/i },
                { firstName: /roberto/i },
                { lastName: /roberto/i }
            ]
        });
        
        console.log(`📋 Usuarios encontrados: ${users.length}`);
        
        for (const user of users) {
            console.log('👤 Usuario:', {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            });
            
            // Probar con algunas contraseñas comunes
            const passwords = ['123456', 'password', 'roberto', 'Roberto123', 'baconfort'];
            
            for (const password of passwords) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    console.log(`✅ Contraseña encontrada para ${user.email}: ${password}`);
                    break;
                }
            }
        }
        
        // Crear usuario Roberto si no existe
        if (users.length === 0) {
            console.log('🛠️ Creando usuario Roberto...');
            
            const hashedPassword = await bcrypt.hash('Roberto123', 10);
            
            const newUser = new User({
                firstName: 'Roberto',
                lastName: 'Admin',
                email: 'roberto@baconfort.com',
                password: hashedPassword,
                phone: '+54 11 1234-5678',
                role: 'admin'
            });
            
            await newUser.save();
            console.log('✅ Usuario Roberto creado exitosamente');
            console.log('📧 Email: roberto@baconfort.com');
            console.log('🔑 Contraseña: Roberto123');
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Desconectado de MongoDB');
        process.exit(0);
    }
}

checkRobertoUser();
