import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import ImageIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import TablePagination from '@mui/material/TablePagination';
import { getUploadData, getImageData } from '../../service/wish.service';
import dayjs from 'dayjs';
import { Button, InputLabel, TextField } from '@mui/material';
import { debounce } from 'lodash';
import normalizeString from './utils/normalizeString';
import RefreshIcon from '@mui/icons-material/Refresh';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
        padding: '8px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: '8px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const WishComponent = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState(''); // State for search input
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Update fetchData to include the search parameter
    const fetchData = async (page, limit, search, startDate, endDate) => {
        try {
            const response = await getUploadData({
                page,
                limit,
                search,
                startDate: startDate ? Math.floor(new Date(startDate).getTime() / 1000) : null,
                endDate: endDate ? Math.floor(new Date(endDate).getTime() / 1000) : null,
            });
            if (response && Array.isArray(response.data)) {
                const normalizedSearch = normalizeString(search);
                const filteredData = response.data.filter(item => {
                    return normalizeString(item.name).includes(normalizedSearch) ||
                        normalizeString(item.schoolName).includes(normalizedSearch) ||
                        normalizeString(item.userInput).includes(normalizedSearch);
                });
                setData(filteredData);
                setTotal(response.total);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Debounce function to limit the number of API calls for search input
    const debouncedFetchData = useCallback(
        debounce((searchValue) => {
            fetchData(page, limit, searchValue, startDate, endDate);
        }, 300),
        [page, limit, startDate, endDate]
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        debouncedFetchData(value);
    };

    // Call API immediately on start date change
    const handleStartDateChange = (e) => {
        const date = e.target.value;
        setStartDate(date);
        fetchData(page, limit, search, date, endDate);  // Trigger API call
    };

    // Call API immediately on end date change
    const handleEndDateChange = (e) => {
        const date = e.target.value;
        setEndDate(date);
        fetchData(page, limit, search, startDate, date);  // Trigger API call
    };

    // Fetch data immediately when page or limit changes
    useEffect(() => {
        fetchData(page, limit, search, startDate, endDate);
    }, [page, limit]);

    const handleOpen = async (imageUrl) => {
        const base64Image = await getImageData(imageUrl);
        setSelectedImage(`data:image/png;base64,${base64Image}`);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage('');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        const newLimit = parseInt(event.target.value, 10);
        setLimit(newLimit || 20);
        setPage(1);
    };
    // handleReset function to reset search, startDate, endDate, and page
    const handleReset = () => {
        setSearch('');
        setStartDate(null);
        setEndDate(null);
        setPage(1);
        fetchData(1, limit, '', null, null);
    };
    return (
        <>
            <h1 className="mb-8 mt-4 font-bold text-xl uppercase">Những câu chúc của mọi người</h1>
            <div className="flex gap-4 mb-4 items-center">
                <div className="flex-1 min-w-[200px]">
                    <input
                        type='text'
                        placeholder='Tìm kiếm...'
                        value={search}
                        onChange={handleSearchChange}
                        className='p-2 w-full border border-gray-300 rounded-md'
                    />
                </div>

                <div className="flex items-center gap-2">
                    <InputLabel className="text-gray-700">Từ ngày</InputLabel>
                    <TextField
                        label="Từ ngày"
                        type="date"
                        value={startDate || ''}
                        onChange={handleStartDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        className="mr-4"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <InputLabel className="text-gray-700">Đến ngày</InputLabel>
                    <TextField
                        label="Đến ngày"
                        type="date"
                        value={endDate || ''}
                        onChange={handleEndDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        className="mr-4"
                        InputProps={{
                            inputProps: {
                                min: startDate || '',  // This sets the minimum date for endDate
                            }
                        }}
                    />
                </div>

                <Button
                    variant="outlined"
                    onClick={handleReset}
                    className="ml-auto"
                    startIcon={<RefreshIcon />}
                >
                    Làm mới
                </Button>
            </div>

            <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Họ tên</StyledTableCell>
                            <StyledTableCell>Trường</StyledTableCell>
                            <StyledTableCell>Lời chúc</StyledTableCell>
                            <StyledTableCell>Ngày tạo</StyledTableCell>
                            <StyledTableCell align="right">Hình ảnh</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <StyledTableRow key={item._id}>
                                    <StyledTableCell component="th" scope="row">
                                        {item.name}
                                    </StyledTableCell>
                                    <StyledTableCell>{item.schoolName}</StyledTableCell>
                                    <StyledTableCell>{item.userInput}</StyledTableCell>
                                    <StyledTableCell>{dayjs(item.timestamp).format('DD-MM-YYYY HH:mm')}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton onClick={() => handleOpen(item.imageUrl)}>
                                            <ImageIcon sx={{ color: '#9ca3af' }} />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={5} align="center">
                                    No data available
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[20, 50, 100]}
                    component="div"
                    count={total}
                    rowsPerPage={limit}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            <Modal open={open} onClose={handleClose}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        position: 'relative',
                    }}
                >
                    <img
                        src={selectedImage}
                        alt="Preview"
                        style={{ maxWidth: '60%', maxHeight: '80%', borderRadius: '8px' }}
                    />
                    <IconButton
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '50%',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </Modal>
        </>
    );
};

export default WishComponent;