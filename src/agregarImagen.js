import { Dropzone } from 'dropzone'
Dropzone.autoDiscover = false

let myDropzone = new Dropzone('#imagen', {
  dictDefaultMessage: 'Sube tus imágenes aquí',
  acceptedFiles: '.png,.jpg,.jpeg',
  maxFilesize: 5,
  maxFiles: 1,
})

myDropzone.on('addedfile', (file) => {
  console.log(`File added: ${file.name}`)
})
