
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../styles/users.scss";

  
export default function Orders() {

    const [data, setData] = useState([])

    const [customerId, setCustomerId] = useState("")    
    const [time, setTime] = useState("")

    const [dataEditing, setDataEditing] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://3.144.243.24:5000/users')
            .then(response => setData(response.data));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    function deleteData(id) {
      // alert(id);
      axios
        .delete(
          "http://3.144.243.24:5000/users/" + id
        )
        .then((response) => console.log(response.headers));
    }
    
    function editData(id) {
      const body = {
        title: editingText,
      };
  
      axios
        .post(
          "http://catalogmicroservice-env.eba-twmfudba.us-east-2.elasticbeanstalk.com/api/catalog/" +
            id,
          body,
          {headers: {
            'Content-Type': 'application/json'
          }}
        )
        .then((response) => console.log(response));
    }

    // function deleteData(id) {
    //   alert(id);
    //   axios
    //     .delete(
    //       "http://ec2-18-188-184-202.us-east-2.compute.amazonaws.com:5000/api/orders/" + id
    //     )
    //     .then((response) => console.log(response));
    // }

    // function sendData() {
    //   const data = {
    //     customer_id: customerId,
    //     datetime_placed: time,
    //   };
  
    //   console.log(data);
    //   axios
    //     .post(
    //       "http://ec2-18-188-184-202.us-east-2.compute.amazonaws.com:5000/api/orders",
    //       data,
    //       {headers: {
    //         'Content-Type': 'application/json'
    //       }}
    //     )
    //     .then((response) => console.log(response));
    // }


    return (
      <>
      <div className="page_container">
      <h1>USERS AND ADDRESSES</h1>


      {/* <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          autoComplete="off"
        >
          <input
            value={customerId}
            placeholder="customer id"
            onChange={(n) => {
              setCustomerId(n.target.value);
            }}
          ></input>                
          <div>
            <button
              onClick={() => {
                sendData();
              }}
            >
              Add Order
            </button>
          </div>
        </form> */}

        {data &&        
    
            data.map((i) => (
                <div className="user" key={i.ID}>
                  <div>
                    {i.nameFirst}
                  </div>
                  <div>
                    {i.nameLast} 
                  </div>
                  <div>
                   {i.email}
                  </div>

                  <button
                    onClick={() => {
                      deleteData(i.ID);
                    }}
                  >
                    Delete
                  </button>





                  {dataEditing === i.item_id ? (
                <>
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                    value={editingText}
                  />
                  <button
                    onClick={() => {
                      editData(i.item_id);
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
                  <div>{i.title}</div>
                  <button
                    onClick={() => {
                      setDataEditing(i.item_id);
                    }}
                  >
                    Edit To Do
                  </button>
                  <button
                    onClick={() => {
                      deleteData(i.item_id);
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
  