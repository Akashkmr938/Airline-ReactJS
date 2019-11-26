import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mindtree.com">
        Mindtree
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '15vh',
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: '#82c0c9',
    textAlign: "center"
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <div className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Mindtree Airline PVT LTD.</Typography>
          <Copyright />
        </Container>
      </div>
    </footer>
  );
}