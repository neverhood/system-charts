var init = function() {
    Chart.defaults.global.responsive = true;
    Chart.types.Line.extend({
        name : "AltLine",

        initialize : function(data) {
            Chart.types.Line.prototype.initialize.apply(this, arguments);
            this.scale.draw = function() {
                if (this.display && (this.xLabelRotation > 50)) {
                    this.endPoint = this.height - 5;
                }

                Chart.Scale.prototype.draw.apply(this, arguments);
            };
        }
    });

    var chartData = document.getElementById('chart-data');
    var data = JSON.parse(chartData.innerText);

    var ctx = document.getElementById("chart").getContext("2d");
    var chart = new Chart(ctx).AltLine(data);
}

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        init();

        clearInterval(readyStateCheckInterval);
    }
}, 10);
