
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../styles/users.scss";

  
export default function Orders() {

    const [data, setData] = useState([])

    const [nameLast, setNameLast] = useState("")    
    const [nameFirst, setNameFirst] = useState("")
    const [email, setEmail] = useState("")

    const [dataEditing, setDataEditing] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://3.144.243.24:5000/users')
            .then(response => setData(response.data));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    function deleteData(id) {
      axios
        .delete(
          "http://3.144.243.24:5000/users/" + id
        )
        .then((response) => console.log(response.headers));
    }
    
    function editData(id) {
      const body = {
        email: editingText,
      };
  
      axios
        .put(
          "http://3.144.243.24:5000/users/" +
            id,
          body,
          {headers: {
            'Content-Type': 'application/json'
          }}
        )
        .then((response) => console.log(response));
    }

    function sendData() {
      const data = {
        nameLast: nameLast,
        nameFirst: nameFirst,
        email: email
      };
  
  
      axios
        .post(
          "http://3.144.243.24:5000/users",
          data,
          {headers: {
            'Content-Type': 'application/json'
          }}
        )
        .then((response) => console.log(response));
    }


    return (
      <>
      <div className="page_container">
      <h1>USERS</h1>


      <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          autoComplete="off"
        >
          <input
            value={nameFirst}
            placeholder="first name"
            onChange={(n) => {
              setNameFirst(n.target.value);
            }}
          >

          </input>          

                    <input
            value={nameLast}
            placeholder="last name"
            onChange={(n) => {
              setNameLast(n.target.value);
            }}
          >
            
          </input>   

                    <input
            value={email}
            placeholder="email"
            onChange={(n) => {
              setEmail(n.target.value);
            }}
          >
            
          </input>         
          <div>
            <button
              onClick={() => {
                sendData();
              }}
            >
              Add User
            </button>
          </div>
        </form>

        {data &&        
    
            data.map((i) => (
                <div className="user" key={i.ID}>
                  <div>
                    {i.nameFirst}
                  </div>
                  <div>
                    {i.nameLast} 
                  </div>


                  {dataEditing === i.ID ? (
                <>
                  <input
                    type="text"
                    placeholder="email"
                    onChange={(e) => setEditingText(e.target.value)}
                    value={editingText}
                  />
                  <button
                    onClick={() => {
                      editData(i.ID);
                      setDataEditing(null);
                      setEditingText("");
                    }}
                  >
                    Submit Edits
                  </button>
                  <button
                    onClick={() => {
                      setDataEditing(null);
                      setEditingText("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                <div>
                   {i.email}
                  </div>
                  <button
                    onClick={() => {
                      setDataEditing(i.ID);
                    }}
                  >
                    Edit Email
                  </button>
                  <button
                    onClick={() => {
                      deleteData(i.ID);
                    }}
                  >
                    Delete
                  </button>
                </>
              )}



                </div>
            )
            )}
            </div>
      </>
    );
  }
  