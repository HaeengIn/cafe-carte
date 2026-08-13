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
                        "#f03c4b",
                        "#ffce90",
                        "#ceb4f1",
                        "#a7cdfb",
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