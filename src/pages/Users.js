
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/users.scss";


  
export default function Orders() {

    const [data, setData] = useState([])

    const [nameLast, setNameLast] = useState("")    
    const [nameFirst, setNameFirst] = useState("")
    const [email, setEmail] = useState("")

    const [dataEditing, setDataEditing] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
      const accessToken = sessionStorage.getItem('token')
      const requestOptions = {    
        // method: "GET",  
        headers: { Authorization: `Bearer ${accessToken}` },
      };      
        // GET request using axios inside useEffect React hook
        axios.get("http://192.168.1.24:8080/api/users", requestOptions)
        // axios.get("https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/users", requestOptions)
            .then(response => setData(response.data));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    function deleteData(id) {
      const accessToken = sessionStorage.getItem('token')
      const requestOptions = {    
        // method: "GET",  
        headers: { Authorization: `Bearer ${accessToken}` },
      };     
      axios
        .delete(
          axios.delete(
            // "https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/users/" + id, 
            "http://192.168.1.24:8080/api/users/" + id, 
            requestOptions
        ))
        .then((response) => console.log(response.headers));
    }
    
    function editData(id) {
      const accessToken = sessionStorage.getItem('token')
      const requestOptions = {    
        // method: "GET",  
        headers: { Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json' },
      };     
      const body = {
        email: editingText,
      };
  
      axios
        .put(
          // "https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/users/" + id
          "http://192.168.1.24:8080/api/users/" + id,             
          body,
          requestOptions
        )
        .then((response) => console.log(response));
    }

    function sendData() {
      const data = {
        nameLast: nameLast,
        nameFirst: nameFirst,
        email: email
      };
      const accessToken = sessionStorage.getItem('token')
      const requestOptions = {    
        // method: "GET",  
        headers: { Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json' },
      };   
  
      axios
        .post(
          // "https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/users",
          "http://192.168.1.24:8080/api/users",
          data,
          requestOptions
        )
        .then((response) => console.log(response));
    }


    return (
      <>
      <div className="page_container">

      <div className="menu">
        <Link to="/Orders">Orders</Link>
        <Link to="/Users">Users</Link>
        <Link to="/Catalog">Catalog</Link>
        <Link to="/login">Logout</Link>
      </div>
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
  