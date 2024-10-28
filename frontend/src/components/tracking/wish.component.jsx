import { useEffect, useState } from 'react';
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
import ImageIcon from '@mui/icons-material/Visibility'; // Eye icon
import CloseIcon from '@mui/icons-material/Close'; // Close icon
import { getUploadData, getImageData } from '../../service/wish.service';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14, // Decrease font size
        padding: '8px', // Decrease padding
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14, // Decrease font size
        padding: '8px', // Decrease padding
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
    const [data, setData] = useState([]); // Initialize as an empty array
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const fetchData = async () => {
        try {
            const uploadData = await getUploadData();
            console.log('Fetched upload data:', uploadData); // Log the API response
            if (Array.isArray(uploadData)) {
                setData(uploadData);
            } else {
                console.error('Fetched data is not an array:', uploadData);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const fetchImageData = async (imageUrl) => {
        try {
            const data = await getImageData(imageUrl);
            if (data) {
                return data;
            } else {
                console.error('Fetched data is not an array:', data);
                return null;
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            return null;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpen = async (imageUrl) => {
        const base64Image = await fetchImageData(imageUrl);
        setSelectedImage(`data:image/png;base64,${base64Image}`);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage('');
    };

    return (
        <>
            <h1 className='mb-8 mt-4 font-bold text-xl uppercase'>Những câu chúc của mọi người</h1>
            <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 500 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Họ tên</StyledTableCell>
                            <StyledTableCell>Trường</StyledTableCell>
                            <StyledTableCell>Lời chúc</StyledTableCell>
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
                                    <StyledTableCell component="th" scope="row">
                                        {item.schoolName}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {item.userInput}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <IconButton onClick={() => handleOpen(item.imageUrl)}>
                                            <ImageIcon sx={{ color: '#9ca3af' }} />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={2} align="center">No data available</StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    position: 'relative' // To position the close button correctly
                    }}>
                    <img
                        src={selectedImage}
                        alt="Preview"
                        style={{ maxWidth: '60%', maxHeight: '80%', borderRadius: '8px' }} // Adjust modal image size
                    />
                    <IconButton
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '50%'
                        }}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Modal>
        </>
    );
};

export default WishComponent;
