const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Reservation = require('./models/Reservation');

async function createRobertoComplete() {
    try {
        // Usar la misma URI que el servidor
        require('dotenv').config();
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://BACONFORT:Roccosa226@cluster0.lzugghn.mongodb.net/baconfort?retryWrites=true&w=majority&appName=Cluster0');
        
        console.log('🔗 Conectado a MongoDB');
        
        // Limpiar usuarios existentes con email de Roberto
        await User.deleteMany({ 
            email: { $in: ['robertogaona1985@gmail.com', 'roberto@test.com', 'roberto@baconfort.com'] }
        });
        
        console.log('🧹 Usuarios Roberto anteriores eliminados');
        
        // Crear usuario Roberto
        const hashedPassword = await bcrypt.hash('123456', 10);
        
        const roberto = new User({
            name: 'Roberto Gaona',
            email: 'robertogaona1985@gmail.com',
            password: hashedPassword,
            role: 'guest'
        });
        
        await roberto.save();
        console.log('✅ Usuario Roberto creado exitosamente');
        console.log('📧 Email: robertogaona1985@gmail.com');
        console.log('🔑 Contraseña: 123456');
        console.log(`👤 ID: ${roberto._id}`);
        
        // Limpiar reservas anteriores de Roberto
        await Reservation.deleteMany({ userId: roberto._id });
        
        // Crear reservas para Roberto
        const reservations = [
            {
                userId: roberto._id,
                userEmail: roberto.email,
                userName: roberto.name,
                propertyId: 'convencion-1994',
                propertyName: 'Convención 1994',
                checkIn: new Date('2024-12-20'),
                checkOut: new Date('2024-12-25'),
                guests: '4',
                fullName: roberto.name,
                email: roberto.email,
                phone: '',
                message: 'Reserva para vacaciones de diciembre',
                totalPrice: 8500,
                status: 'confirmed'
            },
            {
                userId: roberto._id,
                userEmail: roberto.email,
                userName: roberto.name,
                propertyId: 'dorrego-1548',
                propertyName: 'Dorrego 1548',
                checkIn: new Date('2025-01-15'),
                checkOut: new Date('2025-01-20'),
                guests: '2',
                fullName: roberto.name,
                email: roberto.email,
                phone: '',
                message: 'Viaje de trabajo',
                totalPrice: 5200,
                status: 'pending'
            },
            {
                userId: roberto._id,
                userEmail: roberto.email,
                userName: roberto.name,
                propertyId: 'santa-fe-3770',
                propertyName: 'Santa Fe 3770',
                checkIn: new Date('2024-11-10'),
                checkOut: new Date('2024-11-15'),
                guests: '3',
                fullName: roberto.name,
                email: roberto.email,
                phone: '',
                message: 'Reserva completada el mes pasado',
                totalPrice: 6800,
                status: 'completed'
            }
        ];
        
        const savedReservations = await Reservation.insertMany(reservations);
        console.log(`📅 ${savedReservations.length} reservas creadas para Roberto`);
        
        // Verificar que todo se guardó correctamente
        const userCount = await User.countDocuments({ email: 'robertogaona1985@gmail.com' });
        const reservationCount = await Reservation.countDocuments({ userId: roberto._id });
        
        console.log(`✅ Verificación final:`);
        console.log(`   - Usuarios Roberto: ${userCount}`);
        console.log(`   - Reservas de Roberto: ${reservationCount}`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Desconectado de MongoDB');
        process.exit(0);
    }
}

createRobertoComplete();
