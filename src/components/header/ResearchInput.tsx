import * as React from "react";
import Button from "@mui/material/Button";

import InputBase from "@mui/material/InputBase";
import {useState} from "react";
import {useNavigate} from "react-router";

const ResearchInput= () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setQuery(event.target.value);
    }


    return (
        <>
            <InputBase value={query} onChange={handleQueryChange} sx={{ ml: 1, flex: 1, width : '250px', border : '1px' ,  }} placeholder="Search" inputProps={{ 'aria-label': 'search'}}>
            </InputBase>
            <Button onClick={() => navigate(`search/${query}`)}> search</Button>


        </>
    );
};

export default ResearchInput;
