// Script para actualizar las secciones de amenities en todos los departamentos restantes
const fs = require('fs');
const path = require('path');

const departments = [
  { file: 'Dorrego1548.jsx', id: 'dorrego1548' },
  { file: 'Convencion1994.jsx', id: 'convencion1994' }
];

const pagesDir = 'c:\\Users\\rober\\Desktop\\baconfort3\\baconfort-react\\src\\pages';

// Plantilla de sección de amenities mejorada
const getAmenitiesSection = (backendPropertyVar = 'backendProperty', isPropertyLoadingVar = 'isPropertyLoading') => `
                  <div className="amenities-list mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="h5 mb-0">
                        <i className="fas fa-star"></i> Comodidades Destacadas
                        {${backendPropertyVar} === null && (
                          <small className="text-warning ms-2" title="Datos locales - Backend no disponible">
                            <i className="fas fa-exclamation-triangle"></i>
                          </small>
                        )}
                      </h3>
                      <div className="d-flex align-items-center">
                        {${backendPropertyVar} === null && (
                          <small className="text-muted me-2">Modo offline</small>
                        )}
                        <button 
                          onClick={() => window.location.reload()}
                          className="btn btn-sm btn-outline-primary"
                          title="Actualizar comodidades"
                          disabled={${isPropertyLoadingVar}}
                        >
                          <i className={\`fas fa-sync-alt \${${isPropertyLoadingVar} ? 'fa-spin' : ''}\`}></i>
                          {${isPropertyLoadingVar} ? ' Actualizando...' : ' Actualizar'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Mostrar comodidades dinámicas del backend */}
                    {property?.amenities ? (
                      <div className="row">
                        {/* Departamento */}
                        {property.amenities.departamento && property.amenities.departamento.length > 0 && (
                          <div className="col-md-4">
                            <h4 className="h6 mb-3"><i className="fas fa-home"></i> Departamento</h4>
                            <ul className="list-unstyled">
                              {property.amenities.departamento.map((amenity, index) => (
                                <li key={\`dept-\${index}\`}>
                                  <i className={amenity.icon}></i> {amenity.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Servicios */}
                        {property.amenities.servicios && property.amenities.servicios.length > 0 && (
                          <div className="col-md-4">
                            <h4 className="h6 mb-3"><i className="fas fa-concierge-bell"></i> Servicios</h4>
                            <ul className="list-unstyled">
                              {property.amenities.servicios.map((amenity, index) => (
                                <li key={\`serv-\${index}\`}>
                                  <i className={amenity.icon}></i> {amenity.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Amenities del Edificio */}
                        {property.amenities.amenitiesEdificio && property.amenities.amenitiesEdificio.length > 0 && (
                          <div className="col-md-4">
                            <h4 className="h6 mb-3"><i className="fas fa-building"></i> Amenities del Edificio</h4>
                            <ul className="list-unstyled">
                              {property.amenities.amenitiesEdificio.map((amenity, index) => (
                                <li key={\`amenities-\${index}\`}>
                                  <i className={amenity.icon}></i> {amenity.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Fallback: mostrar mensaje de carga */
                      <div className="row">
                        <div className="col-md-12">
                          <div className="text-center text-muted p-4">
                            {${isPropertyLoadingVar} ? (
                              <>
                                <i className="fas fa-spinner fa-spin"></i> 
                                <span className="ms-2">Cargando comodidades...</span>
                              </>
                            ) : (
                              <>
                                <i className="fas fa-info-circle"></i>
                                <span className="ms-2">Comodidades no disponibles</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>`;

function updateDepartmentAmenities(filename) {
  const filePath = path.join(pagesDir, filename);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Buscar la sección de amenities existente
    const amenitiesStart = content.indexOf('<div className="amenities-list');
    const amenitiesEnd = content.indexOf('</div>', amenitiesStart + 1000); // Buscar cierre dentro de un rango razonable
    
    if (amenitiesStart !== -1 && amenitiesEnd !== -1) {
      // Extraer la parte antes y después de la sección de amenities
      const before = content.substring(0, amenitiesStart);
      const after = content.substring(amenitiesEnd + 6); // +6 para incluir </div>
      
      // Reemplazar con la nueva sección
      const newContent = before + getAmenitiesSection() + after;
      
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ ${filename}: Sección de amenities actualizada`);
    } else {
      console.log(`⚠️ ${filename}: No se encontró sección de amenities para actualizar`);
    }
    
  } catch (error) {
    console.error(`❌ Error procesando ${filename}:`, error.message);
  }
}

console.log('🔄 Actualizando secciones de amenities...\n');

departments.forEach(dept => updateDepartmentAmenities(dept.file));

console.log('\n🎉 Actualizaciones completadas!');
