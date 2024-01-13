import {writeFile} from '../gateway/file/FileWriter'

export class MainPageView {

    generate() {
        const page: string = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Football predictor</title>
</head>
<body>

    <h2>Click the button to load content from other HTML files</h2>

    <button onclick="loadContent('prediction.html')">Load Prediction Page</button>
    <button onclick="loadContent('statistic.html')">Load Statistic Page</button>

    <div id="content-container">
        <!-- Content will be loaded here -->
    </div>

    <script>
        function loadContent(page) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("content-container").innerHTML = this.responseText;
                }
            };
            xhttp.open("GET", page, true);
            xhttp.send();
        }
    </script>

</body>
</html>`
        writeFile('dist/index.html',
            page)

    }


}