import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function UpdateForm({ movieList, getMovieList }) {

    //State

    let params = useParams();

    let [formInput, setFormInput] = useState({

        id: params.id,
        title: '',
        director: '',
        metascore: '',
        stars: ''

    });

    //Functions

    let history = useHistory();

    let getCurrentMovie = () => {

        return movieList.filter(item => Number(item.id) === Number(params.id))[0];

    }

    useEffect(() => {

        console.log(movieList);

        if(movieList[0] !== undefined) {

            console.log('movieList is defined!!!')

            let currMovie = getCurrentMovie();

            console.log('Current movie stars: ', currMovie.stars);


            setFormInput({

                ...formInput,
                stars: currMovie.stars.toString()

            });

        } else {

            console.log('movieList is not defined')

        }

    },[movieList]);


    let inputChange = event => {

        setFormInput({

            ...formInput,
            [event.target.name]: event.target.value

        })

    }


    let updateMovie = event => {

        event.preventDefault();

        axios.put(`http://localhost:5000/api/movies/${params.id}`, {

            id: Number(formInput.id),
            title: formInput.title,
            director: formInput.director,
            metascore: Number(formInput.metascore),
            stars: formInput.stars.split(',')

        })
        .then(response => {
            
            console.log(response)
        
            getMovieList()

            history.push(`/movies/${params.id}`);

        })
        .catch(error => console.log(error))

    }

    return (

        <form className='update-form' onSubmit={updateMovie}>

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

    );
}

export default UpdateForm;