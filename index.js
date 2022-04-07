const current = {
    city: 'Le Barcares',
    code: 'F'
}

const next = {
    city: 'Athens',
    code: 'GR',
    date: 'April 12, 2022'
}

const visited = [
    'BR',
    'TH',
    'AT',
    'DK',
    'D',
    'F',
    'GR',
    'HU',
    'I',
    'MA',
    'NL',
    'PL',
    'E',
    'CH',
    'GB',
    'US',
    'AE',
    'ZA'
]

async function loadItenarary() {
    document.getElementById('current-location').innerHTML = current.city + ", " + current.code;
    document.getElementById('next-location').innerHTML = next.city + ", " + next.code;
    document.getElementById('next-date').innerHTML = "on " + next.date;
    const locations = document.getElementsByClassName('location-container')
    for (let i = 0; i < locations.length; i += 1) {
        if (locations[i].children['current-location']) {
            locations[i].classList.add('bg-current')
        } else if (locations[i].children['next-location']) {
            locations[i].classList.add('bg-next')
        }
    }
}

async function loadGlobe() {
    const countries_data = await fetch('./globe_data.geojson')
    const countries = await countries_data.json()
    const properties = countries.features.map(country => {
        if (current.code === country.properties['POSTAL']) return { color: '#f9655b', altitude: 0.001 }
        if (visited.includes(country.properties['POSTAL'])) return { color: '#c81d77', altitude: 0.001 }
        return { color: '#3b86f7', altitude: 0.001 }
    })

    let count = 0;
    const world = Globe({ animateIn: true })
        .backgroundColor("#ffffff")
        .height(window.innerHeight * 0.734)
        .globeImageUrl('./gradient.png')
        .hexPolygonsData(countries.features)
        .hexPolygonAltitude(() => properties[count].altitude)
        .hexPolygonResolution(4)
        .hexPolygonMargin(0.2)
        .hexPolygonColor(() => properties[count++].color)
        .hexPolygonLabel(({ properties: d }) => `
            <b>${d.ADMIN}</b>
        `)
        (document.getElementById('globeViz'))
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none'
        document.getElementById('globeViz').style['margin-top'] = '0'
    }, 2000)
}

loadItenarary()
loadGlobe()