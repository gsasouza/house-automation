import { createFragmentContainer, graphql } from "react-relay";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createQueryRenderer } from "../../relay/createQueryRenderer";
import { FC } from "react";
import { Link } from "react-router-dom";
import { HomeQuery } from "./__generated__/HomeQuery.graphql";

const cards = [
  {
    title: 'Gerenciar Cômodos',
    description: 'Interaja com os dispositivos da sua casa',
    route: '/dashboard/rooms',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
  }, {
    title: 'Gerenciar Placas',
    description: 'Adicione novas placas e cuide das placas antigas.',
    route: '/dashboard/boards',
    image: 'https://images.unsplash.com/photo-1610878785620-3ab2d3a2ae7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=322&q=80'
  }, {
    title: 'Gerenciar Dispositivos',
    description: 'Tem um novo dispositivo? Adicione-o e comece a interagir com ele!',
    route: '/dashboard/boardIos',
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
  }
]

const Home: FC<{ query: HomeQuery }> = ({ query }) => {
  const { me } = query;
  return (
    <>
      <Container>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {`Bem vindo, ${me.name}`}
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          O que deseja fazer ?
        </Typography>
      </Container>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card.title} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  image={card.image}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {card.title}
                  </Typography>
                  <Typography variant="body2">
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Link to={card.route}>
                    <Button variant="outlined">Ir</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}


const fragment = createFragmentContainer(Home, {
  query: graphql`
      fragment Home_query on Query {
          me {
              name
              username
          }
      }
  `
})

export default createQueryRenderer(fragment, {
  query: graphql`
      query HomeQuery {
          ...Home_query
      }
  `
})
