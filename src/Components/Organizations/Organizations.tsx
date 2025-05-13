import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Pagination from '../Pagination/Pagination'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import PenIcon from "../../Assets/Organzations/PenIcon.png"
import DeleteIcon from "../../Assets/Organzations/DeleteIcon.png"
import AddOrganizationModal from '../Modal/AddOrganizationModal'

const Olist = styled.div`
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
        font-size: 14px!important;
        font-weight: 600 !important;
        background-color:#E8E8F3 !important;
        color :#575E78 !important;
    }
    .tableBody{
        font-size: 14px !important;
        font-weight: 400 !important;
    }
    .tableBody .orgimg{
        height: 48px;
        width: 48px;
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

`
const Colortext = styled.th`
    color :#575E78 !important;
    padding:20px !important; 

    .deletebtn{
        cursor:pointer;
    }
`

const Linktext = styled.th`
    color :#575E78 !important;
    padding:20px !important; 

    .customerId{
        cursor:pointer;
    }
`

const Title = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const Subtitle = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 5,
};

const Organizations = () => {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [filterCount, setFilterCount] = useState<number>(0);
    const [organizationList, setOrganizationList] = useState<any[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetchAllOrganizations();
    }, [searchTerm,page])

    const fetchAllOrganizations = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/superAdmin/organizations/list?key=${searchTerm}&page=${page}&pageSize=${pageSize}`,
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            }
        )
            .then(res => {
                console.log(res)
                if (res?.data?.data?.length > 0) {
                    setOrganizationList(res.data.data)
                    const total = Math.ceil(res.data.totalCount / pageSize);
                    setTotalPages(total)
                } else {
                    setOrganizationList([])
                }

            })
            .catch(error => {
                if (error.response) {
                    console.error('Error response:', error.response);
                }
            });
    }

    const handleSortToggle = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterToggle = () => {
        setFilterCount((prev) => (prev === 0 ? 1 : 0));
    };
    const navigateToDetails = (id: string) => {
        console.log(id, "id")
        navigate(`/organizations/details/${id}`)
    }
    const openOrgModal = () => {
        setOpen(true)
    }


    return (
        <Olist>
            <div className="breadcrumb">
                <span >
                    Dashboard
                    <span className='p-3'>{'>'}</span>
                </span>
                <span >
                    Organizations
                </span>
            </div>
            {open && (
                <AddOrganizationModal
                    handleClose={() => setOpen(false)}
                />
            )
            }
            <div className="containr mt-3 p-3">
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div>
                        <Title>Organizations List</Title> <br />
                        <Subtitle>List of organization and their details</Subtitle>
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
                        <div>
                            <button className='btn btn-primary' onClick={() => { openOrgModal() }}>+ Organization</button>
                        </div>
                    </div>
                </div>
                <table className="table mt-4 ">
                    <thead >
                        <tr className="table-light">
                            <Colortext style={{ color: 'blue' }}>ORGANIZATION NAME</Colortext>
                            <Colortext>EMAIL</Colortext>
                            <Colortext>CONTACT PERSON</Colortext>
                            <Colortext>CONTACT</Colortext>
                            <Colortext>POINTS ALLOCATED</Colortext>
                            <Colortext>MEMBERS</Colortext>
                            <Colortext>ORDERS</Colortext>
                            <Colortext>POINTS BALANCE</Colortext>
                            <Colortext>ACTION</Colortext>
                        </tr>
                    </thead>
                    <tbody className='tableBody'>
                        {organizationList.map((customer, index) => (
                            <tr key={index}>
                                <Linktext onClick={() => navigateToDetails(customer?.orgId)}> <img src="https://img.freepik.com/free-vector/organization-abstract-concept_335657-3015.jpg?semt=ais_hybrid" alt="" className='orgimg' /> <span className='customerId'>{customer?.name}</span></Linktext>
                                <Colortext>{customer?.email}</Colortext>
                                <Linktext>{customer?.contactPerson}</Linktext>
                                <Linktext>{customer?.contact}</Linktext>
                                <Linktext>{customer?.pointsAllocated}</Linktext>
                                <Colortext>{customer?.customers}</Colortext>
                                <Colortext>{customer?.orders}</Colortext>
                                <Colortext>{customer?.pointsBalanced}</Colortext>
                                <Colortext>
                                    <div className='d-flex justify-content-between'>
                                        <img src={PenIcon} alt="" className='deletebtn' />
                                        <img src={DeleteIcon} alt="" className='deletebtn' />
                                    </div>
                                </Colortext>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage} />
            </div>
        </Olist>
    )
}

export default Organizations
