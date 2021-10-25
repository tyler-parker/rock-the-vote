import React, { useState } from 'react'

const initInputs = {
    comment: ""
}

export default function CommentForm(props) {

    const { _id, submitComment} = props
    
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(e) {
        const { name, value } = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    const { comment } = inputs

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                submitComment(inputs, _id)
                console.log(inputs)
            }}>
                <input
                    type="text"
                    name="comment"
                    value={comment}
                    onChange={handleChange}
                    placeholder="comment"
                />
                <button>Add Comment</button>
            </form>
        </div>
    )
}