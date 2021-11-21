    import React, {useState} from "react"

const initInputs = {
    title:"",
    description:"",
    imgUrl:""
}

export default function PostForm(props){

    const [inputs, setInputs] = useState(initInputs)
    const { addUserIssue } = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addUserIssue(inputs)
        setInputs(initInputs)
    }

    const {title, description, imgUrl} = inputs

    return(
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
            <button>Post Issue</button>
        </form>
    )
}