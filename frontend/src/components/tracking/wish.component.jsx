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
import { Input } from '@mui/material';
import { debounce } from 'lodash';
import normalizeString from './utils/normalizeString';

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

    // Debounce function to limit the number of API calls
    const debouncedFetchData = useCallback(
        debounce((page, limit, search) => {
            fetchData(page, limit, search);
        }, 300), // Adjust the debounce delay as needed
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        debouncedFetchData(page, limit, value);
    };

    // Update fetchData to include the search parameter
    const fetchData = async (page, limit, search) => {
        try {
            const response = await getUploadData({ page, limit, search });
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

    useEffect(() => {
        fetchData(page, limit, search);
    }, [page, limit, search]);

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

    return (
        <>
            <h1 className="mb-8 mt-4 font-bold text-xl uppercase">Những câu chúc của mọi người</h1>
            <Input
                type='text'
                placeholder='Tìm kiếm...'
                value={search}
                onChange={handleSearchChange}
                className='mb-4 p-2 min-w-64 w-[60%] border border-gray-300 rounded-md'
            />

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
