const current = 'GR'
const visited = [
    'BR',
    'TH',
    'AT',
    'DK',
    'FR',
    'DE',
    'GR',
    'HU',
    'IT',
    'MA',
    'NL',
    'PO',
    'ES',
    'CH',
    'GB',
    'US',
    'AE'
]
async function loadGlobe() {
    const countries_data = await fetch('./globe_data.geojson')
    const countries = await countries_data.json()
    console.log(countries)
    const colors = countries.features.map(country => {
        if (current === country.properties['ISO_A2']) return '#FE5F55'
        if (visited.includes(country.properties['ISO_A2'])) return '#643CF5'
        return '#262626'
        
        
    })

    let colorCount = 0;
    const world = Globe({ animateIn: true })
        .backgroundColor("#ffffff")
        
        .globeImageUrl('./gradient.png')
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.3)
        .hexPolygonColor(() => colors[colorCount++])
        .hexPolygonLabel(({ properties: d }) => `
            <b>${d.ADMIN}</b>
        `)
        (document.getElementById('globeViz'))
    world.controls().enableZoom = false
}

loadGlobe()