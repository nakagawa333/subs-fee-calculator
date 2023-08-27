"use client";
import AppBar from '@mui/material/AppBar/AppBar';
import IconButton from '@mui/material/IconButton/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography/Typography';
import MenuIcon from '@mui/icons-material/Menu';

type Props = {
  handleDrawerToggle:() => void
}
export default function Nabar(props:Props){
    const drawerWidth:number = 240;

    return(
        <AppBar position="static">
            <Toolbar variant="dense">
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>               
            <Typography 
              variant="h6" 
              color="inherit" 
              component="div"
              sx={{ 
                flexGrow: 1, 
                p: 3, 
                width:{marginLeft: drawerWidth},
                display: { xs: 'none', sm: 'block' }
              }}
            >
                サブスク費用計算ツール
            </Typography>

            <Typography 
              variant="h6" 
              color="inherit" 
              component="div"
              sx={{ 
                flexGrow: 1, 
                p: 3, 
                width:{marginLeft: 0},
                display: { xs: 'block', sm: 'none' }
              }}
            >
                サブスク費用計算ツール
            </Typography>
            </Toolbar>
        </AppBar>
    )
}