import { useEffect, useState } from 'react'
import './Todos.css'
function Todos() {
    const [userInput, setUserInput] = useState('')
    const [todos, setTodos] = useState([])
    const [editFlag, setEditFlag] = useState(false)
    const [editItemIndex, setEditItemIndex] = useState(0)
    const [completedCount, setCompletedCount] = useState(0)

    console.log(userInput);
    console.log(todos);
    useEffect(()=>{
        let items=JSON.parse(localStorage.getItem('todos'))
        console.log(items);
        items ? setTodos([...items]) : setTodos([])
    },[])
    //  Alt + down / up =to change the position of a statement to down / up
    // shift + Alt + down = to copy a statement and paste it to bottom line
    // ctrl + Alt + down/up = to change the content simultaneously
    // ctrl + Alt + right arrow = switch to split screen

    const handleAdd = () => {
        setTodos([...todos, { userInput: userInput, completed: false }])
        setUserInput('')
        localStorage.setItem('todos',JSON.stringify([...todos, { userInput: userInput, completed: false }]))
    }

    const handleCompleted = (index) => {

        let obj = todos
        obj[index].completed = !obj[index].completed
        setTodos([...obj])
        localStorage.setItem('todos',JSON.stringify([...obj]))
        console.log(obj[index]);
        obj[index].completed === true ? setCompletedCount(completedCount + 1) : setCompletedCount(completedCount - 1)
    }
    const handleUpdate = () => {
        let obj = todos
        let index = editItemIndex
        console.log("index ", index);
        obj[editItemIndex].userInput = userInput
        setTodos([...obj])
        localStorage.setItem('todos',JSON.stringify([...obj]))
        console.log(obj[editItemIndex]);
        setEditFlag(false)
        setUserInput('')

    }
    const handleEditMode = (index) => {

        setEditItemIndex(index)
        setEditFlag(true)
        setUserInput(todos[index].userInput)
    }

    const handleDelete = (index) => {
        let obj = todos
        obj[index].completed === true && setCompletedCount(completedCount - 1)
        obj.splice(index, 1)
        setTodos([...obj])
        localStorage.setItem('todos',JSON.stringify([...obj]))
        setEditFlag(false)
        setUserInput('')
        
    }


    return (

        <div className='container'>
            <div className="todosContainer">
                <h1 className='todoHeading'>Todolist {todos.length > 0 && <span >( {todos.length} )</span>}</h1>
                <div className="inputBox">
                    <input value={userInput} type="text" placeholder='Type here!' className='inputField' onChange={(e) => setUserInput(e.target.value)} />
                    {!editFlag ? <button className={`addBtn ${userInput.length>0 && 'buttonPopupNow'} `} onClick={handleAdd} disabled={!userInput}  >Add</button> : <button className={`addBtn ${userInput.length>0 && 'buttonPopupNow'} `} onClick={handleUpdate}>Update</button>}
                </div>
                {
                    todos.map((obj, index) => (

                        <div  className={`todoBox `} key={index}>
                            <div>
                                <input type="checkbox" id={index} className='checkBox' checked={obj.completed} onChange={() => { handleCompleted(index) }} />
                                {/* checked attribute is used to change the tick mark according to user click */}
                                <label className='todoText' htmlFor={index} > {obj.completed === true ? <span style={{ textDecoration: 'line-through' }} > {obj.userInput}</span> : <span>{obj.userInput}</span>}</label>
                            </div>
                            <div>
                                <span className="material-symbols-outlined editIcon" onClick={() => handleEditMode(index)}>edit</span>
                                <span className="material-symbols-outlined closeIcon" onClick={() => handleDelete(index)}>Delete</span>
                            </div>
                        </div>

                    ))
                }

                {
                    todos.length > 0 &&
                    <div className="taskDone" style={{ display: 'flex' }}>
                        <h4>{completedCount} of {todos.length}  </h4> <span style={{ paddingLeft: '5px' }}>task completed</span>
                    </div>
                }
            </div>

        </div>
    )
}
export default Todos