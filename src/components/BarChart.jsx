import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = props => {
    // function data(canvas){
    //     const ctx = canvas.getContext("2d")
    //     const gradient = ctx.createLinearGradient(0,0,100,0);
    //     return {
    //       backgroundColor: gradient
    //     }
    //   }
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };
    return (
        <React.Fragment>
           <div>
        <h2>Bar Example (custom size)</h2>
        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
        </React.Fragment>
    )
}

export default BarChart;
