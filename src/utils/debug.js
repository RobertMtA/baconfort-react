// Utilidades de debug para desarrollo
export const debugUtils = {
  // Mostrar todos los usuarios en localStorage
  showUsers: () => {
    const users = JSON.parse(localStorage.getItem('baconfort-users') || '[]');
    console.log('👥 Usuarios en localStorage:', users);
    return users;
  },

  // Limpiar todos los usuarios (excepto demos)
  clearUsers: () => {
    const demos = [
      {
        id: 'admin_001',
        name: 'Administrador BACONFORT',
        email: 'admin@baconfort.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: 'guest_001',
        name: 'Usuario Demo',
        email: 'guest@example.com',
        password: 'guest123',
        role: 'guest',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('baconfort-users', JSON.stringify(demos));
    console.log('🧹 Usuarios limpiados, solo quedan los demos');
    window.dispatchEvent(new CustomEvent('baconfort-users-updated', { detail: demos }));
  },

  // Crear un usuario de prueba
  createTestUser: () => {
    const users = JSON.parse(localStorage.getItem('baconfort-users') || '[]');
    const testUser = {
      id: Date.now().toString(),
      name: 'Usuario de Prueba',
      email: 'test@example.com',
      password: 'test123',
      role: 'guest',
      createdAt: new Date().toISOString()
    };
    users.push(testUser);
    localStorage.setItem('baconfort-users', JSON.stringify(users));
    console.log('✅ Usuario de prueba creado:', testUser);
    window.dispatchEvent(new CustomEvent('baconfort-users-updated', { detail: users }));
    return testUser;
  },

  // Limpiar todo localStorage de BACONFORT
  clearAll: () => {
    localStorage.removeItem('baconfort-users');
    localStorage.removeItem('baconfort-user');
    localStorage.removeItem('baconfort-reviews');
    localStorage.removeItem('baconfort-prices');
    console.log('🧹 Todo el localStorage de BACONFORT limpiado');
    window.location.reload();
  }
};

// Hacer disponible globalmente en desarrollo
if (process.env.NODE_ENV === 'development') {
  window.debugBaconfort = debugUtils;
  console.log('🛠️ Utilidades de debug disponibles en window.debugBaconfort');
}
