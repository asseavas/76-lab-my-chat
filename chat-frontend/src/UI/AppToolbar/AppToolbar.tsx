import { AppBar, Container, Link, Toolbar, Typography } from '@mui/material';

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Container>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link
              href="/"
              sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&hover': {
                  color: 'inherit',
                },
              }}
            >
              My chat
            </Link>
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
