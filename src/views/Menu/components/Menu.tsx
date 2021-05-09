import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconBarChart from '@material-ui/icons/BarChart';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconDashboard from '@material-ui/icons/Dashboard';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconLibraryBooks from '@material-ui/icons/LibraryBooks';
import MenuIcon from '@material-ui/icons/Menu';
import IconPeople from '@material-ui/icons/People';
import ReportIcon from '@material-ui/icons/Assessment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonIcon from '@material-ui/icons/Person';
import clsx from 'clsx';
import React from 'react';
import firebase from '../../../firebase';
import { useHistory } from 'react-router-dom';


type Props = {
  title: String,
  children: JSX.Element
};

const Menu: React.FC<Props> = ({ title, children }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function goTo(route: string) {
    console.log('on menu', route)
    history.push(route);
  }

  function handleClick() {
    setOpenMenu(!openMenu)
  }

  const handleLogout = (event: any) => {
    event.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(res => {
        goTo('/auth/login');
      });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
          <div className={classes.search}>
            <Button onClick={handleLogout} variant="contained" color="primary">
              Log out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List component="nav" className={classes.appMenu} disablePadding>
          <ListItem button className={classes.menuItem} onClick={() => { goTo('/dashboard') }}>
            <ListItemIcon className={classes.menuItemIcon}>
              <IconDashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button className={classes.menuItem} onClick={() => { goTo('/profile') }}>
            <ListItemIcon className={classes.menuItemIcon}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          <ListItem button className={classes.menuItem} onClick={() => { history.push('/invoice') }}>
            <ListItemIcon className={classes.menuItemIcon}>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Invoice" />
          </ListItem>

          <ListItem button className={classes.menuItem} onClick={() => { goTo('/reports') }}>
            <ListItemIcon className={classes.menuItemIcon}>
              <IconBarChart />
            </ListItemIcon>
            <ListItemText primary="Reports"/>
          </ListItem>
          <ListItem button onClick={handleClick} className={classes.menuItem}>
            <ListItemIcon className={classes.menuItemIcon}>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Nested Pages" />
            {openMenu ? <IconExpandLess /> : <IconExpandMore />}
          </ListItem>
          <Collapse in={openMenu} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
              <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Nested Page 1" />
              </ListItem>
              <ListItem button className={classes.menuItem}>
                <ListItemText inset primary="Nested Page 2" />
              </ListItem>
            </List>
          </Collapse>
        </List>

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  )
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => {
  return {
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // // necessary for content to be below app bar
      // ...theme.mixins.toolbar,
      // justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      // color: theme.palette.secondary,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }
}
);
export default Menu
