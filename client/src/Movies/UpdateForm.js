import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';

function UpdateForm({ movieList, setMovieList, getMovieList }) {

    //State

    let params = useParams();

    let [formInput, setFormInput] = useState({

        id: params.id,
        title: '',
        director: '',
        metascore: '',
        newstar: '',
        stars: []

    });

    //Functions

    let getCurrentMovie = () => {

        return movieList.filter(item => Number(item.id) === Number(params.id))[0];

    }

    useEffect(() => {

        let currMovie = getCurrentMovie();

        console.log(currMovie);

        if (currMovie === undefined) {

            setFormInput({

                ...formInput,
                stars: []
    
            });

        } else {

            setFormInput({

                ...formInput,
                stars: currMovie.stars
    
            });

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
            stars: formInput.stars

        })
        .then(response => {
            
            console.log(response)
        
            setMovieList(response.data)

            return <Redirect to={`/movies${params.id}`} />

        })
        .catch(error => console.log(error))

    }

    return (

        <form className='update-form' onSubmit={updateMovie}>

            <label>
                Title
                <input type='text' name='title' onChange={inputChange}></input>
            </label>

            <label>
                Director
                <input type='text' name='director' onChange={inputChange}></input>
            </label>

            <label>
                Metascore
                <input type='text' name='metascore' onChange={inputChange}></input>
            </label>

            <label>
                Add Stars (Optional)
                <input type='text' name='newstar' onChange={inputChange}></input>
            </label>

            <button>Save</button>

        </form>

    );
}

export default UpdateForm;