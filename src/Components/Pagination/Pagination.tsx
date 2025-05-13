import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    style={{
                        backgroundColor: i === currentPage ? 'blue' : 'white',
                        color: i === currentPage ? 'white' : 'black',
                        borderRadius: '50%',
                        border: '1px solid lightgray',
                        padding: '4px 12px',
                        margin: '0 5px',
                    }}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button onClick={handlePrevious} disabled={currentPage === 1} style={{background:'transparent'}}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1063_18404)">
                        <rect x="32" y="32" width="32" height="32" rx="16" transform="rotate(180 32 32)" fill="#EEEDF4" />
                        <path d="M16.0004 22.3999L17.1284 21.2719L12.6644 16.7999H22.4004V15.1999H12.6644L17.1284 10.7279L16.0004 9.5999L9.60039 15.9999L16.0004 22.3999Z" fill="#828BB9" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1063_18404">
                            <rect x="32" y="32" width="32" height="32" rx="1" transform="rotate(180 32 32)" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                Previous
            </button>
            {renderPageNumbers()}
            <button onClick={handleNext} disabled={currentPage === totalPages} style={{background:'transparent'}}>
                Next
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1063_18419)">
                        <rect width="32" height="32" rx="16" transform="matrix(1 0 0 -1 0 32)" fill="#EEEDF4" />
                        <path d="M15.9996 22.3999L14.8716 21.2719L19.3356 16.7999H9.59961V15.1999H19.3356L14.8716 10.7279L15.9996 9.5999L22.3996 15.9999L15.9996 22.3999Z" fill="#828BB9" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1063_18419">
                            <rect width="32" height="32" rx="1" transform="matrix(1 0 0 -1 0 32)" fill="white" />
                        </clipPath>
                    </defs>
                </svg>


            </button>
        </div>
    );
};

export default Pagination;
