import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

const ChartComponent = ({ data, type, options }) => {
    const chartRef = useRef(null); // Reference to the canvas element
    let chartInstance = null; // Variable to store the chart instance

    // Function to render the chart
    const renderChart = () => {
        if (chartInstance) {
            chartInstance.destroy(); // Destroy any existing chart instance before creating a new one
        }

        // Create a new chart instance
        chartInstance = new Chart(chartRef.current, {
            type: type, // Chart type ('bar', 'line', etc.)
            data: {
                labels: data.labels, // X-axis labels
                datasets: [{
                    label: options.label, // Dataset label
                    data: data.values, // Data values to plot
                    backgroundColor: options.backgroundColor || 'rgba(75, 192, 192, 0.2)', // Background color
                    borderColor: options.borderColor || 'rgba(75, 192, 192, 1)', // Border color
                    borderWidth: 1,
                }],
            },
            options: options.chartOptions, // Additional chart options
        });
    };

    // Function to update the chart when data changes
    const updateChart = () => {
        if (chartInstance) {
            chartInstance.update(); // Update the chart when data changes
        }
    };

    // useEffect to render chart initially and on data/options change
    useEffect(() => {
        renderChart(); // Render the chart on initial mount
        return () => {
            if (chartInstance) {
                chartInstance.destroy(); // Cleanup on unmount
            }
        };
    }, [data, type, options]); // Rerender if data, type, or options change

    return <canvas ref={chartRef} />; // Return the canvas element
};

export default ChartComponent;
 
