import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/catalog.scss";
import "../styles/standard.scss";

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
    axios
      .get(
        "http://catalogmicroservice-env.eba-twmfudba.us-east-2.elasticbeanstalk.com/api/catalog"
      )
      .then((response) => setData(response.data));
  }, []);

  function deleteData(id) {
    axios
      .delete(
        "http://catalogmicroservice-env.eba-twmfudba.us-east-2.elasticbeanstalk.com/api/catalog/" +
          id
      )
      .then((response) => console.log(response));
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

  function sendData() {
    const data = {
      artist: artist,
      title: title,
      description: description,
      width: width,
      height: height,
      price: price,
    };

    console.log(data);
    axios
      .post(
        "http://catalogmicroservice-env.eba-twmfudba.us-east-2.elasticbeanstalk.com/api/catalog",
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
          ))}
      </div>
    </>
  );
}
