// Sample sales data for 2023
const salesData = [
    { month: 'Jan', revenue: 12000, orders: 150 },
    { month: 'Feb', revenue: 15000, orders: 180 },
    { month: 'Mar', revenue: 18000, orders: 220 },
    { month: 'Apr', revenue: 22000, orders: 270 },
    { month: 'May', revenue: 25000, orders: 300 },
    { month: 'Jun', revenue: 28000, orders: 350 },
    { month: 'Jul', revenue: 32000, orders: 400 },
    { month: 'Aug', revenue: 35000, orders: 450 },
    { month: 'Sep', revenue: 38000, orders: 480 },
    { month: 'Oct', revenue: 41000, orders: 520 },
    { month: 'Nov', revenue: 45000, orders: 580 },
    { month: 'Dec', revenue: 50000, orders: 650 }
];

// Create the sales chart
function createSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: salesData.map(data => data.month),
            datasets: [{
                label: 'Revenue',
                data: salesData.map(data => data.revenue),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }, {
                label: 'Orders',
                data: salesData.map(data => data.orders),
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onHover: (event, elements) => {
                if (elements && elements.length > 0) {
                    highlightTableRow(elements[0].index);
                } else {
                    highlightTableRow(-1);
                }
            }
        }
    });
    return chart;
}

// Populate the sales table
function populateSalesTable() {
    const tableBody = document.querySelector('#salesTable tbody');
    salesData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.month}</td>
            <td>$${data.revenue.toLocaleString()}</td>
            <td>${data.orders}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize the dashboard
let chart;
function initDashboard() {
    chart = createSalesChart();
    populateSalesTable();

    // Add event listener for table rows
    document.querySelector('#salesTable tbody').addEventListener('mouseover', (event) => {
        if (event.target.tagName === 'TD') {
            const row = event.target.parentElement;
            const rowIndex = Array.from(row.parentElement.children).indexOf(row);
            chart.setActiveElements([{ datasetIndex: 0, index: rowIndex }]);
            chart.update();
        }
    });
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initDashboard);


function highlightTableRow(index) {
    const tableRows = document.querySelectorAll('#salesTable tbody tr');
    tableRows.forEach(row => row.classList.remove('highlighted'));
    if (index >= 0 && index < tableRows.length) {
        tableRows[index].classList.add('highlighted');
        tableRows[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}