#!/usr/bin/env node

/**
 * Script para detectar posibles duplicaciones en formularios
 * Busca IDs y names duplicados que puedan causar problemas
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(__dirname, 'src', 'components');

// Patrones para buscar IDs y names de inputs
const patterns = {
  id: /id="([^"]+)"/g,
  name: /name="([^"]+)"/g,
  htmlFor: /htmlFor="([^"]+)"/g
};

console.log('🔍 Verificación de Duplicaciones en Formularios - BACONFORT\n');

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    const issues = [];
    
    // Buscar cada tipo de atributo
    Object.entries(patterns).forEach(([type, pattern]) => {
      const matches = [...content.matchAll(pattern)];
      const values = matches.map(match => match[1]);
      
      // Encontrar duplicados
      const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
      const uniqueDuplicates = [...new Set(duplicates)];
      
      if (uniqueDuplicates.length > 0) {
        issues.push({
          type,
          duplicates: uniqueDuplicates,
          file: fileName
        });
      }
    });
    
    return issues;
  } catch (error) {
    console.error(`Error leyendo ${filePath}:`, error.message);
    return [];
  }
}

function scanDirectory(dir) {
  const allIssues = [];
  
  try {
    const files = fs.readdirSync(dir, { recursive: true });
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isFile() && (file.endsWith('.jsx') || file.endsWith('.js'))) {
        const issues = scanFile(fullPath);
        if (issues.length > 0) {
          allIssues.push(...issues);
        }
      }
    });
  } catch (error) {
    console.error(`Error escaneando directorio ${dir}:`, error.message);
  }
  
  return allIssues;
}

// Escanear componentes
const issues = scanDirectory(componentsDir);

if (issues.length === 0) {
  console.log('✅ ¡No se encontraron duplicaciones de IDs o names!');
  console.log('✅ Todos los formularios tienen identificadores únicos.');
} else {
  console.log('⚠️  Se encontraron posibles duplicaciones:');
  console.log('');
  
  issues.forEach(issue => {
    console.log(`📁 Archivo: ${issue.file}`);
    console.log(`🔍 Tipo: ${issue.type}`);
    console.log(`❌ Duplicados: ${issue.duplicates.join(', ')}`);
    console.log('');
  });
  
  console.log('💡 Revisa estos archivos para asegurar que no haya conflictos.');
}

console.log('\n📊 Resumen:');
console.log(`   Archivos escaneados: ${fs.readdirSync(componentsDir, { recursive: true }).filter(f => f.endsWith('.jsx') || f.endsWith('.js')).length}`);
console.log(`   Problemas encontrados: ${issues.length}`);
console.log(`   Estado: ${issues.length === 0 ? 'Limpio' : 'Requiere revisión'}`);
