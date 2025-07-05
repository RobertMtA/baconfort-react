const mongoose = require('mongoose');
require('dotenv').config();

// Conectar a MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Conectado a MongoDB');
  } catch (error) {
    console.error('✗ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
}

// Definir modelo User (básico para pruebas)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

// Método para convertir a objeto público (sin contraseña)
userSchema.methods.toPublic = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

async function checkAndCreateUsers() {
  try {
    await connectDB();
    
    console.log('\n=== VERIFICACIÓN DE USUARIOS ===\n');
    
    // Contar usuarios
    const totalUsers = await User.countDocuments();
    console.log(`📊 Total de usuarios en la base de datos: ${totalUsers}`);
    
    if (totalUsers === 0) {
      console.log('⚠️  No hay usuarios en la base de datos. Creando usuario de prueba...\n');
      
      // Crear usuario de prueba
      const testUser = new User({
        name: 'Usuario de Prueba',
        email: 'test@baconfort.com',
        password: 'test123', // En un sistema real esto debería estar hasheado
        role: 'user',
        isVerified: true
      });
      
      await testUser.save();
      console.log('✅ Usuario de prueba creado:');
      console.log('   Email: test@baconfort.com');
      console.log('   Contraseña: test123\n');
    } else {
      console.log('\n--- USUARIOS EXISTENTES ---');
      const users = await User.find({}).select('name email role isVerified createdAt').limit(5);
      
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.name} (${user.email})`);
        console.log(`   Rol: ${user.role} | Verificado: ${user.isVerified ? 'Sí' : 'No'}`);
        console.log(`   Creado: ${user.createdAt.toLocaleDateString()}\n`);
      });
    }
    
    console.log('📋 CREDENCIALES PARA PRUEBAS:');
    console.log('- Email: test@baconfort.com');
    console.log('- Contraseña: test123');
    console.log('- Admin: admin@baconfort.com / admin123\n');
    
    console.log('🔧 ENDPOINTS DISPONIBLES:');
    console.log('- POST /api/auth/login');
    console.log('- POST /api/auth/register');
    console.log('- POST /api/auth/forgot-password ← NUEVO');
    console.log('- POST /api/auth/reset-password ← NUEVO');
    console.log('- GET /api/auth/me\n');
    
  } catch (error) {
    console.error('Error verificando usuarios:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkAndCreateUsers();
