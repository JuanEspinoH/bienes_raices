;(function () {
  const lat = 20.67444163271174
  const lng = -103.38739216304566
  const mapa = L.map('mapa').setView([lat, lng], 16)

  let marker

  const geocodeServide = L.esri.Geocoding.geocodeService()

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa)

  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(mapa)

  marker.on('moveend', function (e) {
    marker = e.target
    const position = marker.getLatLng()
    mapa.panTo(new L.LatLng(position.lat, position.lng))
    geocodeServide
      .reverse()
      .latlng(position, 13)
      .run((error, resultado) => {
        console.log(resultado)
      })
  })
})()
