import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Logout from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { red } from '@mui/material/colors';

/**
 * The props type for [[`AvatarMenu`]].
 */
interface AvatarMenuProps {
  username: string;
  imageURL?: string;
}

/**
 * Avatar menu on the top right of the page and cards.
 * @category Component
 */
export default function AvatarMenu({
  username,
  imageURL,
}: React.PropsWithChildren<AvatarMenuProps>): React.ReactElement {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    //TODO: authUtils.signOut();
  };

  const handleProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    //TODO: redirect to profile page
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            {imageURL ? (
              <Avatar alt="Slack Profile" src={imageURL} data-testid="avatar" />
            ) : (
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: red[500] }}
                data-testid="avatar"
              >
                {username.at(0)?.toUpperCase()}
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        data-testid="avatar-menu"
      >
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <ManageAccountsIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
