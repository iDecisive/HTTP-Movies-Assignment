import React, { useState } from 'react';
import axios from 'axios';

function AddMovie({ movies, getMovieList}) {
    
    //State

    let [formInput, setFormInput] = useState({

        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: ''

    });

    let inputChange = event => {

        setFormInput({

            ...formInput,
            [event.target.name]: event.target.value

        })

    }

    let addMovie = event => {

        event.preventDefault();

        axios
        .post(`http://localhost:5000/api/movies/`, {

            id: movies.length,
            title: formInput.title,
            director: formInput.director,
            metascore: Number(formInput.metascore),
            stars: formInput.stars.split(',')

        })
        .then(response => {

            console.log(response)

            setFormInput({

                id: '',
                title: '',
                director: '',
                metascore: '',
                stars: ''

            })

            getMovieList()

        })
        .catch(error => {

            console.log(error)

        })

    }

    return (
        <div className='form-div'>

        <form className='update-form' onSubmit={addMovie}>

            <label>
                Title
                <input type='text' name='title' onChange={inputChange} value={formInput.title}></input>
            </label>

            <label>
                Director
                <input type='text' name='director' onChange={inputChange} value={formInput.director}></input>
            </label>

            <label>
                Metascore
                <input type='text' name='metascore' onChange={inputChange} value={formInput.metascore}></input>
            </label>

            <label>
                Stars (Seperate stars with commas)
                <textarea name='stars' onChange={inputChange} value={formInput.stars}></textarea>
            </label>

            <button>Save</button>

        </form>
        </div>
    );
}

export default AddMovie;