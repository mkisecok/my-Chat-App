import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const ChatHelpDialog = (props) =>
{
    const { onClose, open } = props;

    const handleClose = (value) =>
    {
        onClose(value);
    };

    return(
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Useful commands for text input</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can easily format your text or use images in chat, by using the following formatting commands:

                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Element
                                    </TableCell>
                                    <TableCell>
                                        Syntax
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Bold
                                    </TableCell>
                                    <TableCell>
                                        **bold text**
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Italic
                                    </TableCell>
                                    <TableCell>
                                        *italicized text*
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Code
                                    </TableCell>
                                    <TableCell>
                                        `code`
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Link
                                    </TableCell>
                                    <TableCell>
                                        [title](https://www.example.com)
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Image
                                    </TableCell>
                                    <TableCell>
                                        ![alt text](image.jpg)
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
