import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { FeedIcon, Button, ChatHelpDialog } from './index';
export default function MouseOverPopover() 
{
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ openDialog, setOpenDialog ] = React.useState(false);
    const handlePopoverOpen = (event) => 
    {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => 
    {
        setAnchorEl(null);
    };
    const handleClickOpenDialog = () =>
    {
        setOpenDialog(true);
    };
    const handleCloseDialog = (value) =>
    {
        setOpenDialog(false);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <Typography
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <Button variant="outlined" className='dialog_btn' onClick={ handleClickOpenDialog }>
                    <FeedIcon />
                </Button>
            </Typography>
            <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: 'none', }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>Markdown commands</Typography>
            </Popover>
            <ChatHelpDialog
                open={openDialog}
                onClose={handleCloseDialog}
            />
        </div>
    );
}
