
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../styles/orders.scss";
import { Link } from 'react-router-dom';

  
export default function Orders() {

    const [data, setData] = useState([])

    const [customerId, setCustomerId] = useState("")    
    const [time, setTime] = useState("")

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        const accessToken = sessionStorage.getItem('token')
        const requestOptions = {    
          // method: "GET",  
          headers: { Authorization: `Bearer ${accessToken}` },
        };
        console.log(accessToken);
        axios.get('https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/api/orders', requestOptions)
            .then(response => setData(response.data.result));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    function deleteData(id) {
      axios
        .delete(
          "https://dqpx4c28vfers.cloudfront.net/api/orders/" + id
        )
        .then((response) => console.log(response));
    }

    function sendData() {
      const data = {
        customer_id: customerId,
        datetime_placed: time,
      };
  
      console.log(data);
      axios
        .post(
          "https://dqpx4c28vfers.cloudfront.net/api/orders",
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
      <div className="menu">
        <Link to="/Orders">Orders</Link>
        <Link to="/Users">Users</Link>
        <Link to="/Catalog">Catalog</Link>
        <Link to="/login">Logout</Link>
      </div>
      <h1>ORDERS</h1>


      <form
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
                    <input
            value={time}
            placeholder="time"
            onChange={(n) => {
              setTime(n.target.value);
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
        </form>

        {data &&        
    
            data.map((i) => (
                <div className="order" key={i.order_id}>
                  <div className="orderDetails">
                  <div>{i.order_id}</div>
                  <div>{i.customer_id}</div>
                  <div>{i.datetime_placed}</div>
                  </div>

                  <button
                    onClick={() => {
                      deleteData(i.order_id);
                    }}
                  >
                    Delete
                  </button>

                </div>
            )
            )}
            </div>
      </>
    );
  }
  