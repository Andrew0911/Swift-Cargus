import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useEffect } from "react";
import axiosClient from "../axios";
 
const colors = ["#135a76", "orange", "green"];
 
const marks = [
  {
    value: 1,
    label: "Processed",
  },
  {
    value: 2,
    label: "Not delivered",
  },
  {
    value: 3,
    label: "All Statuses",
  },
];
 
function valuetext(value) {
  return `${value}`;
}
 
export default function DashboardChart() {
  const [itemNb, setItemNb] = React.useState(3);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllStatuses = async () => {
        try {
            const { data: allStatuses } = await axiosClient.get('/awb/get-each-status-awb-count');
            const statuses = Object.entries(allStatuses).map(([key, value], index) => ({
                id: index,
                value: value,
                label: key,
                color: colors[index]
            }));
            setData(statuses);
        } catch (error) {
            console.error('Error fetching all statuses:', error);
        }
    };
    fetchAllStatuses();
  }, []);
 
  const handleNumberOfStatusesChange = (event, newValue) => {
    setItemNb(newValue);
  };
 
  return (
    <>
        {data.length > 0 && <Box sx={{ width: "100%" }}>
        <PieChart
            height={600}
            series={[
            {
                data: data.slice(0, itemNb),
                innerRadius: 80,
                outerRadius: 230,
                paddingAngle: 3,
                cornerRadius: 10,
                startAngle: 45,
                cx: 380,
                cy: 320,
                endAngle: 404,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 60, additionalRadius: -20, color: "gray" },
            },
            ]}
            slotProps={{ legend: { hidden: true } }}
        />
    
        <Slider
            value={itemNb}
            getAriaValueText={valuetext}
            onChange={handleNumberOfStatusesChange}
            marks={marks}
            step={null}
            min={1}
            max={3}
            defaultValue={3}
            sx={{
            color: "#135a76",
            width: 500,
            marginLeft: 18,
            marginTop: 5,
            "& .MuiSlider-markLabel": {
                color: "#135a76",
                fontSize: "18px",
                fontFamily: "Quicksand, sans-serif",
            },
            }}
        />
        </Box>
        }
    </>
  );
}