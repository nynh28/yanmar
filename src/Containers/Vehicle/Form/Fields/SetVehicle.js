import React, { useState, memo } from "react";
import AsyncSelect from "react-select/async";
import { Col, Row, Button, ButtonGroup, Table as TableAS } from 'reactstrap'


const SetVehicle = () => {
    const [inputValue, setValue] = useState("");
    const [selectedValue, setSelectedValue] = useState(null);

    // handle input change event
    const handleInputChange = (value) => setValue(value);


    // handle selection
    const handleChange = (value) => setSelectedValue(value);


    // load options using API call
    const loadOptions = (inputValue) => fetch('http://jsonplaceholder.typicode.com/posts?userId=' + inputValue).then((res) => res.json());

    return (
        <div>
            <AsyncSelect
                cacheOptions
                defaultOptions
                value={selectedValue}
                getOptionLabel={(e) => e.title}
                getOptionValue={(e) => e.id}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
                onChange={handleChange}
            />
            {/* <h1>{JSON.stringify(selectedValue || {}, null, 2)}</h1> */}
        </div>
    );
}

export default memo(SetVehicle);
