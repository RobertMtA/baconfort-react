const mongoose = require('mongoose');
const User = require('./models/User');

async function generateResetToken() {
    try {
        require('dotenv').config();
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('🔗 Conectado a MongoDB');
        
        // Buscar el usuario Roberto
        const user = await User.findOne({ email: 'robertogaona1985@gmail.com' });
        
        if (!user) {
            console.log('❌ Usuario Roberto no encontrado');
            return;
        }
        
        console.log('👤 Usuario encontrado:', user.email);
        
        // Generar token de reseteo
        const crypto = require('crypto');
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Guardar token en la base de datos (válido por 1 hora)
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();
        
        console.log('🔑 Token de reseteo generado:', resetToken);
        console.log('🔗 URL de prueba:', `http://localhost:3001/reset-password?token=${resetToken}`);
        console.log('⏰ Válido hasta:', new Date(user.resetPasswordExpires));
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Desconectado de MongoDB');
        process.exit(0);
    }
}

generateResetToken();
