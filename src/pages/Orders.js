
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../styles/orders.scss";
import { Link } from 'react-router-dom';

  
export default function Orders() {

    const [data, setData] = useState([])

    const [customerId, setCustomerId] = useState("")   
    
    function getData() {
      const accessToken = sessionStorage.getItem('token')
      const requestOptions = {    
        // method: "GET",  
        headers: { Authorization: `Bearer ${accessToken}`,

         }}   
      axios.get(
        'https://d1ie9whvahf6ct.cloudfront.net/production/orders', requestOptions
        // "https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/orders", requestOptions
        )
          .then(response => setData(response.data.result.orders));
          // .then(response => console.log(response.data.result))

    }

    useEffect(() => {
        // GET request using axios inside useEffect React hook
      getData();
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    function deleteData(id) {
      const accessToken = sessionStorage.getItem('token')
      const requestOptions = {             
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      
      axios
        .delete(
          "https://d1ie9whvahf6ct.cloudfront.net/production/orders/" + id, requestOptions
          // "https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/orders/" + id, requestOptions
        )
        .then((response) => console.log(response))
        .then(getData());

      
    }

    function sendData() {
      const data = {
        customer_id: customerId,        
      };
      
      const accessToken = sessionStorage.getItem('token')
      const requestOptions = {    
        // method: "GET",  
        headers: { Authorization: `Bearer ${accessToken}` },
        'Content-Type': 'application/json'
      };
  
      
      axios
        .post(
          "https://d1ie9whvahf6ct.cloudfront.net/production/orders",
          // "https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/orders/",
          data,
          requestOptions
        )
        .then((response) => console.log(response))
        .then(getData());
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
        <div className="order">
                  <div className="orderDetails">
                  <div>Order Id</div>
                  <div>Customer Id</div>
                  <div>Date Placed</div>
                  </div>
            </div>
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
  