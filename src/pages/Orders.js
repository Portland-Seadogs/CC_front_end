
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../styles/orders.scss";

  
export default function Orders() {

    const [data, setData] = useState([])

    const [customerId, setCustomerId] = useState("")    
    const [time, setTime] = useState("")

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://ec2-18-188-184-202.us-east-2.compute.amazonaws.com:5000/api/orders')
            .then(response => setData(response.data.result));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    function deleteData(id) {
      axios
        .delete(
          "http://ec2-18-188-184-202.us-east-2.compute.amazonaws.com:5000/api/orders/" + id
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
          "http://ec2-18-188-184-202.us-east-2.compute.amazonaws.com:5000/api/orders",
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
  