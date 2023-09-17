"use client";
import Icon from '@mui/material/Icon';
import Divider from "@mui/material/Divider/Divider";
import Drawer from "@mui/material/Drawer/Drawer";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import { Dispatch, SetStateAction, useState } from "react";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import BookIcon from '@mui/icons-material/Book';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/navigation';
import { UseSidebarsEvent } from '@/hooks/sidebarsEvent';
import { Box } from '@mui/material';


type Props = {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>
  handleDrawerToggle: () => void;
}

export default function Sidebars(props: Props) {
  const drawerWidth: number = 240;

  const iconInfos: any = {
    "音楽": {
      "href": "/music",
      "icon": <LibraryMusicIcon />
    },
    '動画': {
      "href": "/movie",
      "icon": <LiveTvIcon />,
    },
    "電子書籍": {
      "href": "/ebook",
      "icon": <BookIcon />
    }
  }

  const [event] = UseSidebarsEvent(
    props.setMobileOpen,
    iconInfos
  );

  const drawer = (
    <Box>
      <Toolbar
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        <ClearIcon
          sx={{
            marginTop: "10px",
            float: "left",
            color: "rgba(0,0,0,0.87)"
          }}
          onClick={props.handleDrawerToggle}
        />
      </Toolbar>
      <Divider />
      <List>
        {['音楽', '動画', '電子書籍'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => event.listItemClick(text)}>
            <ListItemButton>
              <ListItemIcon>
                {iconInfos[text]["icon"]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        open={props.mobileOpen}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        anchor="right"
        onClose={props.handleDrawerToggle}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        ModalProps={{
          keepMounted: false,
        }}
        anchor="left"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}
