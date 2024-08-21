import React from 'react';
import Chart from 'react-apexcharts';

const MyChart = () => {
    const state = {
        options: {
            chart: {
                id: 'basic-line'
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
            }
        },
        series: [{
            name: 'Sales',
            data: [30, 40, 35, 50, 49, 60, 70]
        }]
    };

    return (
        <div>
            <h2>My Line Chart</h2>
            <Chart
                options={state.options}
                series={state.series}
                type="line"
                height={350}
            />
        </div>
    );
};

export default MyChart;
