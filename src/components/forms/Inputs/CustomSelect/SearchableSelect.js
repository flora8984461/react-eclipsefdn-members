import React, { useState } from "react";

const SearchableSelect = ({options, value}) => {

    // const [userInput, setUserInput] = useState("")
    const [filteredOptions, setFilteredOptions] = useState(options)

    const onInputChange = (e) => {
    //    setUserInput(e.currentTarget.value);
       var temp_filteredOptions = options.filter((option) => option.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()));
       setFilteredOptions(temp_filteredOptions);
    }

    return (

        <select value={value} onInput={onInputChange} className="form-control">

            {
                filteredOptions.map((item, index)=>(
                    <option key={index} value={item.value}>
                        {item.name}
                    </option>
                ))
            }

        </select>

    )
}

export default SearchableSelect