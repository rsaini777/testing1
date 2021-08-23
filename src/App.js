import './App.css';
import React ,{useState} from "react";
import axios from "axios";

function App() {
  const [img,setImg]=useState();



  const [fileInputState, setFileInputState] = useState("");
  
  const onSelectFile = async (e) => {
    const file = e.target.files[0];
    setFileInputState(e.target.value);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImg(reader.result));
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit=()=>{
    // fetch("http://localhost:4500/api/upload", {
    //   method: "POST",
    //   body: JSON.stringify({ data: img }),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((result) => console.log(result.json()))
    //   .then((data) => {
    //     console.log(data)
    //     return data;
    //   });
      axios({
        method:"POST",
        url:"http://localhost:4500/api/upload",
        body: JSON.stringify({ data: img }),
      }).then(result=>{
        console.log(result);
      })
      .catch(err=>{
        console.log(err);
      })
  };
  return (
    <div className="App">
      <input type="file" value={fileInputState} onChange={onSelectFile}></input>
      <div className="image">
        <img src={img} alt=""></img>
      </div>
      <button onClick={handleSubmit}>upload</button>
      
    </div>
  );
}

export default App;
