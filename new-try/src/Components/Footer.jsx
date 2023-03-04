import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useTheme } from 'styled-components';

const useStyles = makeStyles((theme) => ({
  rootBox: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 'auto',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    }
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    }
  },
}));

export default function Footer(props) {
  const classes = useStyles();
 const newTheme = useTheme();
  const content = {
    'brand': { image: 'nereus-assets/img/nereus-light.png', width: 110 },
    'copy': '© 2023 AhMaDi FaMiLy ❤️ All rights reserved',
    'link1': 'Home',
    'link2': 'Login',
    'link3': 'Sign Up',
    'link4': 'About',
    ...props.content
  };

  let brand;

  if (content.brand.image) {
    brand = <img src={ content.brand.image } alt="" width={ content.brand.width } />;
  } else {
    brand = content.brand.text || '';
  }

  return (
    <footer>
      <Container maxWidth="lg">
        <Box py={6} display="flex" flexWrap="wrap" alignItems="center" className={classes.rootBox}>
          <Link href="#" color="inherit" underline="none">
            {brand}
          </Link>
          <Box component="nav" className={classes.footerNav}>
            <Link href="/" variant="body1" color={newTheme.text} className={classes.footerLink}>{content['link1']}</Link>
            <Link href="/Login" variant="body1" color={newTheme.text} className={classes.footerLink}>{content['link2']}</Link>
            <Link href="/Sign-Up" variant="body1" color={newTheme.text} className={classes.footerLink}>{content['link3']}</Link>
            <Link href="/about" variant="body1" color={newTheme.text}className={classes.footerLink}>{content['link4']}</Link>
          </Box>
          <Typography color={newTheme.text} component="p" variant="caption" gutterBottom={false}>{content['copy']}</Typography>
        </Box>
      </Container>
    </footer>
  );
}