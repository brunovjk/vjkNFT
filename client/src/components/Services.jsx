import { Box, CardMedia, Grid, Typography } from "@mui/material";

const Services = () => {
  return (
    <Box component="div">
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          p: { xs: "2rem", md: "4rem" },
        }}
      >
        <Grid item>
          <Grid container>
            <Grid item>
              <CardMedia
                component="iframe"
                sx={{
                  width: { xs: "272px", md: "432px" },
                  height: { xs: "153px", md: "243px" },
                  border: 0,
                }}
                src="https://gifer.com/embed/IQCh"
                alt="Google Maps"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Grid
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
                sx={{
                  width: { xs: "280px", md: "420px" },
                  height: { xs: "240px", md: "320px" },
                }}
              >
                <Grid item>
                  <Typography
                    variant="body1"
                    fontWeight="300"
                    align="center"
                    color="secondary"
                  >
                    Each rewards gives you a coordenate and a date.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    fontWeight="300"
                    align="center"
                    color="secondary"
                  >
                    You check on Google and Google Maps where is YOUR point on
                    Earth and what Happened in that day.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    fontWeight="300"
                    align="center"
                    color="secondary"
                  >
                    These Rewards are not rare by themselves. The value is given
                    to the meaning of the date by a relative Being.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    fontWeight="300"
                    align="center"
                    color="secondary"
                  >
                    A single Reward may have zero value to one person, and be
                    worth 1 Billion Dollars to another.
                  </Typography>
                  <Typography variant="body1" align="center" color="secondary">
                    It just depends on your birthday.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;
