import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import Pagination from '../Pagination/Pagination';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Div = styled.div`
 .box{
    display:flex;
    padding:20px;
    margin:10px;
    border-radius:10px;
    justify-content:space-between;
    background-color:#ffff;
    align-items:center;
  }
    .box-item{
        display:flex;
        align-items:center;
        gap:10px;
    }
         .statusHead {
        display:flex;
        align-items:center;
    }
        .statusItem {
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
        padding: 1rem 2rem;
        display:flex;
        align-items:center;
    }
    .selecteds {
        background-color:white;
        border-bottom: 3px solid #0039F4;
    }
    .statusItem p{
        margin-bottom:0;
    }
    .card {
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        background-color: #ffff;
    }
    .detailsData strong{
        color:#B5B5B5;
        font-size:14px;
        font-weight:400;
    }
    .detailsData{
        font-size:16px;
        font-weight:400;
    }
    .card-title{
        font-size:19px;
        font-weight:500;
    }
    .org{
        display: flex;
        background-color: #F3F4F6;
        border-radius:10px;
        padding:10px;
        align-items:center;
    }
    .org img{
        margin: 0 10px;
    }
    .orderData{
        display:flex;
        flex-direction:row;
        justify-content:space-between;
        cursor:pointer;
    }
    .selectField {
    display: flex;
    flex-direction: column; 
  }
    .select-dropdown {
    appearance: auto;  /* Use default styling (including the default arrow) */
    -webkit-appearance: auto;
    -moz-appearance: auto;
    padding-right: 30px;  /* Space to display the default arrow */
    width: 100%;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: white;
    color: #333;
    cursor: pointer;
  }
      .input-group {
    width:40%;
    display: flex;
  }
  .input-group-customeDate {
    width: auto;
    display: flex;
  }
    .custom-input {
        width:80%
    }
`
const Colortext = styled.th`
    color :#575E78 !important;
    padding:10px !important; 

`

const Ordertext = styled.th`
    padding:20px !important; 

     .customerId{
        cursor:pointer;
    }
    
     .productInfo {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .productInfo img {
        margin-right: 10px; /* Adds space between image and text */
        width: 51px;
        height: 51px;
    }

    .productText {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }

    .productText .name {
        font-weight: bold;
    }

    .description {
        color: #B2B2B2;
        font-size: 14px;
        font-weight: 400;
    }

    .name{
        font-size: 16px;
        font-weight: 500; 
    }
`

const Linktext = styled.th`
    color :#575E78 !important;
    padding:20px !important; 

   
`
const Link = styled.div`
    background-color:white;
    border-radius:10px;
    .statusHead {
        display:flex;
        align-items:center;
    }
    .statusItem {
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
        padding: 1rem 2rem;
        display:flex;
        align-items:center;
    }
    .selecteds {
        background-color:white;
        border-bottom: 3px solid #0039F4;
    }
    .statusItem p{
        margin-bottom:0;
    }
    .containr{
        border-radius:10px;
        background-color:white
    }

    .table-light{
        font-size: 14px;
        font-weight: 600;
        background-color:#E8E8F3 !important;
        color :#575E78 !important;
    }
    .tableBody{
        font-size: 14px !important;
        font-weight: 400 !important;
    }
    .search-sort-filter{
        display:flex;
        align-items:center;
        gap:10px;
    }
    .search-field{
        border-radius:10px;
        background-color:#F2F2F8;
    }
    .buttons{
        display:flex;
        gap:10px;
        align-items:center;
    }
    .buttn{
        display:flex;
        gap:10px;
        align-items:center;
        border:1px solid #EDECEC;
    }
    .attribute{
        font-size: 14px !important;
        font-weight: 400 !important;
    }

`;


const Attribute = styled.th`
    color :#575E78 !important;
    border-top:0 !important;
    padding:0 !important;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const Subtitle = styled.span`
  font-size: 14px;
  font-weight: 400;
