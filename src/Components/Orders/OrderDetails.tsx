import React, { useEffect, useState } from 'react'; // Import useState hook
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

type Address = {
    city: string;
    state: string;
    country: string;
    postalCode: string;
    contact: string;
    name: string;
    houseNo: string;
    area: string;
    gstNo: string;
    mobile: number;
    pincode: number;
};

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
    .form-select{
        width:auto;
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
    .customerName{
        font-size:16px;
        font-weight:500;
    }
    .customerPlace{
        font-size:12px;
        font-weight:400;
        color:#7A7A7A;
    }

`;
const StepperContainer = styled.div`
display: flex;
flex-direction: column;
margin: 20px 0;
`;

const Step = styled.div<{ active: boolean }>`
display: flex;
align-items: center;
margin: 10px 0;
position: relative;

.step-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? '#4caf50' : '#ddd')};
    color: ${(props) => (props.active ? '#4caf50' : '#ddd')};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
}

.step-line {
    position: absolute;
    top: 100%;
    left: 3%;
    width: 2px;
    height: 100%;
    background-color: ${(props) => (props.active ? '#4caf50' : '#ddd')};
    transform: translateX(-50%);
    z-index: 999;
}

.step-details {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-left: 30px;
    font-size: 14px;
}
      .step-time {
    font-size: 12px;
    color: #888;
  }
