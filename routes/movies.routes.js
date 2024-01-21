
const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

router.get('/', (req, res, next) => {
    Movie.find()
        .then((movies) => {
            res.render('movies/movies', { movies });
        })
        .catch((err) => {
            console.log(`Error while fetching movies: ${err}`);
            next(err);
        });
});

router.get('/create', (req, res, next) => {
    res.render('movies/new-movie');
});

router.get('/details/:id', (req, res, next) => {
    const id = req.params.id;
    Movie.findById(id)
        .populate('cast')
        .then((movie) => {
            res.render('movies/movie-details', { movie });
        })
        .catch((err) => next(err));
});

router.post('/create', (req, res) => {
    const { title, genre, plot } = req.body;
    Movie.findOne({ title, genre, plot })
        .then((existingMovie) => {
            if (existingMovie) {
                return res.render('movies/new-movie', { message: 'Movie already exists' });
            }

            return Movie.create({ title, genre, plot });
        })
        .then(() => {
            res.redirect('/movies');
        })
        .catch((err) => {
            console.log(`Error while creating a new movie: ${err}`);
            res.render('movies/new-movie', { message: 'Error creating movie' });
        });
});

router.get('/:id/edit', (req, res, next) => {
    const id = req.params.id;
    Movie.findById(id)
        .then((movie) => {
            res.render('movies/edit-movie', { movie });
        })
        .catch((err) => next(err));
});

router.post('/:id/edit', (req, res, next) => {
    const id = req.params.id;
    Movie.findByIdAndUpdate(id, req.body, { new: true })
        .then((movie) => {
            res.redirect(`/movies/details/${movie._id}`);
        })
        .catch((err) => next(err));
});

module.exports = router;
