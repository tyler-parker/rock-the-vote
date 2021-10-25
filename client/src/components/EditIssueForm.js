import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider.js"

export default function EditForm(props) {

    const initInputs = {
        title: props.title || "",
        description: props.description || "",
    }
    const [inputs, setInputs] = useState(initInputs)
    const { editUserIssue } = useContext(UserContext)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))

    }

    function handleSubmit(e) {
        e.preventDefault()
        editUserIssue(inputs, props._id)
        props.setEditToggle(prevState => !prevState)
    }


    const { title, description, imgUrl } = inputs

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="title"
            />
            <input
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="text"
                name="imgUrl"
                value={imgUrl}
                onChange={handleChange}
                placeholder="Supporting Image" />
            <button>Submit Edit</button>
        </form>
    )
}