export function initMap() {
  const container = document.getElementById('region-map')
  if (!container) return

  // Leaflet CDN könnte noch laden — warte bis verfügbar
  if (typeof window.L === 'undefined') {
    const check = setInterval(() => {
      if (typeof window.L !== 'undefined') {
        clearInterval(check)
        renderMap(container)
      }
    }, 100)
    setTimeout(() => clearInterval(check), 10000) // Timeout nach 10s
    return
  }

  renderMap(container)
}

function renderMap() {
  const container = document.getElementById('region-map')
  const L = window.L

  const map = L.map('region-map', {
    center: [54.516, 9.550],
    zoom: 9,
    scrollWheelZoom: false,
    dragging: false,
    zoomControl: false,
    doubleClickZoom: false,
    touchZoom: false,
    keyboard: false,
    attributionControl: true,
  })

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 14,
  }).addTo(map)

  // Amber pulse marker für Schleswig
  const amberIcon = L.divIcon({
    className: 'map-marker-amber',
    html: `
      <div class="map-pulse-wrap">
        <span class="map-pulse-ring"></span>
        <span class="map-pulse-dot"></span>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })

  // Klein blauer Dot für Städte
  const cityIcon = L.divIcon({
    className: 'map-marker-city',
    html: '<span class="map-city-dot"></span>',
    iconSize: [8, 8],
    iconAnchor: [4, 4],
  })

  // Schleswig — Hauptmarker
  L.marker([54.516, 9.550], { icon: amberIcon })
    .bindTooltip('<strong>Schleswig</strong><br>Ihr Energieberater vor Ort', {
      permanent: false,
      direction: 'top',
      offset: [0, -14],
      className: 'map-tooltip',
    })
    .addTo(map)

  // Städte
  const cities = [
    { name: 'Flensburg',   lat: 54.793, lng: 9.437 },
    { name: 'Kiel',        lat: 54.323, lng: 10.122 },
    { name: 'Husum',       lat: 54.483, lng: 9.050 },
    { name: 'Rendsburg',   lat: 54.303, lng: 9.663 },
    { name: 'Neumünster',  lat: 54.073, lng: 9.981 },
    { name: 'Lübeck',      lat: 53.866, lng: 10.686 },
    { name: 'Heide',       lat: 54.196, lng: 9.095 },
  ]

  cities.forEach(city => {
    L.marker([city.lat, city.lng], { icon: cityIcon })
      .bindTooltip(city.name, {
        permanent: false,
        direction: 'top',
        offset: [0, -6],
        className: 'map-tooltip',
      })
      .addTo(map)
  })

  // Leaflet braucht korrekte Container-Größe — reveal-Animation setzt opacity:0
  // invalidateSize wenn der Container sichtbar wird
  const wrap = container.closest('.reveal')
  if (wrap) {
    const observer = new MutationObserver(() => {
      if (wrap.classList.contains('visible')) {
        setTimeout(() => map.invalidateSize(), 100)
        observer.disconnect()
      }
    })
    observer.observe(wrap, { attributes: true, attributeFilter: ['class'] })
    // Falls bereits sichtbar
    if (wrap.classList.contains('visible')) {
      setTimeout(() => map.invalidateSize(), 100)
    }
  }

  // Styles in <head> injizieren
  if (!document.getElementById('map-styles')) {
    const style = document.createElement('style')
    style.id = 'map-styles'
    style.textContent = `
      .map-pulse-wrap {
        position: relative;
        width: 24px; height: 24px;
        display: flex; align-items: center; justify-content: center;
      }
      .map-pulse-ring {
        position: absolute;
        width: 24px; height: 24px;
        border-radius: 50%;
        background: rgba(232,168,56,0.15);
        border: 1.5px solid #E8A838;
        animation: mapPulse 2.2s ease-out infinite;
      }
      .map-pulse-dot {
        width: 10px; height: 10px;
        border-radius: 50%;
        background: #E8A838;
        box-shadow: 0 0 10px rgba(232,168,56,0.8);
        position: relative; z-index: 1;
      }
      .map-city-dot {
        display: block;
        width: 8px; height: 8px;
        border-radius: 50%;
        background: #3A7CA5;
        border: 1px solid rgba(255,255,255,0.25);
        box-shadow: 0 0 5px rgba(58,124,165,0.6);
      }
      @keyframes mapPulse {
        0%   { transform: scale(1);   opacity: 0.9; }
        70%  { transform: scale(2.8); opacity: 0; }
        100% { transform: scale(2.8); opacity: 0; }
      }
      .map-tooltip {
        background: rgba(12,20,30,0.95) !important;
        border: 1px solid rgba(232,168,56,0.3) !important;
        color: #F2F0EB !important;
        font-family: Inter, sans-serif !important;
        font-size: 12px !important;
        border-radius: 8px !important;
        padding: 5px 12px !important;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
        white-space: nowrap !important;
        line-height: 1.5 !important;
      }
      .map-tooltip::before { display: none !important; }
      .leaflet-attribution-flag { display: none !important; }
      .leaflet-control-attribution {
        background: rgba(10,18,26,0.8) !important;
        color: #3a4a5a !important;
        font-size: 9px !important;
        border-radius: 4px 0 0 0 !important;
      }
      .leaflet-control-attribution a { color: #3A7CA5 !important; }
    `
    document.head.appendChild(style)
  }
}
