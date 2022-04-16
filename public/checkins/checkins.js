async function getData(){
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    // for (const item of data) {
    //     const root = document.createElement('p');
    //     const geo = document.createElement('div');
    //     const date = document.createElement('div');

    //     geo.textContent = `${item.lat}°, ${item.lon}°`;
    //     const dateString = new Date(item.timestamp).toLocaleString();
    //     date.textContent = dateString;

    //     root.append(geo, date);
    //     document.body.append(root);   
    // }

    const map = L.map('map').setView([0,0], 3);
    const attribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(map);

    getData();

    async function getData(){
        const response = await fetch('/api');
        const data = await response.json();

        for(const item of data){
            const marker = L.marker([item.lat, item.lon]).addTo(map);
            //marker.setLatLng([item.lat, item.lon]);
            let txt = `The weather here at ${item.lat}°, ${item.lon}° is ${item.weather.weather[0].main} with a temperature of ${item.weather.main.temp} &deg;Celsius.`
            if(item.air.value < 0){
                txt += '  No air quality reading.'
            } else {
                txt += `The concentration of particulate matter (${item.air.parameter}) 
                is ${item.air.value} ${item.air.unit} last read 
                on ${item.air.lastUpdated}.`;
            }
            marker.bindPopup(txt);
        }
    } 
}

getData(); 