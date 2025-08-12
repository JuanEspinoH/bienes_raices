import { Dropzone } from 'dropzone'

const token = document.querySelector(`meta[name="csrf-token"]`)
console.log(token.content)

Dropzone.autoDiscover = false

let myDropzone = new Dropzone('#imagen', {
  dictDefaultMessage: 'Sube tus imágenes aquí',
  acceptedFiles: '.png,.jpg,.jpeg',
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: true,
  addRemoveLinks: true,
  dictRemoveFile: 'Borrar Archivo',
  dictMaxFilesExceeded: 'El limite es 1 archivo',
  headers: {
    'CSRF-Token': token,
  },
  paramName: 'imagen',
})

myDropzone.on('addedfile', (file) => {
  console.log(`File added: ${file.name}`)
})
