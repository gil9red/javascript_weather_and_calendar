function update_weather_info(div_id, city) {
    var url = "https://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D'" + city + "')%20and%20u%3D'c'&format=json&diagnostics=true&callback=";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
  
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText);
            
            var condition = data.query.results.channel.item.condition;
            var weather_temp_C = condition.temp;
            var weather_text = condition.text;
            var weather_image = '<img src="http://l.yimg.com/a/i/us/we/52/' + condition.code + '.gif">';
 
            var weather_info_block = "<div class='city'>" + city + "</div>";
            weather_info_block += "<table><tr><td>";
            weather_info_block += "<span class='temp'>" + weather_temp_C + "</span>";
            weather_info_block += "<sup class='temp_type'>°C</sup>";
            weather_info_block += "</td>";
            weather_info_block += "<td>";
            weather_info_block += weather_image;
            weather_info_block += "</td>";
            weather_info_block += "</tr></table>";
            
            weather_info_block += "<div class='weather_text'>" + weather_text + "</div>";
            document.getElementById(div_id).innerHTML = weather_info_block;
        }
    };
    
    xhr.send();
}