`;



function CustomerDetails() {
    const [customer, setCustomer] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [orderList, setOrderList] = useState<any[]>([]);
    const [transactionList, setTransactionList] = useState<any[]>([]);
    const [trends, setTrends] = useState<any[]>([]);
    const { id } = useParams();
    const tabs = ['Summary', 'Orders', 'Transactions']
    const [selected, setSelected] = useState('Summary')
    const [selectedOption, setSelectedOption] = useState('today');
    const [customeDate, setCustomeDate] = useState(false);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [transactionPage, setTransactionPage] = useState(1);
    const [transactionPageSize, setTransactionPageSize] = useState(10);
    const [totalTransactionPages, setTotalTransactionPages] = useState(1);

    const [sortOrder, setSortOrder] = useState<string>('asc');

    const [filterCount, setFilterCount] = useState<number>(0);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSortToggle = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const handleFilterToggle = () => {
        setFilterCount((prev) => (prev === 0 ? 1 : 0));
    };


    const tabChange = (tab: string) => {
        setSelected(tab)

    }
    useEffect(() => {
        if (id) {
            if (selected == 'Summary') {
                getTrends();
            }
        }
    }, [selectedOption]);

    useEffect(() => {
        // Get customer details only when the id changes
        if (id) {
            if (selected == 'Summary') {
                getDetails();
            } else if (selected == 'Orders') {
                getCustomerOrders();
            } else if (selected == 'Transactions') {
                getCustomerTransactions();
            }
        }
    }, [id, selected]);
    useEffect(() => {
        getCustomerOrders();
    }, [page, searchTerm])
    const getTrends = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/user/order/trends?employeeId=${id}&filterData=${selectedOption}&from=${startDate}&to=${endDate}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                if (res?.data) {
                    const transformedData = Object.keys(res.data.result).map(date => ({
                        date: date,
                        count: res.data.result[date]
                    }));

                    console.log(transformedData);
                    setTrends(transformedData)
                } else {
                    setError('No trends found');
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response);
                    setError('Error fetching order trens');
                }
            });
    }
    const getCustomerOrders = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/superAdmin/order/list?userId=${id}&page=${page}&pageSize=${pageSize}&key=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                if (res?.data) {
                    console.log(res);
                    setOrderList(res.data.orders);
                    const total = Math.ceil(res.data.totalCount / pageSize);
                    setTotalPages(total);
                } else {
                    setError('No orders found');
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response);
                    setError('Error fetching order details');
                }
            });
    }
    const getCustomerTransactions = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/superAdmin/transactions/list?userId=${id}&page=${page}&pageSize=${pageSize}&key=${searchTerm}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                if (res?.data) {
                    console.log(res);
                    setTransactionList([]);
                    // const total = Math.ceil(res.data.totalCount / pageSize);
                    // setTotalPages(total);
                } else {
                    setError('No orders found');
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response);
                    setError('Error fetching order details');
                }
            });
    }
    const getDetails = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/admin/customer/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                if (res?.data) {
                    console.log(res);
                    setCustomer(res.data);
                } else {
                    setError('No customer data found');
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error response:', error.response);
                    setError('Error fetching customer details');
                }
            });
    };

    // Show loading or error message based on the state
    if (error) {
        return <div>{error}</div>;
    }

    if (!customer) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: ['Completed Orders', 'Cancelled Orders', 'Pending Orders'], // Labels dynamically set
        datasets: [
            {
                data: [
                    customer?.orderCountData?.completedCount, // Completed count
                    customer?.orderCountData?.cancelledCount, // Cancelled count
                    customer?.orderCountData?.pendingCount,   // Pending count
                ],
                backgroundColor: ['#FF5733', '#33A1FF', '#FFEB33'], // Colors for each segment
                hoverBackgroundColor: ['#FF5733', '#33A1FF', '#FFEB33'], // Hover colors
            },
        ],
    };
    // Function to calculate the percentage for each segment
    const calculatePercentage = (value: number, total: number) => {
        return ((value / total) * 100).toFixed(2); // Calculate percentage and return it as a string with two decimal places
    };

    // Total sum of data for percentage calculation
    const totalData = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
    // Options for customizing the chart, including the legend position
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,  // Ensuring that the position is explicitly set 
                align: 'center' as const,     // Align the legend items in the center
                labels: {
                    boxWidth: 20,  // Width of the legend box
                    padding: 30,   // Padding between legend items
                    generateLabels: (chart: any) => {
                        // Custom legend labels with percentages
                        return chart.data.labels.map((label: string, index: number) => {
                            const value = chart.data.datasets[0].data[index];
                            const percentage = calculatePercentage(value, totalData);
                            return {
                                text: `${label} - ${percentage}%`, // Modify the legend text to include percentage
                                fillStyle: chart.data.datasets[0].backgroundColor[index], // Color for the legend box
                            };
                        });
                    },
                },
            },
            tooltip: {
                enabled: true,  // Enable or disable tooltips on hover
            },
        },
        layout: {
            padding: {
                bottom: 0,  // Padding for the chart layout
                left: 50,  // Padding for the chart layout
                right: 50,  // Padding for the chart layout
                top: 0,  // Padding for the chart layout
            },
            margin: {
                bottom: 0,  // Padding for the chart layout
                left: 0,  // Padding for the chart layout
                right: 0,  // Padding for the chart layout
                top: 0,  // Padding for the chart layout
            },
        },
    };

    const data2 = {
        labels: trends.map(item => {
            const date = new Date(item.date);
            const dayName = date.toLocaleString('en-US', { weekday: 'long' });
            return dayName;
        }),
        datasets: [
            {
                label: 'Orders',
                data: trends.map(item => item.count),
                backgroundColor: '#0072F4', // Color of the bar
                borderColor: '#005BB5', // Border color for the bar
                borderWidth: 1, // Border width
            },
        ],
    };

    // Options to customize the Bar Chart
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,  // Enable tooltips when hovering over the bar
            },
        },
        layout: {
            padding: {
                bottom: 0,  // Padding for the chart layout
                left: 0,  // Padding for the chart layout
                right: 0,  // Padding for the chart layout
                top: 0,  // Padding for the chart layout
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Ensures the y-axis starts at 0
            },
        },
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.value === 'customDate') {
            setCustomeDate(true);
        } else {
            setCustomeDate(false)
        }
        const value = e.target.value;
        setSelectedOption(value);

        let startDate: Date | null = null;
        let endDate: Date | null = new Date();

        if (value === 'today') {
            startDate = new Date();
            endDate = new Date();
        } else if (value === 'thisWeek') {
            const currentDay = new Date();
            const dayOfWeek = currentDay.getDay();
            currentDay.setDate(currentDay.getDate() - dayOfWeek);
            startDate = currentDay;
            endDate = new Date();
        } else if (value === 'lastSevenDays') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            endDate = new Date();
        } else if (value === 'lastWeek') {
            const currentDay = new Date();
            const dayOfWeek = currentDay.getDay();
            const diffToLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek;
            currentDay.setDate(currentDay.getDate() - diffToLastSunday);
            startDate = currentDay;

            const lastSaturday = new Date(currentDay);
            lastSaturday.setDate(currentDay.getDate() + 6);
            endDate = lastSaturday;
        } else if (value === 'lastThirtyDays') {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            endDate = new Date();
        } else if (value === 'lastMonth') {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            startDate = new Date(currentYear, currentMonth - 1, 1);
            endDate = new Date(currentYear, currentMonth, 0);
        } else if (value === 'lastYear') {
            const currentYear = new Date().getFullYear();
            startDate = new Date(currentYear - 1, 0, 1);
            endDate = new Date(currentYear - 1, 11, 31);
        } else if (value === 'customDate') {
            setCustomeDate(true);
            return;
        }

        // setFirstDate(startDate);
        // setLastDate(endDate);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    function formatDate(date: any) {
        const d = new Date(date);  // Convert the date string to a Date object
        const day = String(d.getDate()).padStart(2, '0');  // Get day and pad with leading zero if needed
        const month = String(d.getMonth() + 1).padStart(2, '0');  // Get month (add 1 since months are 0-based)
        const year = d.getFullYear();  // Get the full year

        return `${day}-${month}-${year}`;  // Return in dd-mm-yyyy format
    }
    function formatTime(date: any): string {
        const d = new Date(date);  // Convert the date string to a Date object
    
        let hours = d.getHours();   // Get the hours (0-23)
        const minutes = String(d.getMinutes()).padStart(2, '0');  // Get minutes and pad with leading zero if needed
        const ampm = hours >= 12 ? 'PM' : 'AM';  // Determine AM or PM
    
        hours = hours % 12;  // Convert to 12-hour format
        hours = hours ? hours : 12;  // If hours is 0, set it to 12 (midnight case)
    
        return `${hours}:${minutes} ${ampm}`;  // Return in hh:mm AM/PM format
    }
    

    return (
        <Div>
            <div className="breadcrumb">
                <span>
                    Dashboard
                    <span className="p-3">{'>'}</span>
                </span>
                <span>
                    Customers
                    <span className="seperator p-3">{'>'}</span>
                </span>
                <span>{customer?.employee?.name}</span>
            </div>
            <div className="mt-4">
                <div className="row rounded p-3">
                    <div className="col box">
                        <div className='box-item'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.66602 4L3.01923 4.11774C4.77928 4.70442 5.65931 4.99776 6.16266 5.69613C6.66602 6.3945 6.66602 7.32213 6.66602 9.17738V12.6667C6.66602 16.4379 6.66602 18.3235 7.83759 19.4951C9.00916 20.6667 10.8948 20.6667 14.666 20.6667H25.3327" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                                <path d="M10 24C11.1046 24 12 24.8954 12 26C12 27.1046 11.1046 28 10 28C8.89543 28 8 27.1046 8 26C8 24.8954 8.89543 24 10 24Z" stroke="#0039F4" stroke-width="1.5" />
                                <path d="M22 24.0001C23.1046 24.0001 24 24.8955 24 26.0001C24 27.1047 23.1046 28.0001 22 28.0001C20.8954 28.0001 20 27.1047 20 26.0001C20 24.8955 20.8954 24.0001 22 24.0001Z" stroke="#0039F4" stroke-width="1.5" />
                                <path d="M14.666 12H10.666" stroke="#0039F4" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M6.66602 8H21.9332C24.6732 8 26.0431 8 26.636 8.89902C27.2288 9.79804 26.6891 11.0572 25.6098 13.5757L25.0383 14.909C24.5344 16.0848 24.2825 16.6727 23.7815 17.003C23.2806 17.3333 22.641 17.3333 21.3618 17.3333H6.66602" stroke="#0039F4" stroke-width="2" />
                            </svg>
                            <div className='p-0'>Total Orders</div>
                        </div>
                        <strong>{customer?.orderCountData?.totalCount}</strong>
                    </div>
                    <div className="col box">
                        <div className='box-item'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.7696 4.50962L23.4363 5.90902C26.3052 7.41454 27.7396 8.1673 28.5362 9.51998C29.3327 10.8727 29.3327 12.5559 29.3327 15.9223V16.0783C29.3327 19.4448 29.3327 21.128 28.5362 22.4807C27.7396 23.8333 26.3052 24.5861 23.4363 26.0916L20.7696 27.491C18.4288 28.7194 17.2584 29.3337 15.9993 29.3337C14.7403 29.3337 13.5699 28.7195 11.2291 27.491L8.56241 26.0916C5.69352 24.5861 4.25907 23.8333 3.46254 22.4807C2.66602 21.128 2.66602 19.4448 2.66602 16.0783V15.9223C2.66602 12.5559 2.66602 10.8727 3.46254 9.51998C4.25907 8.1673 5.69352 7.41454 8.56241 5.90902L11.2291 4.50961C13.5699 3.2812 14.7403 2.66699 15.9993 2.66699C17.2584 2.66699 18.4288 3.2812 20.7696 4.50962Z" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                                <path d="M28 10L16 16M16 16L4 10M16 16V28.6667" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                            </svg>
                            <div>Total Items</div>
                        </div>
                        <strong>{customer?.orderCountData?.totalItemsCount}</strong>
                    </div>
                    <div className="col box">
                        <div className='box-item'>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_826_10484)">
                                    <path d="M15 30C6.725 30 0 23.275 0 15C0 6.725 6.725 0 15 0C23.275 0 30 6.725 30 15C30 23.275 23.275 30 15 30ZM15 1.25C7.4125 1.25 1.25 7.4125 1.25 15C1.25 22.5875 7.4125 28.75 15 28.75C22.5875 28.75 28.75 22.5875 28.75 15C28.75 7.4125 22.5875 1.25 15 1.25ZM10.925 21.25C10.6625 21.25 10.4 21.1625 10.175 21C9.75 20.6875 9.575 20.125 9.7375 19.625L10.9125 15.8625L7.95 13.45C7.5375 13.1 7.4 12.55 7.575 12.0625C7.75 11.575 8.225 11.25 8.75 11.25H12.5L13.825 7.6875C14 7.2125 14.4625 6.9125 15 6.9125C15.5375 6.9125 16 7.2125 16.175 7.6875L17.5 11.25H21.25C21.775 11.25 22.25 11.575 22.425 12.075C22.6 12.5625 22.4625 13.125 22.0625 13.45L19.1 15.8625L20.325 19.5875C20.4875 20.0875 20.325 20.65 19.9 20.9625C19.475 21.2875 18.9 21.3125 18.4625 21.025L15.025 18.7875L11.6375 21.05C11.425 21.1875 11.175 21.2625 10.9375 21.2625L10.925 21.25ZM8.75 12.4875L12.025 15.15C12.225 15.3125 12.3 15.575 12.225 15.825L10.925 20L14.65 17.5125C14.8625 17.375 15.125 17.375 15.3375 17.5125L19.125 19.975L17.7625 15.8375C17.675 15.5875 17.7625 15.325 17.9625 15.1625L21.2375 12.5H17.05C16.7875 12.5 16.55 12.3375 16.4625 12.0875L14.9875 8.1125L13.5125 12.0875C13.425 12.3375 13.1875 12.5 12.925 12.5H8.7375L8.75 12.4875Z" fill="#0039F4" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_826_10484">
                                        <rect width="30" height="30" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div>Total Purchases</div>
                        </div>
                        <strong>{customer?.revenue}</strong>
                    </div>
                    <div className="col box">
                        <div className='box-item'>
                            <img className='rounded-circle' src={customer?.latestOrders?.images?.[0]} alt={customer?.employee?.name} height='40px' width='40px' />
                            <div>{customer?.employee?.name}</div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='statusHead'>
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        className={`statusItem ${selected === tab ? 'selecteds' : ''}`}
                        onClick={() => tabChange(tab)}
                    >
                        <p>{tab}</p>
                    </div>
                ))}
            </div>
            {
                selected == 'Summary' && (
                    <div className=" mt-3">
                        <div className="row">
                            <div className="row d-flex">
                                <div className="col-md-6 mb-4 d-flex">
                                    <div className="card p-4 detailsData w-100">
                                        <h5 className="card-title">General Details</h5>
                                        <div className="row mt-3">
                                            <strong className='mb-1'>Organization</strong>
                                            <div className='org mb-3'>
                                                <img className='rounded-circle' src="https://s3-alpha-sig.figma.com/img/2f27/449c/9e2dcf669833e1c0f28cbae35172b1a0?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OTgWVXNd267eWIIE-MH~~QPutxEtRYvE4vz4gLdEJt6ymvKlq534jlOBqDEFUTIg8fLtHMwUueW6vcjr5RiQF~PTFKylW3xvcRVVbN~gWTRHfLPYjLUFtDjKrlWxFShqFbXBMRG34ljmEJ0Ww28yoQ9NGVoRwju5wm~aszsJ8ymakxFe3aO7YAspdIXNqh6F77Q4HJQMvCq5KT25NzA0BRgR1pXZAV9D4H-pZeBaLVMkBS-CpfFsegBir~LHNs56RKvJijCXMfqM05FrKqnhrh1pEaJNrKcn2vnAvVLPkRXcmAh8AouTER~yD8L9PJFUz4AEdcWoi67pp2Jm1y6Y7g__" alt="" height='40px' width='40px' />
                                                <div>{customer?.organizationDetails?.name}</div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p className='col-md-6'><strong>Email</strong><br />{customer?.employee?.email}</p>
                                            <p className='col-md-6'><strong>Contact</strong><br />{customer?.employee?.mobile}</p>
                                        </div>
                                        <div className="row">
                                            <p><strong>Street Address</strong><br />{customer?.employee?.street},{" "}{customer?.employee?.city},{" "}{customer?.employee?.state},{" "}{customer?.employee?.country}</p>
                                        </div>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p className='col-md-6'><strong>City</strong><br />{customer?.employee?.city}</p>
                                            <p className='col-md-6'><strong>State</strong><br />{customer?.employee?.state}</p>
                                        </div>
                                        <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <p className='col-md-6'><strong>Country</strong><br />{customer?.employee?.country}</p>
                                            <p className='col-md-6'><strong>Postal code</strong><br />{customer?.employee?.pincode}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* User Information Box */}
                                <div className="col-md-6 mb-4 d-flex">
                                    <div className="card p-4 detailsData w-100 ">
                                        <div className='orderData'>
                                            <h5 className="card-title">Latest Orders</h5>
                                            <a href='/orders/list' style={{ color: "#0039F4", textDecoration: 'none' }}>View more</a>
                                        </div>
                                        <table className="table mt-3 ">
                                            <thead >
                                                <tr className="table-light">

                                                    <Colortext>SL. NO.</Colortext>
                                                    <Colortext>PRODUCT</Colortext>
                                                    <Colortext>QUANTITY</Colortext>
                                                    <Colortext>TOTAL AMT</Colortext>
                                                </tr>
                                            </thead>
                                            <tbody className='tableBody'>
                                                {customer?.latestOrders?.map((product: any, index: number) => (
                                                    <tr style={{ alignItems: 'center' }}>
                                                        <Ordertext><span className='customerId'>{index + 1}</span></Ordertext>
                                                        <Ordertext>
                                                            <div className="productInfo">
                                                                <img src={product?.images?.[0]} />
                                                                <div className="productText">
                                                                    <div className="name">{product?.productName}</div>
                                                                    <div className="description">
                                                                        {product?.description.length > 15
                                                                            ? product?.description.slice(0, 15) + "..."
                                                                            : product?.description
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Ordertext>
                                                        <Ordertext>x{product?.quantity}</Ordertext>
                                                        <Ordertext>{product?.totalPrice}</Ordertext>

                                                    </tr>
                                                ))}
                                                {
                                                    customer?.latestOrders.length === 0 && (
                                                        <tr>
                                                            <td colSpan={4} style={{ textAlign: 'center', padding: '10px' }}>No orders placed yet</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                            <div className="row d-flex">

                                <div className="col-md-6 mb-4 d-flex">
                                    <div className="card p-4 detailsData w-100">
                                        <h5 className="card-title">Order Status</h5>
                                        <Doughnut data={data} options={options} style={{ width: '100%', height: '-webkit-fill-available' }} />

                                    </div>
                                </div>


                                <div className="col-md-6 mb-4 d-flex ">
                                    <div className="card p-4 detailsData w-100">
                                        <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                            <h5 className="card-title">Order Trends</h5>
                                            <div className={customeDate ? 'input-group' : 'input-group-customeDate'}>
                                                {customeDate && (
                                                    <div style={{ display: 'flex' }}>
                                                        <div>
                                                            {/* <label htmlFor="startDate" className="form-label" style={{ marginRight: '10px' }}>Start Date</label> */}
                                                            <input
                                                                id='startDate'
                                                                placeholder='Start Date'
                                                                type="date"
                                                                className="form-control custom-input"
                                                                value={startDate}
                                                                onChange={handleStartDateChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            {/* <label htmlFor="endDate" className="form-label" style={{ marginRight: '10px' }}>End Date</label> */}
                                                            <input
                                                                id='endDate'
                                                                type="date"
                                                                className="form-control custom-input"
                                                                value={endDate}
                                                                onChange={handleEndDateChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <select
                                                                id='dateRange'
                                                                className="form-control select-dropdown"
                                                                value={selectedOption}
                                                                onChange={handleChange}
                                                                style={{ width: 'fit-content' }}
                                                            >
                                                                <option value="today">Today</option>
                                                                <option value="thisWeek">This Week</option>
                                                                <option value="lastSevenDays">Last 7 Days</option>
                                                                <option value="lastWeek">Last Week</option>
                                                                <option value="lastThirtyDays">Last 30 Days</option>
                                                                <option value="lastMonth">Last Month</option>
                                                                <option value="lastYear">Last Year</option>
                                                                <option value="customDate">Custom Date</option>
                                                            </select>
                                                        </div>


                                                    </div>
                                                )}
                                                {!customeDate && (
                                                    <div className='selectField'>
                                                        <select
                                                            id='dateRange'
                                                            className="form-control select-dropdown"
                                                            value={selectedOption}
                                                            onChange={handleChange}
                                                            style={{ marginLeft: '10px' }}
                                                        >
                                                            <option value="today">Today</option>
                                                            <option value="thisWeek">This Week</option>
                                                            <option value="lastSevenDays">Last 7 Days</option>
                                                            <option value="lastWeek">Last Week</option>
                                                            <option value="lastThirtyDays">Last 30 Days</option>
                                                            <option value="lastMonth">Last Month</option>
                                                            <option value="lastYear">Last Year</option>
                                                            <option value="customDate">Custom Date</option>
                                                        </select>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <Bar data={data2} options={options2} style={{ width: '100%', height: '-webkit-fill-available' }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )
            }
            {
                selected == 'Orders' && (
                    <Link className="containr mt-3 p-3">
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <div>
                                <Title>Orders list</Title> <br />
                                <Subtitle>List of orders by {customer?.employee?.name}</Subtitle>
                            </div>
                            <div className="search-sort-filter">
                                <div className="search-box">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="search-field"
                                    />
                                </div>
                                <div className="buttons">
                                    <button onClick={handleSortToggle} className='btn buttn'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.334 4.375C13.5031 4.375 13.665 4.44352 13.7827 4.56491L17.116 8.00241C17.3563 8.25021 17.3502 8.64589 17.1024 8.88619C16.8546 9.12648 16.4589 9.12039 16.2186 8.87259L13.959 6.54233L13.959 15C13.959 15.3452 13.6792 15.625 13.334 15.625C12.9888 15.625 12.709 15.3452 12.709 15L12.709 6.54233L10.4493 8.87259C10.209 9.12039 9.81336 9.12648 9.56556 8.88619C9.31776 8.64589 9.31167 8.25021 9.55196 8.00241L12.8853 4.56491C13.003 4.44352 13.1649 4.375 13.334 4.375ZM6.66732 4.375C7.0125 4.375 7.29232 4.65482 7.29232 5L7.29232 13.4577L9.55196 11.1274C9.79226 10.8796 10.1879 10.8735 10.4357 11.1138C10.6835 11.3541 10.6896 11.7498 10.4493 11.9976L7.11601 15.4351C6.99829 15.5565 6.83641 15.625 6.66732 15.625C6.49822 15.625 6.33634 15.5565 6.21863 15.4351L2.8853 11.9976C2.645 11.7498 2.65109 11.3541 2.89889 11.1138C3.1467 10.8735 3.54238 10.8796 3.78267 11.1274L6.04232 13.4577L6.04232 5C6.04232 4.65482 6.32214 4.375 6.66732 4.375Z" fill="#828BB9" />
                                        </svg>

                                        {sortOrder === 'asc' ? 'Sort' : 'Sort'}
                                    </button>
                                    <button onClick={handleFilterToggle} className='btn buttn'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.959 5.8335C18.959 6.17867 18.6792 6.4585 18.334 6.4585L1.66732 6.4585C1.32214 6.4585 1.04232 6.17867 1.04232 5.8335C1.04232 5.48832 1.32214 5.2085 1.66732 5.2085L18.334 5.2085C18.6792 5.2085 18.959 5.48832 18.959 5.8335Z" fill="#828BB9" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.459 10C16.459 10.3452 16.1792 10.625 15.834 10.625L4.16732 10.625C3.82214 10.625 3.54232 10.3452 3.54232 10C3.54232 9.65482 3.82214 9.375 4.16732 9.375L15.834 9.375C16.1792 9.375 16.459 9.65482 16.459 10Z" fill="#828BB9" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.959 14.1665C13.959 14.5117 13.6792 14.7915 13.334 14.7915L6.66732 14.7915C6.32214 14.7915 6.04232 14.5117 6.04232 14.1665C6.04232 13.8213 6.32214 13.5415 6.66732 13.5415H13.334C13.6792 13.5415 13.959 13.8213 13.959 14.1665Z" fill="#828BB9" />
                                        </svg>

                                        {'   '} Filter({filterCount})
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table mt-4 ">
                            <thead >
                                <tr className="table-light">
                                    <Colortext style={{ color: 'blue' }}>ORDER ID</Colortext>
                                    <Colortext>CREATED</Colortext>
                                    <Colortext>ITEMS</Colortext>
                                    <Colortext>ORGANIZATION</Colortext>
                                    <Colortext>EMAIL</Colortext>
                                    <Colortext>CONTACT</Colortext>
                                    <Colortext>STATUS</Colortext>
                                    <Colortext>DELIVERY DATE</Colortext>

                                </tr>
                            </thead>
                            <tbody className='tableBody'>
                                {orderList.map((order, index) => (
                                    <tr key={index}>
                                        <Linktext>{order.orderId}</Linktext>
                                        <Linktext>{formatDate(order.createdAt)}</Linktext>
                                        <Linktext>{order.items.length}</Linktext>
                                        <Linktext>{order.organizationDetails.name}</Linktext>
                                        <Linktext>{customer?.employee?.email}</Linktext>
                                        <Linktext>{customer?.employee?.mobile}</Linktext>
                                        <Linktext>{order.stat}</Linktext>
                                        <Linktext>{order.createdAt}</Linktext>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage} />
                    </Link>
                )
            }
            {
                selected == 'Transactions' && (
                    <Link className="containr mt-3 p-3">
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <div>
                                <Title>Transactions</Title> <br />
                                <Subtitle>List of Transactions by {customer?.employee?.name}</Subtitle>
                            </div>
                            <div className="search-sort-filter">
                                <div className="search-box">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="search-field"
                                    />
                                </div>
                                <div className="buttons">
                                    <button onClick={handleSortToggle} className='btn buttn'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.334 4.375C13.5031 4.375 13.665 4.44352 13.7827 4.56491L17.116 8.00241C17.3563 8.25021 17.3502 8.64589 17.1024 8.88619C16.8546 9.12648 16.4589 9.12039 16.2186 8.87259L13.959 6.54233L13.959 15C13.959 15.3452 13.6792 15.625 13.334 15.625C12.9888 15.625 12.709 15.3452 12.709 15L12.709 6.54233L10.4493 8.87259C10.209 9.12039 9.81336 9.12648 9.56556 8.88619C9.31776 8.64589 9.31167 8.25021 9.55196 8.00241L12.8853 4.56491C13.003 4.44352 13.1649 4.375 13.334 4.375ZM6.66732 4.375C7.0125 4.375 7.29232 4.65482 7.29232 5L7.29232 13.4577L9.55196 11.1274C9.79226 10.8796 10.1879 10.8735 10.4357 11.1138C10.6835 11.3541 10.6896 11.7498 10.4493 11.9976L7.11601 15.4351C6.99829 15.5565 6.83641 15.625 6.66732 15.625C6.49822 15.625 6.33634 15.5565 6.21863 15.4351L2.8853 11.9976C2.645 11.7498 2.65109 11.3541 2.89889 11.1138C3.1467 10.8735 3.54238 10.8796 3.78267 11.1274L6.04232 13.4577L6.04232 5C6.04232 4.65482 6.32214 4.375 6.66732 4.375Z" fill="#828BB9" />
                                        </svg>

                                        {sortOrder === 'asc' ? 'Sort' : 'Sort'}
                                    </button>
                                    <button onClick={handleFilterToggle} className='btn buttn'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.959 5.8335C18.959 6.17867 18.6792 6.4585 18.334 6.4585L1.66732 6.4585C1.32214 6.4585 1.04232 6.17867 1.04232 5.8335C1.04232 5.48832 1.32214 5.2085 1.66732 5.2085L18.334 5.2085C18.6792 5.2085 18.959 5.48832 18.959 5.8335Z" fill="#828BB9" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.459 10C16.459 10.3452 16.1792 10.625 15.834 10.625L4.16732 10.625C3.82214 10.625 3.54232 10.3452 3.54232 10C3.54232 9.65482 3.82214 9.375 4.16732 9.375L15.834 9.375C16.1792 9.375 16.459 9.65482 16.459 10Z" fill="#828BB9" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.959 14.1665C13.959 14.5117 13.6792 14.7915 13.334 14.7915L6.66732 14.7915C6.32214 14.7915 6.04232 14.5117 6.04232 14.1665C6.04232 13.8213 6.32214 13.5415 6.66732 13.5415H13.334C13.6792 13.5415 13.959 13.8213 13.959 14.1665Z" fill="#828BB9" />
                                        </svg>

                                        {'   '} Filter({filterCount})
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table className="table mt-4 ">
                            <thead >
                                <tr className="table-light">
                                    <Colortext style={{ color: 'blue' }}>ID</Colortext>
                                    <Colortext>TRANSACTION ID</Colortext>
                                    <Colortext>ORDER ID</Colortext>
                                    <Colortext>DATE</Colortext>
                                    <Colortext>TIME</Colortext>
                                    <Colortext>AMOUNT</Colortext>
                                    <Colortext>STATUS</Colortext>

                                </tr>
                            </thead>
                            <tbody className='tableBody'>
                                {transactionList.map((transaction, index) => (
                                    <tr key={index}>
                                        <Linktext>{transaction.unqId}</Linktext>
                                        <Linktext>{transaction.transactionId}</Linktext>
                                        <Linktext>{transaction.orderId}</Linktext>
                                        <Linktext>{formatDate(transaction.createdAt)}</Linktext>
                                        <Linktext>{formatTime(transaction.createdAt)}</Linktext>
                                        <Linktext>{transaction.points}</Linktext>
                                        <Linktext>{transaction.status}</Linktext>

                                    </tr>
                                ))}
                                {transactionList.length === 0 && (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: 'center', padding: '10px' }}>No transactions found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination currentPage={transactionPage}
                            totalPages={totalTransactionPages}
                            onPageChange={setTransactionPage} />
                    </Link>
                )
            }
        </Div>
    );
}

export default CustomerDetails;
