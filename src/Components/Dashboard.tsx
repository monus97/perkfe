import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; // Import necessary Chart.js components
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type OrderCounts = {
    openOrderCount: number;
    completedOrderCount: number;
    cancelledOrderCount: number;
};

const Dashboard = () => {
    const [customerCount, setCustomerCount] = useState(0);
    const [openOrderCount, setOpenOrderCount] = useState(0);
    const [totalOrderCount, setTotalOrderCount] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [selectedOption, setSelectedOption] = useState('today');
    const [customeDate, setCustomeDate] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [graphData, setGraphData] = useState<{ date: string; openOrderCount: number; completedOrderCount: number; cancelledOrderCount: number }[]>([]);
    const [firstDate, setFirstDate] = useState<Date | null>(null);
    const [lastDate, setLastDate] = useState<Date | null>(null);

    useEffect(() => {
        getDashboard()
    }, [selectedOption, startDate, endDate])
    var data: any = {};
    if (selectedOption == 'today' || selectedOption == 'thisWeek' || selectedOption == 'lastSevenDays' || selectedOption == 'lastWeek') {
        data = {
            labels: graphData.map(item => {
                const date = new Date(item.date);
                const dayName = date.toLocaleString('en-US', { weekday: 'long' });
                return dayName;
            }),
            datasets: [
                {
                    label: 'Open Orders',
                    data: graphData.map(item => item.openOrderCount),
                    backgroundColor: '#0072F4',
                },
                {
                    label: 'Completed Orders',
                    data: graphData.map(item => item.completedOrderCount),
                    backgroundColor: '#49AAEB',
                },
                {
                    label: 'Cancelled Orders',
                    data: graphData.map(item => item.cancelledOrderCount),
                    backgroundColor: '#20D4C5',
                },
            ],
        };
    } else if (selectedOption == 'lastYear') {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // Current month (0 = January, 1 = February, ...)
        const currentYear = currentDate.getFullYear();

        const monthsOfLastYear = Array.from({ length: 12 }, (_, index) => {
            const date = new Date(currentYear , (currentMonth - 11 + index) % 12, 1);
            return date.toLocaleString('en-US', { year: 'numeric', month: 'long' });
        });
        const groupedData = graphData.reduce<Record<string, OrderCounts>>((acc, item) => {
            const date = new Date(item.date);
            const monthYear = date.toLocaleString('en-US', { year: 'numeric', month: 'long' }); // Get month and year

            if (!acc[monthYear]) {
                acc[monthYear] = {
                    openOrderCount: 0,
                    completedOrderCount: 0,
                    cancelledOrderCount: 0
                };
            }

            acc[monthYear].openOrderCount += item.openOrderCount;
            acc[monthYear].completedOrderCount += item.completedOrderCount;
            acc[monthYear].cancelledOrderCount += item.cancelledOrderCount;

            return acc;
        }, {});

        monthsOfLastYear.forEach(monthYear => {
            if (!groupedData[monthYear]) {
                groupedData[monthYear] = {
                    openOrderCount: 0,
                    completedOrderCount: 0,
                    cancelledOrderCount: 0
                };
            }
        });
        
        const labels = monthsOfLastYear; // Labels for months of the last year
        const openOrders = monthsOfLastYear.map(monthYear => groupedData[monthYear].openOrderCount);
        const completedOrders = monthsOfLastYear.map(monthYear => groupedData[monthYear].completedOrderCount);
        const cancelledOrders = monthsOfLastYear.map(monthYear => groupedData[monthYear].cancelledOrderCount);
        
        data = {
            labels: labels,
            datasets: [
                {
                    label: 'Open Orders',
                    data: openOrders,
                    backgroundColor: '#0072F4',
                },
                {
                    label: 'Completed Orders',
                    data: completedOrders,
                    backgroundColor: '#49AAEB',
                },
                {
                    label: 'Cancelled Orders',
                    data: cancelledOrders,
                    backgroundColor: '#20D4C5',
                },
            ],
        };
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'start' as const,
                labels: {
                    boxWidth: 20,
                    padding: 15,

                },
            },
            title: {
                display: true,
                text: '',
            },
        },
        layout: {
            padding: {
                bottom: 200,
            },
        },

    };

    const getDashboard = () => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/superAdmin/dashboard?filterData=${selectedOption}&from=${startDate}&to=${endDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                }
            )
            .then(res => {
                setCustomerCount(res?.data?.customerCount)
                setOpenOrderCount(res?.data?.openOrderCount)
                setTotalOrderCount(res?.data?.totalOrderCount)
                setRevenue(res?.data?.totalOrderAmount)
                setGraphData(res?.data?.graphData)
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response);
                }
            });
    }

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

        setFirstDate(startDate);
        setLastDate(endDate);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };


    return (
        <div className="container mt-3">
            <div className=" greeting-row">
                <h1 className="greeting">Hi, {user.firstName}{' '}{user.lastName}</h1>
                <div className={customeDate ? 'input-group' : 'input-group-customeDate'}>
                    {customeDate && (
                        <>
                            <div>
                                <label htmlFor="startDate" className="form-label" style={{ marginRight: '10px' }}>Start Date</label>
                                <input
                                    id='startDate'
                                    type="date"
                                    className="form-control"
                                    style={{ marginRight: '10px' }}
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="form-label" style={{ marginRight: '10px' }}>End Date</label>
                                <input
                                    id='endDate'
                                    type="date"
                                    className="form-control"
                                    style={{ marginRight: '10px' }}
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>


                        </>
                    )}
                    <div className='selectField'>
                        <label htmlFor="dateRange" className="form-label" style={{ marginRight: '10px' }}>&nbsp;</label>
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
                </div>

            </div>
            <p className="welcome-text">
                Welcome to Your All-in-One E-Commerce Powerhouse: Empower Your Business with Omni-Channel Success
            </p>
            <div className="row">
                <div className="col-md-3">
                    <div className="card ">
                        <div className="card-body">
                            <div className='d-flex justify-content-between align-items-center'>
                                <h5 className="card-title">Open Orders</h5>
                                <svg width="95" height="98" viewBox="0 0 95 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_826_14811)">
                                        <path d="M33.8066 33.5264L34.2621 33.6782C36.5316 34.4347 37.6664 34.813 38.3155 35.7135C38.9645 36.614 38.9645 37.8102 38.9645 40.2025V44.7018C38.9645 49.5647 38.9645 51.9962 40.4752 53.5069C41.986 55.0176 44.4174 55.0176 49.2803 55.0176H63.0347" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                                        <path d="M43.2625 59.3157C44.6869 59.3157 45.8415 60.4704 45.8415 61.8947C45.8415 63.319 44.6869 64.4736 43.2625 64.4736C41.8382 64.4736 40.6836 63.319 40.6836 61.8947C40.6836 60.4704 41.8382 59.3157 43.2625 59.3157Z" stroke="#0039F4" stroke-width="2" />
                                        <path d="M58.7371 59.3159C60.1615 59.3159 61.3161 60.4705 61.3161 61.8948C61.3161 63.3191 60.1615 64.4738 58.7371 64.4738C57.3128 64.4738 56.1582 63.3191 56.1582 61.8948C56.1582 60.4705 57.3128 59.3159 58.7371 59.3159Z" stroke="#0039F4" stroke-width="2" />
                                        <path d="M49.2809 43.8418H44.123" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                                        <path d="M38.9648 38.6846H58.6515C62.1846 38.6846 63.9511 38.6846 64.7156 39.8438C65.48 41.0031 64.7841 42.6268 63.3923 45.8743L62.6555 47.5936C62.0057 49.1097 61.6808 49.8678 61.0349 50.2937C60.3889 50.7197 59.5641 50.7197 57.9146 50.7197H38.9648" stroke="#0039F4" stroke-width="2" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_826_14811" x="-9" y="-11" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset />
                                            <feGaussianBlur stdDeviation="16" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.00500005 0 0 0 0 0.00317276 0 0 0 0 0.000258336 0 0 0 0.03 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_826_14811" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_826_14811" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                            <h6 className="card-text">{openOrderCount}</h6>
                            <h6 className="text-success">+ 10% from last 7 days</h6>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card ">
                        <div className="card-body">
                            <div className='d-flex justify-content-between align-items-center'>
                                <h5 className="card-title">Total Orders</h5>
                                <svg width="94" height="101" viewBox="0 0 94 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_826_14822)">
                                        <path d="M64.5351 51.3586L65.425 48.0371L65.425 48.0371C66.4639 44.16 66.9834 42.2214 66.5922 40.5438C66.2833 39.2191 65.5886 38.0158 64.5958 37.086C63.3385 35.9084 61.4 35.389 57.5228 34.3501C53.6457 33.3112 51.7071 32.7918 50.0294 33.1829C48.7048 33.4918 47.5015 34.1865 46.5717 35.1793C45.5634 36.2558 45.0377 37.8316 44.2553 40.6961C44.1238 41.1772 43.9852 41.6947 43.8358 42.2522L43.8358 42.2523L42.9458 45.5737C41.9069 49.4509 41.3875 51.3895 41.7786 53.0671C42.0875 54.3918 42.7822 55.5951 43.775 56.5249C45.0323 57.7025 46.9708 58.2219 50.848 59.2608L50.848 59.2608C54.3426 60.1972 56.2624 60.7116 57.8356 60.5175C58.0078 60.4963 58.1759 60.4665 58.3414 60.428C59.666 60.1191 60.8693 59.4244 61.7992 58.4316C62.9767 57.1743 63.4962 55.2357 64.5351 51.3586L64.5351 51.3586Z" stroke="#0039F4" stroke-width="2" />
                                        <path d="M57.8364 60.5168C57.4779 61.6145 56.8476 62.6076 56.0001 63.4013C54.7428 64.5789 52.8043 65.0984 48.9271 66.1372C45.05 67.1761 43.1114 67.6956 41.4337 67.3044C40.1091 66.9955 38.9058 66.3008 37.976 65.308C36.7984 64.0507 36.2789 62.1122 35.2401 58.235L34.3501 54.9136C33.3112 51.0364 32.7918 49.0978 33.1829 47.4202C33.4918 46.0955 34.1865 44.8922 35.1793 43.9624C36.4366 42.7848 38.3752 42.2654 42.2523 41.2265C42.9858 41.03 43.6499 40.852 44.256 40.6953" stroke="#0039F4" stroke-width="2" />
                                        <path d="M49.8633 46.8076L58.1668 49.0326" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                                        <path d="M48.5254 51.7893L53.5075 53.1243" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_826_14822" x="-10" y="-10" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset />
                                            <feGaussianBlur stdDeviation="16" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.00500005 0 0 0 0 0.00317276 0 0 0 0 0.000258336 0 0 0 0.03 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_826_14822" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_826_14822" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>

                            </div>
                            <h6 className="card-text">{totalOrderCount}</h6>
                            <h6 className="text-success">+ 10% from last 7 days</h6>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card ">
                        <div className="card-body">
                            <div className='d-flex justify-content-between align-items-center'>
                                <h5 className="card-title">Customers</h5>
                                <svg width="97" height="100" viewBox="0 0 97 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_826_14842)">
                                        <circle cx="52.7541" cy="40.6663" r="6.87719" stroke="#0039F4" stroke-width="2" />
                                        <path d="M63.0703 45.8248C65.9189 45.8248 68.2282 43.9004 68.2282 41.5265C68.2282 39.1527 65.9189 37.2283 63.0703 37.2283" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                                        <path d="M42.4375 45.8248C39.5889 45.8248 37.2796 43.9004 37.2796 41.5265C37.2796 39.1527 39.5889 37.2283 42.4375 37.2283" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                                        <ellipse cx="52.7533" cy="59.5791" rx="10.3158" ry="6.87719" stroke="#0039F4" stroke-width="2" />
                                        <path d="M66.5078 63.0176C69.5239 62.3562 71.6657 60.6812 71.6657 58.7194C71.6657 56.7576 69.5239 55.0825 66.5078 54.4211" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                                        <path d="M39 63.0176C35.9839 62.3562 33.8421 60.6812 33.8421 58.7194C33.8421 56.7576 35.9839 55.0825 39 54.4211" stroke="#0039F4" stroke-width="2" stroke-linecap="round" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_826_14842" x="-7" y="-10" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset />
                                            <feGaussianBlur stdDeviation="16" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.00500005 0 0 0 0 0.00317276 0 0 0 0 0.000258336 0 0 0 0.03 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_826_14842" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_826_14842" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>

                            </div>
                            <h6 className="card-text">{customerCount}</h6>
                            <h6 className="text-success">+ 10% from last 7 days</h6>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card ">
                        <div className="card-body">
                            <div className='d-flex justify-content-between align-items-center'>
                                <h5 className="card-title">Revenue</h5>
                                <svg width="96" height="98" viewBox="0 0 96 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g filter="url(#filter0_d_826_14858)">
                                        <path d="M64.4527 65.2925C62.1936 65.2925 60.352 63.4754 60.352 61.235V36.1103C60.352 33.875 62.1884 32.0527 64.4527 32.0527H66.5708C68.8299 32.0527 70.6715 33.8698 70.6715 36.1103V61.235C70.6715 63.4702 68.8351 65.2925 66.5708 65.2925H64.4527ZM64.4527 33.8853C63.211 33.8853 62.2041 34.8817 62.2041 36.1103V61.235C62.2041 62.4636 63.2162 63.4599 64.4527 63.4599H66.5708C67.8125 63.4599 68.8194 62.4636 68.8194 61.235V36.1103C68.8194 34.8817 67.8073 33.8853 66.5708 33.8853H64.4527ZM50.695 65.2925C48.4359 65.2925 46.5943 63.4754 46.5943 61.235V46.5793C46.5943 44.3441 48.4307 42.5218 50.695 42.5218H52.8131C55.0722 42.5218 56.9138 44.3389 56.9138 46.5793V61.235C56.9138 63.4702 55.0774 65.2925 52.8131 65.2925H50.695ZM50.695 44.3544C49.4533 44.3544 48.4464 45.3507 48.4464 46.5793V61.235C48.4464 62.4636 49.4585 63.4599 50.695 63.4599H52.8131C54.0548 63.4599 55.0617 62.4636 55.0617 61.235V46.5793C55.0617 45.3507 54.0496 44.3544 52.8131 44.3544H50.695ZM36.9425 65.2925C34.6835 65.2925 32.8418 63.4754 32.8418 61.235V57.0484C32.8418 54.8131 34.6782 52.9909 36.9425 52.9909H39.0607C41.3197 52.9909 43.1614 54.808 43.1614 57.0484V61.235C43.1614 63.4702 41.3249 65.2925 39.0607 65.2925H36.9425ZM36.9425 54.8235C35.7008 54.8235 34.6939 55.8198 34.6939 57.0484V61.235C34.6939 62.4636 35.706 63.4599 36.9425 63.4599H39.0607C40.3024 63.4599 41.3093 62.4636 41.3093 61.235V57.0484C41.3093 55.8198 40.2971 54.8235 39.0607 54.8235H36.9425Z" fill="#0039F4" />
                                        <path d="M64.4527 65.2925C62.1936 65.2925 60.352 63.4754 60.352 61.235V36.1103C60.352 33.875 62.1884 32.0527 64.4527 32.0527H66.5708C68.8299 32.0527 70.6715 33.8698 70.6715 36.1103V61.235C70.6715 63.4702 68.8351 65.2925 66.5708 65.2925H64.4527ZM64.4527 33.8853C63.211 33.8853 62.2041 34.8817 62.2041 36.1103V61.235C62.2041 62.4636 63.2162 63.4599 64.4527 63.4599H66.5708C67.8125 63.4599 68.8194 62.4636 68.8194 61.235V36.1103C68.8194 34.8817 67.8073 33.8853 66.5708 33.8853H64.4527ZM50.695 65.2925C48.4359 65.2925 46.5943 63.4754 46.5943 61.235V46.5793C46.5943 44.3441 48.4307 42.5218 50.695 42.5218H52.8131C55.0722 42.5218 56.9138 44.3389 56.9138 46.5793V61.235C56.9138 63.4702 55.0774 65.2925 52.8131 65.2925H50.695ZM50.695 44.3544C49.4533 44.3544 48.4464 45.3507 48.4464 46.5793V61.235C48.4464 62.4636 49.4585 63.4599 50.695 63.4599H52.8131C54.0548 63.4599 55.0617 62.4636 55.0617 61.235V46.5793C55.0617 45.3507 54.0496 44.3544 52.8131 44.3544H50.695ZM36.9425 65.2925C34.6835 65.2925 32.8418 63.4754 32.8418 61.235V57.0484C32.8418 54.8131 34.6782 52.9909 36.9425 52.9909H39.0607C41.3197 52.9909 43.1614 54.808 43.1614 57.0484V61.235C43.1614 63.4702 41.3249 65.2925 39.0607 65.2925H36.9425ZM36.9425 54.8235C35.7008 54.8235 34.6939 55.8198 34.6939 57.0484V61.235C34.6939 62.4636 35.706 63.4599 36.9425 63.4599H39.0607C40.3024 63.4599 41.3093 62.4636 41.3093 61.235V57.0484C41.3093 55.8198 40.2971 54.8235 39.0607 54.8235H36.9425Z" stroke="#0039F4" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_d_826_14858" x="-8" y="-11" width="120" height="120" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                            <feOffset />
                                            <feGaussianBlur stdDeviation="16" />
                                            <feComposite in2="hardAlpha" operator="out" />
                                            <feColorMatrix type="matrix" values="0 0 0 0 0.00500005 0 0 0 0 0.00317276 0 0 0 0 0.000258336 0 0 0 0.03 0" />
                                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_826_14858" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_826_14858" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                            </div>
                            <h6 className="card-text">₹ {revenue}</h6>
                            <h6 className="text-success">+ 10% from last 7 days</h6>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-5 left-align">
                <h3>Orders</h3>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default Dashboard;