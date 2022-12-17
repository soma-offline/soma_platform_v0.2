import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

function Navbar(){
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
            <Link to="/"><img src={logo} className={classes.logo} alt="logo" /></Link>
            </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles((theme) => ({
    appBar: {
      backgroundColor: '#EFF1F3',
    },
    logo: {
      maxWidth: 200,
    },
  }));

export default Navbar;