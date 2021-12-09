import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/catalog.scss";
import "../styles/standard.scss";
import { Link } from "react-router-dom";

export default function Catalog() {
  const [data, setData] = useState([]);

  const [dataEditing, setDataEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [price, setPrice] = useState("");

  

  useEffect(() => {
    const accessToken = sessionStorage.getItem('token')
    const requestOptions = {    
      // method: "GET",  
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    console.log(accessToken)

    axios.get("https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/catalog", requestOptions)

      .then((response) => 
      {
      console.log(response)
      setData(response.data)
      
      });
  }, []);

  function deleteData(id) {
    const accessToken = sessionStorage.getItem('token')
    const requestOptions = {    
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    axios
      .delete(
        "https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/catalog/" +
          id, requestOptions
      )
      .then((response) => console.log(response));
  }

  function editData(id) {
    const body = {
      title: editingText,
    };
    const accessToken = sessionStorage.getItem('token')
    const requestOptions = {    
      headers: { Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json' },
    };


    axios
      .post(
        "https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/catalog/" +
          id,
        body,
        requestOptions
      )
      .then((response) => console.log(response));
  }

  function sendData() {
    const data = {
      artist: artist,
      title: title,
      description: description,
      width: parseInt(width),
      height: parseInt(height),
      price: parseInt(price),
    };

    const accessToken = sessionStorage.getItem('token')
    const requestOptions = {    
      headers: { Authorization: `Bearer ${accessToken}` ,
                'Content-Type': 'application/json'},
    };
    axios
      .post(
        "https://ecvai6hn0l.execute-api.us-east-2.amazonaws.com/production/catalog", data, requestOptions)
      .then((response) => console.log(response))
      .catch((e) => {
        console.log(e);
      });
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
        <h1>CATALOG</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          autoComplete="off"
        >
          <input
            value={artist}
            placeholder="name"
            onChange={(n) => {
              setArtist(n.target.value);
            }}
          ></input>
          <input
            value={title}
            placeholder="title"
            onChange={(n) => {
              setTitle(n.target.value);
            }}
          ></input>

          <input
            value={description}
            placeholder="description"
            onChange={(n) => {
              setDescription(n.target.value);
            }}
          ></input>

          <input
            value={width}
            placeholder="width"
            onChange={(n) => {
              setWidth(n.target.value);
            }}
          ></input>

          <input
            value={height}
            placeholder="height"
            onChange={(n) => {
              setHeight(n.target.value);
            }}
          ></input>

          <input
            value={price}
            placeholder="price"
            onChange={(n) => {
              setPrice(n.target.value);
            }}
          ></input>

          <div>
            <button
              onClick={() => {
                sendData();
              }}
            >
              Add to Collection
            </button>
          </div>
        </form>

        {data &&
          data.map((i) => (
            <div className="data_item" key={i.item_id}>
            <div className='img-container'>
              <img className="cat-images" src={'https://cloud-computing-images-2.s3.us-east-2.amazonaws.com/' + i.img_url +'.jpg'} alt={i.img_url} />
              </div>
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
                    Edit Title
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
          ))}
      </div>
    </>
  );
}
