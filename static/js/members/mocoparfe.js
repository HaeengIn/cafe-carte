fetch("/static/data/members/mocoparfe.json")
    .then(response => response.json())
    .then(data => {
        const percentage = data.contents.percentage;

        new Chart(document.getElementById("percentageChart"), {
            type: "pie",
            data: {
                labels: percentage.map(item => item.label),
                datasets: [{
                    data: percentage.map(item => item.value),
                    backgroundColor: [
                        "#fba7d2",
                        "#ffaabe",
                        "#ffb4a3",
                        "#ffc687",
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: context => `${context.label}: ${context.raw}%`
                        }
                    }
                }
            }
        });
    });