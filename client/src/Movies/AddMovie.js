import React from 'react';

function AddMovie(props) {
    return (
        <form>

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

            <button>Submit</button>

        </form>
    );
}

export default AddMovie;