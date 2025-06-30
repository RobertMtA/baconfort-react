// Script para agregar usuario admin por defecto
console.log('🔧 Agregando usuario admin por defecto...');

// Obtener usuarios existentes o crear array vacío
let users = [];
const existingUsers = localStorage.getItem('baconfort-users');
if (existingUsers) {
  try {
    users = JSON.parse(existingUsers);
  } catch (error) {
    console.error('Error parsing existing users:', error);
  }
}

// Verificar si ya existe el admin
const adminExists = users.find(u => u.email === 'admin@baconfort.com');

if (!adminExists) {
  const adminUser = {
    id: 'admin_001',
    name: 'Administrador BACONFORT',
    email: 'admin@baconfort.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString()
  };
  
  users.push(adminUser);
  localStorage.setItem('baconfort-users', JSON.stringify(users));
  
  console.log('✅ Usuario admin creado:');
  console.log('Email: admin@baconfort.com');
  console.log('Contraseña: admin123');
  console.log('Rol: admin');
} else {
  console.log('ℹ️ Usuario admin ya existe');
}

// Agregar un usuario guest de ejemplo
const guestExists = users.find(u => u.email === 'guest@example.com');
if (!guestExists) {
  const guestUser = {
    id: 'guest_001',
    name: 'Usuario Demo',
    email: 'guest@example.com',
    password: 'guest123',
    role: 'guest',
    createdAt: new Date().toISOString()
  };
  
  users.push(guestUser);
  localStorage.setItem('baconfort-users', JSON.stringify(users));
  
  console.log('✅ Usuario guest demo creado:');
  console.log('Email: guest@example.com');
  console.log('Contraseña: guest123');
  console.log('Rol: guest');
}

console.log(`📊 Total usuarios: ${users.length}`);
console.log('🔄 Recarga la página para ver los cambios');
