import UserModule from "./user/userapp";
import InboxModule from "./inbox/myinbox";

function App() {
  if(localStorage.getItem("id") == null)
  {
    return (<UserModule/>);
  }
  else
  {
    return(<InboxModule/>);
  }
}

export default App;
