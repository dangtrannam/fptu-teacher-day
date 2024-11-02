import { useEffect, useState } from 'react';
import axios from 'axios';
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
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState(''); // State for search input

    // Update fetchData to include the search parameter
    const fetchData = async (page, limit, search) => {
        try {
            const response = await getUploadData({ page, limit, search });
            if (response && Array.isArray(response.data)) {
                setData(response.data);
                setTotal(response.total);
            } else {
                console.error('Fetched data is not an array:', response);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
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
        setLimit(parseInt(event.target.value, 10));
        setPage(1);
    };

    return (
        <>
            <h1 className="mb-8 mt-4 font-bold text-xl uppercase">Những câu chúc của mọi người</h1>
            <Input
                type='text'
                placeholder='Tìm kiếm...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                    rowsPerPageOptions={[5, 10, 25]}
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