`;

const StepLabel = styled.div`
font-weight: 600;
`;

const StepTime = styled.div`
color: #777;
font-size: 12px;
`;



function OrderDetails() {
    const navigate = useNavigate();
    const order = JSON.parse(sessionStorage.getItem('selectedOrder') || '{}');
    const [formattedStatus, setFormattedStatus] = useState('');
    const [status, setStatus] = useState('');

    const [billing, setBilling] = useState<Address | null>(null);
    const [shipping, setShipping] = useState<Address | null>(null);

    const [statuses, setStatuses] = useState<any[]>([]);
    const [selected, setSelected] = useState('Details')
    const [orderList, setOrderList] = useState<any[]>([]);


    useEffect(() => {
        if (order && Object.keys(order)?.length !== 0) {
            const formatted = order?.status.charAt(0).toUpperCase() + order?.status.slice(1);
            if (!formattedStatus) {
                setFormattedStatus(formatted);
            }
        } else {
            navigate('/orders/list')
        }
    }, [order]);  
    useEffect(() => {
        setStatus(order?.status);
        setStatuses(order?.statuses);
        order?.customerDetails?.address?.forEach((address: any) => {
            if (address.billing) {
                setBilling(address);
            }
            if (address.shipping) {
                setShipping(address);
            }
        });
    }, [])

    const tabs = ['Details', 'Items']
    function formatDate(date: any) {
        if (!date) {
            return "Invalid Date";
        }

        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');  
        const month = String(d.getMonth() + 1).padStart(2, '0'); 
        const year = d.getFullYear();  

        return `${day}-${month}-${year}`;  
    }
    const [searchTerm, setSearchTerm] = useState<string>('');

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
        if (tab === "Items") {
            setOrderList(order?.items);  
        }
    }

    const statusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const data = {
            status: event.target.value,
            updatedAt: new Date().toISOString()
        }
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/user/order/statusChange/${order?.orderId}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                }
            )
            .then(res => {
                if (res.status === 200) {
                    order.status = data.status
                    sessionStorage.setItem('selectedOrder', JSON.stringify(order));
                    setStatus(data.status)
                }

            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response);
                }
            });
    }

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const mainStatuses = [
        { status: 'open' },
        { status: 'accepted' },
        { status: 'shipped' },
        { status: 'outfordelivery' },
        { status: 'delivered' },
        { status: 'cancelled' },
        { status: 'completed' },
    ]


    return (
        <Div>
            <div className="breadcrumb">
                <span>
                    Dashboard
                    <span className="p-3">{'>'}</span>
                </span>
                <span>
                    Orders
                    <span className="seperator p-3">{'>'}</span>
                </span>
                <span>
                    {formattedStatus} Orders
                    <span className="seperator p-3">{'>'}</span>
                </span>
                <span>{order?.orderId}</span>
            </div>
            <div className="mt-4">
                <div className="row rounded p-3">
                    <div className="col box">
                        <div className='box-item'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.7696 4.50913L23.4363 5.90853C26.3052 7.41405 27.7396 8.16682 28.5362 9.51949C29.3327 10.8722 29.3327 12.5554 29.3327 15.9219V16.0778C29.3327 19.4443 29.3327 21.1275 28.5362 22.4802C27.7396 23.8329 26.3052 24.5856 23.4363 26.0911L20.7696 27.4905C18.4288 28.719 17.2584 29.3332 15.9993 29.3332C14.7403 29.3332 13.5699 28.719 11.2291 27.4905L8.56241 26.0911C5.69352 24.5856 4.25907 23.8329 3.46254 22.4802C2.66602 21.1275 2.66602 19.4443 2.66602 16.0778V15.9219C2.66602 12.5554 2.66602 10.8722 3.46254 9.51949C4.25907 8.16682 5.69352 7.41405 8.56241 5.90853L11.2291 4.50912C13.5699 3.28071 14.7403 2.6665 15.9993 2.6665C17.2584 2.6665 18.4288 3.28071 20.7696 4.50913Z" stroke="#3E60CF" stroke-width="2" stroke-linecap="round" />
                                <path d="M28 10L16 16M16 16L4 10M16 16V28.6667" stroke="#3E60CF" stroke-width="2" stroke-linecap="round" />
                            </svg>
                            <div className='p-0'>Total Items</div>
                        </div>
                        <strong>{order?.items?.length || 0}</strong>
                    </div>
                    <div className="col box">
                        <div className='box-item'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.304 21.5157C4.24328 19.455 3.21293 18.4246 2.82953 17.0878C2.44614 15.751 2.77379 14.3312 3.4291 11.4915L3.807 9.85393C4.35831 7.46491 4.63397 6.2704 5.45194 5.45243C6.26991 4.63446 7.46442 4.3588 9.85344 3.80749L11.491 3.42959C14.3307 2.77428 15.7505 2.44663 17.0873 2.83002C18.4241 3.21341 19.4545 4.24377 21.5152 6.30448L23.9547 8.744C27.54 12.3293 29.3327 14.122 29.3327 16.3496C29.3327 18.5772 27.54 20.3699 23.9547 23.9552C20.3694 27.5405 18.5767 29.3332 16.3491 29.3332C14.1215 29.3332 12.3288 27.5405 8.74351 23.9552L6.304 21.5157Z" stroke="#3E60CF" stroke-width="2" />
                                <circle cx="11.4763" cy="11.8389" r="2.66667" transform="rotate(-45 11.4763 11.8389)" stroke="#3E60CF" stroke-width="2" />
                                <path d="M15.389 24.6665L24.6943 15.3608" stroke="#3E60CF" stroke-width="2" stroke-linecap="round" />
                            </svg>
                            <div>Total Price</div>
                        </div>
                        <strong>{order?.orderAmount}</strong>
                    </div>
                    <div className="col box">
                        <div className='box-item'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="15.9993" cy="7.99984" rx="5.33333" ry="5.33333" stroke="#3E60CF" stroke-width="2" />
                                <ellipse cx="15.9993" cy="22.6668" rx="9.33333" ry="5.33333" stroke="#3E60CF" stroke-width="2" />
                            </svg>
                            <div>Customer</div>
                        </div>
                        <strong>{order?.customerDetails?.name}</strong>
                    </div>
                    <div className="col box">
                        <div className='box-item'>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 23.0096C20 20.611 22.0893 18.6665 24.6667 18.6665C27.244 18.6665 29.3333 20.611 29.3333 23.0096C29.3333 25.3894 27.8439 28.1665 25.52 29.1595C24.9783 29.391 24.355 29.391 23.8133 29.1595C21.4894 28.1665 20 25.3894 20 23.0096Z" stroke="#3E60CF" stroke-width="1.5" />
                                <path d="M24.666 23.3335H24.678" stroke="#3E60CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.0009 5.6665C15.4487 5.6665 15.0009 6.11422 15.0009 6.6665C15.0009 7.21879 15.4487 7.6665 16.0009 7.6665V5.6665ZM16.0009 25.3332L16.708 26.0403C16.8956 25.8527 17.0009 25.5984 17.0009 25.3332C17.0009 25.068 16.8956 24.8136 16.708 24.6261L16.0009 25.3332ZM22.9418 11.5829L23.4787 12.4266L22.9418 11.5829ZM9.0601 20.4167L9.59698 21.2604H9.59698L9.0601 20.4167ZM14.708 22.6261C14.3175 22.2355 13.6844 22.2355 13.2938 22.6261C12.9033 23.0166 12.9033 23.6498 13.2938 24.0403L14.708 22.6261ZM13.2938 26.6261C12.9033 27.0166 12.9033 27.6498 13.2938 28.0403C13.6844 28.4308 14.3175 28.4308 14.708 28.0403L13.2938 26.6261ZM21.5101 5.6665H16.0009V7.6665H21.5101V5.6665ZM16.0009 24.3332H10.4918V26.3332H16.0009V24.3332ZM22.4049 10.7393L8.52323 19.5731L9.59698 21.2604L23.4787 12.4266L22.4049 10.7393ZM16.708 24.6261L14.708 22.6261L13.2938 24.0403L15.2938 26.0403L16.708 24.6261ZM15.2938 24.6261L13.2938 26.6261L14.708 28.0403L16.708 26.0403L15.2938 24.6261ZM10.4918 24.3332C8.82436 24.3332 8.19024 22.1556 9.59698 21.2604L8.52323 19.5731C5.42843 21.5425 6.82344 26.3332 10.4918 26.3332V24.3332ZM21.5101 7.6665C23.1775 7.6665 23.8116 9.84408 22.4049 10.7393L23.4787 12.4266C26.5735 10.4572 25.1784 5.6665 21.5101 5.6665V7.6665Z" fill="#3E60CF" />
                                <g clip-path="url(#clip0_826_18198)">
                                    <path d="M9.78886 2.69098L10.7889 3.21576C11.8647 3.78033 12.4026 4.06262 12.7013 4.56987C13 5.07712 13 5.70833 13 6.97076V7.02924C13 8.29167 13 8.92288 12.7013 9.43013C12.4026 9.93738 11.8647 10.2197 10.7889 10.7842L9.78886 11.309C8.91104 11.7697 8.47214 12 8 12C7.52786 12 7.08896 11.7697 6.21115 11.309L5.21115 10.7842C4.13531 10.2197 3.5974 9.93738 3.2987 9.43013C3 8.92288 3 8.29167 3 7.02924V6.97076C3 5.70833 3 5.07712 3.2987 4.56987C3.5974 4.06262 4.13531 3.78033 5.21115 3.21576L6.21115 2.69098C7.08896 2.23033 7.52786 2 8 2C8.47214 2 8.91104 2.23033 9.78886 2.69098Z" stroke="#3E60CF" stroke-linecap="round" />
                                    <path d="M12.5 4.75L8 7M8 7L3.5 4.75M8 7V11.75" stroke="#3E60CF" stroke-linecap="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_826_18198">
                                        <rect width="12" height="12" fill="white" transform="translate(2 1)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <div>Status</div>
                        </div>
                        <select className="form-select"
                            value={status}
                            onChange={statusChange}
                        >
                            <option value="">Select Status</option>
                            <option value="open">Open</option>
                            <option value="accepted">Accepted</option>
                            <option value="shipped">Shipped</option>
                            <option value="outfordelivery">Out for delivey</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                        </select>
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
                selected == 'Details' && (
                    <div className=" mt-3">
                        <div className="row">
                            <div className='col-md-8 '>
                                <div className="row d-flex">
                                    <div className="col-md-6 mb-4 d-flex">
                                        <div className="card p-4 detailsData w-100">
                                            <h5 className="card-title">Order Details</h5>
                                            <div className="row">
                                                <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p className='col-md-6'><strong>Order ID:</strong><br />{order.orderId}</p>
                                                    <p className='col-md-6 text-end'>
                                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="4" cy="4" r="4" fill="#2ECF3E" />
                                                        </svg>
                                                        <strong className='ms-1'>{order.status}</strong><br /><span className="text-success">{formatDate(order.statuses[order?.statuses?.length - 1].updatedAt)}</span></p>
                                                </div>
                                                <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p className='col-md-6'><strong>Seller:</strong><br />Zudio, Kollam</p>
                                                    <p className='col-md-6 text-end'><strong>Contact:</strong><br />9028282828</p>
                                                </div>
                                                <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p className='col-md-6'><strong>Delivery Date:</strong><br />27/09/2024</p>
                                                    <p className='col-md-6 text-end'><strong>Created Date:</strong><br />{formatDate(order.createdAt)}</p>
                                                </div>
                                                <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p className='col-md-6'><strong>Shipment Track ID:</strong><br /></p>
                                                    <p className='col-md-6 text-end'><strong>Order Track ID:</strong><br /></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Information Box */}
                                    <div className="col-md-6 mb-4 d-flex">
                                        <div className="card p-4 detailsData w-100">
                                            <div className="">
                                                <div className="d-flex mb-4" style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img
                                                        src="https://www.w3schools.com/howto/img_avatar.png"
                                                        alt="Profile"
                                                        className="rounded-circle"
                                                        style={{ width: '80px', height: '80px' }}
                                                    />
                                                    <div className='ms-4' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <h3 className='customerName'>{order?.customerDetails?.name}</h3>
                                                        <p className="text-muted customerPlace">{order?.customerDetails?.city}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-md-6">
                                                    <p><strong>Name:</strong><br />{order?.customerDetails?.name}</p>
                                                    <p><strong>Organization:</strong><br /> {order?.organizationDetails?.name}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><strong>Contact:</strong><br /> {order?.customerDetails?.mobile}</p>
                                                    <p><strong>City / State:</strong><br /> {order?.customerDetails?.city}{"  /  "}{order?.customerDetails?.state}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row d-flex">
                                    {/* Billing Address Box */}
                                    <div className="col-md-6 mb-4 d-flex">
                                        <div className="card p-4 detailsData w-100">
                                            <h5 className="card-title">Billing Address</h5>
                                            <p><strong>Street Address:</strong><br /> {billing?.name},{billing?.houseNo},{billing?.area},{billing?.city},{billing?.state},{billing?.pincode}</p>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p><strong>City / State:</strong><br /> {billing?.city}{" / "}{billing?.state}</p>
                                                    <p><strong>Contact:</strong><br /> {billing?.mobile}</p>
                                                    <p><strong>GST No:</strong><br /> GST454968413584</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><strong>Postal Code:</strong> <br />{billing?.pincode}</p>
                                                    <p><strong>Country:</strong><br /> {billing?.country}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipping Address Box */}
                                    <div className="col-md-6 mb-4 d-flex">
                                        <div className="card p-4 detailsData w-100">
                                            <h5 className="card-title">Shipping Address</h5>
                                            <p><strong>Street Address:</strong><br />  {shipping?.name},{shipping?.houseNo},{shipping?.area},{shipping?.city},{shipping?.state},{shipping?.pincode}</p>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p><strong>City/State:</strong><br /> {shipping?.city}{" / "}{shipping?.state}</p>
                                                    <p><strong>Contact:</strong> <br />{shipping?.mobile}</p>
                                                    <p><strong>GST No:</strong><br /> GST549468413584</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <p><strong>Postal Code:</strong> <br />{shipping?.pincode}</p>
                                                    <p><strong>Country:</strong><br /> {shipping?.country}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                {/* Track Order Box */}
                                <div className="col-md-12 mb-4 d-flex">
                                    <div className="card p-3 w-100">
                                        <h5 className="card-title">Track Order</h5>
                                        <StepperContainer>
                                            {mainStatuses.map((status, index) => {
                                                // Check if the current status exists in the statuses array
                                                const currentStatusIndex = statuses.findIndex((s) => s.status === status.status);

                                                // Determine if the current status is active or not
                                                const isActive = currentStatusIndex !== -1 && currentStatusIndex <= index;
                                                return (
                                                    <Step key={index} active={isActive}>
                                                        {/* Step Circle */}
                                                        <div className="step-circle">{index + 1}</div>

                                                        {/* Step Line */}
                                                        {index < mainStatuses.length - 1 && <div className="step-line" />}

                                                        {/* Step Details */}
                                                        <div className="step-details">
                                                            <StepLabel>{status.status}</StepLabel>
                                                            {/* <StepLabel>{formatDate(status.updatedAt)}</StepLabel> */}
                                                            {currentStatusIndex !== -1 && statuses[currentStatusIndex]?.updatedAt && (
                                                                <div className="step-time">{new Date(statuses[currentStatusIndex].updatedAt).toLocaleString()}</div>
                                                            )}
                                                        </div>
                                                    </Step>
                                                );
                                            })}
                                        </StepperContainer>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                selected == 'Items' && (
                    <Link className="containr mt-3 p-3">
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <div>
                                <Title>{selected}{" "}Order items list</Title> <br />
                                <Subtitle>List of items in order {order?.orderId}</Subtitle>
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
                                    <Colortext style={{ color: 'blue' }}>Sl. No.</Colortext>
                                    <Colortext>PRODUCT</Colortext>
                                    <Colortext>SPECIFICATIONS</Colortext>
                                    <Colortext>UNIT PRICE</Colortext>
                                    <Colortext>QUANTITY</Colortext>
                                    <Colortext>NET AMT</Colortext>
                                    <Colortext>DISCOUNT</Colortext>
                                    <Colortext>TAX AMT</Colortext>
                                    <Colortext>TOTAL AMT DATE</Colortext>
                                </tr>
                            </thead>
                            <tbody className='tableBody'>
                                {orderList.map((order, index) => (
                                    <tr key={index}>
                                        <Linktext>{index + 1}</Linktext>
                                        <Colortext>{order?.productName}</Colortext>
                                        <th style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
                                            <span className='d-flex attribute'><Attribute>Size</Attribute>&nbsp;&nbsp;{order.attributes.size[0].size}</span>
                                            <span className='d-flex attribute'><Attribute>Color</Attribute>&nbsp;&nbsp;{order.attributes.color[0].color}</span>
                                        </th>
                                        <Linktext>{order?.offerPrice}</Linktext>
                                        <Linktext>{order?.quantity}</Linktext>
                                        <Colortext>{order?.totalPrice}</Colortext>
                                        <Colortext>{order?.discount || 0}</Colortext>
                                        <Colortext>0</Colortext>
                                        <Colortext>{order.totalPrice}</Colortext>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Link>
                )
            }


        </Div >
    );
}
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
const Colortext = styled.th`
    color :#575E78 !important;
    padding:20px !important; 
`

const Linktext = styled.th`
    color :#575E78 !important;
    padding:20px !important; 
`

const Attribute = styled.th`
    color :#575E78 !important;
    border-top:0 !important;
    padding:0 !important;
`

const Title = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const Subtitle = styled.span`
  font-size: 14px;
  font-weight: 400;
`;


export default OrderDetails;
