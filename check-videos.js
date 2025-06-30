#!/usr/bin/env node

/**
 * Script para verificar la integridad de archivos de video en BACONFORT
 * Verifica que todos los departamentos tengan sus archivos de video correspondientes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoDir = path.join(__dirname, 'public', 'video');
const pagesDir = path.join(__dirname, 'src', 'pages');

// Videos requeridos según los departamentos
const requiredVideos = [
  'video-portada-convencion-1994.mp4',
  'video-portada-dorrego-1548.mp4', 
  'video-portada-moldes-1680.mp4',
  'video-portada-santa-fe-3770.mp4',
  'video-portada-ugarteche-2824.mp4',
  'video-portada-principal.mp4'
];

console.log('🎬 Verificación de Archivos de Video - BACONFORT\n');

// Verificar que exista la carpeta de videos
if (!fs.existsSync(videoDir)) {
  console.error('❌ ERROR: Carpeta public/video no existe');
  process.exit(1);
}

// Listar archivos existentes
const existingFiles = fs.readdirSync(videoDir).filter(file => file.endsWith('.mp4'));
console.log('📁 Archivos de video encontrados:');
existingFiles.forEach(file => {
  console.log(`   ✅ ${file}`);
});
console.log('');

// Verificar archivos requeridos
console.log('🔍 Verificando archivos requeridos:');
let allPresent = true;

requiredVideos.forEach(required => {
  if (existingFiles.includes(required)) {
    console.log(`   ✅ ${required}`);
  } else {
    console.log(`   ❌ ${required} - FALTANTE`);
    allPresent = false;
  }
});

console.log('');

// Verificar archivos extra
const extraFiles = existingFiles.filter(file => !requiredVideos.includes(file));
if (extraFiles.length > 0) {
  console.log('📎 Archivos adicionales encontrados:');
  extraFiles.forEach(file => {
    console.log(`   ℹ️  ${file}`);
  });
  console.log('');
}

// Resultado final
if (allPresent) {
  console.log('🎉 ¡Todos los archivos de video están presentes!');
} else {
  console.log('⚠️  Algunos archivos de video están faltando.');
  console.log('💡 Tip: Puedes copiar video-portada-principal.mp4 para crear los faltantes.');
}

console.log('\n📊 Resumen:');
console.log(`   Total archivos: ${existingFiles.length}`);
console.log(`   Requeridos: ${requiredVideos.length}`);
console.log(`   Estado: ${allPresent ? 'Completo' : 'Incompleto'}`);
