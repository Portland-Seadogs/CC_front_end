
import axios from 'axios';
import { useState, useEffect } from 'react';

  
export default function Catalog() {

    const [data, setData] = useState([])

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://catalogmicroservice-env.eba-twmfudba.us-east-2.elasticbeanstalk.com/api/catalog')
            .then(response => setData(response.data));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
      <>
        {data &&        
    
            data.map((i) => (
                <div key={i.item_id}>
                    {i.title}
                </div>
            )
            )}
  
      </>
    );
  }
  