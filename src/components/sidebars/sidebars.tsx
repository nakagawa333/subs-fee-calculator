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
import { UseSidebarsEvent } from '@/hooks/sidebarsEvent';
import { Box } from '@mui/material';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import HomeIcon from '@mui/icons-material/Home';
import { Endpoint } from '@/constant/endpoint';
import { PageName } from '@/constant/pageName';

type Props = {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>
  handleDrawerToggle: () => void;
}

export default function Sidebars(props: Props) {
  const drawerWidth: number = 240;
  const top: string = "トップ";

  const iconInfos: any = {
    "音楽": {
      "href": Endpoint.MUSIC,
      "icon": <LibraryMusicIcon />
    },
    '動画': {
      "href": Endpoint.MOVIE,
      "icon": <LiveTvIcon />,
    },
    "電子書籍": {
      "href": Endpoint.EBOOK,
      "icon": <BookIcon />
    },
    "ダッシュボード": {
      "href": Endpoint.DASHBOARD,
      "icon": <DataUsageIcon />
    },
    "サブスク計算": {
      "href": Endpoint.TOP,
      "icon": <HomeIcon />
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
          <ListItem key={PageName.TOP} disablePadding onClick={() => event.listItemClick(PageName.TOP)}>
              <ListItemButton>
                <ListItemIcon>
                  {iconInfos[PageName.TOP]["icon"]}
                </ListItemIcon>
              <ListItemText primary={top} />
              </ListItemButton>
          </ListItem>
        </List>
      <Divider />
      <List>
        {[PageName.MUSIC,PageName.VIDEO, PageName.EBOOK,].map((text, index) => (
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
      <List>
        <ListItem key={PageName.DASHBOARD} disablePadding onClick={() => event.listItemClick(PageName.DASHBOARD)}>
            <ListItemButton>
              <ListItemIcon>
                {iconInfos[PageName.DASHBOARD]["icon"]}
              </ListItemIcon>
            <ListItemText primary={PageName.DASHBOARD} />
            </ListItemButton>
        </ListItem>
      </List>
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
