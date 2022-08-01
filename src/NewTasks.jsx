import React , {forwardRef} from 'react'
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import data from "./assets/data"
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Loading from "./components/Loading";
import MaterialTable, { MTableToolbar} from 'material-table';


import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

  const theme = createTheme({
 
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#ff9100',
      },
    },
   direction: 'rtl',
  });

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

function NewTasks() {
  const [isLoading, setIsLoading]  = React.useState(false);
  const [assignReq, setassignReq] = React.useState([])
  const [availTask, setavailTask] = React.useState([])
  const [user, setUser] = React.useState( localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("token"))
  :{});
  const role = user?user.role: null;
  const [token, setToken] = React.useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  const [tdata, settdata] = React.useState("")
  const [isCopied, setisCopied] = React.useState(false);
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }
  const columns = [
    { title: "Firestore Id", field: "firestoreID", hidden: true },
    {
      title: "Name",
      field: "taskName",
      render: (rowData) => (
        <div style={{ maxHeight: 200, minWidth: 200, overflow: "auto" }}>
        {" "}
        {rowData.taskName}{" "}
      </div>
      ),
    },
    { title: "Requested Value", field: "requestValue", },
    { title: "Request type", field: "requestType",},
    { title: "Submission Deadline", field: "taskDeadline",
    render: (rowData) => {
      let date = new Date(rowData.taskDeadline);
      let str = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} `;

      return <div>{str}</div>;
    }, },
    // { title: "Remaining Days", field: "firestoreID",  },
    { title: "Task Status", field: "taskStatus",  },
    { title:  "Other preferences", field: "otherPreferences", },
    { title: "Content tone", field: "contentTone", },
    {
      title: "Description",
      field: "taskDescription",
      export: false,
      render: (rowData) => (
        <div style={{ maxHeight: "200px", maxWidth: "150px", overflow: "auto" }}>
          {" "}
          {rowData.taskDescription}{" "}
        </div>
      ),
    },
    { title: "Domain", field: "taskDomain", },
    { title: "Type of task", field: "taskType", },
    
    { title: "Link to task", field: "taskGoogleDocLink", 
    render: (rowData) => (
      <>
        {" "}
        <div style={{ maxHeight: 100, minWidth: 200, overflow: "auto" }}>
          <textarea name="docLink" id="doclink" cols="30" rows="10" disabled>
          {rowData.taskGoogleDocLink}
          </textarea>
        
        </div>
      
         
        <div>
          <button
            id="copy"
            variant="outlined"
            onClick={() => {
              // Asynchronously call copyTextToClipboard
              let copyText = rowData.taskGoogleDocLink;
              copyTextToClipboard(copyText)
                .then(() => {
                  // If successful, update the isCopied state value
                  setisCopied(true);
                  setTimeout(() => {
                    setisCopied(false);
                  }, 1500);
                  let button1 = document.querySelector("#copy");
                  button1.color = "success";
                  button1.value = "Copied!";
                  console.log("copied", button1);
                })
                .catch((err) => {
                  console.log(err);
                  let button = document.querySelector("#copy");
                  button.color = "error";
                  button.value = "Try again!";
                });
            }}
          >
            <span>{isCopied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </>
    ),
  },
    
  ];

  const getUserInfo = async()=>{
    setIsLoading(true);
    let idToken = await data.getIdToken();
    if(!idToken){
     idToken=token;
   }
   try {
    
     let config = {
       headers: {
         Authorization: `Bearer ${idToken}`,
       },
     };
     const response = await data.axios.get(
       `${data.BASE_URL}/userTaskActions?isMyTask=false`,
     
       config
     );
 
     const resp = response.data;
    //  settdata(resp);
    setassignReq(resp.assignRequests);
    setavailTask(resp.availableTasks);

     console.log(`info`, resp);
 
     setIsLoading(false);
     return resp;
    
   } catch (errors) {
     console.error(errors);
     alert(errors.response.data);
     setIsLoading(false);
   }
 
   }
 
   React.useEffect(() => {
    getUserInfo();
   }, [])
  

  return (
    isLoading?(  <div>
      <Navbar/>
      <div className="app__wrapper">
      <Loading/>
    
    
      </div>
    
    
     <Footer/>
      </div>):(
   <div>
      <Navbar/>

      <div className="app__wrapper"> 


      <h1> Currently available tasks</h1> 

     <p>
      Please select which tasks are to be displayed :
      <select 
      onChange={(e)=>{
        settdata(e.target.value);
      }}>
        <option>Available Tasks</option>
        <option>Assigned requests</option>
      </select>
     </p>
    <div >
    {
      tdata==="Available Tasks"?(
        <MaterialTable
        title=" All available tasks for you"
        columns={columns}
        data={availTask}        
        // actions={[
        //   {
        //     icon: 'save',
        //     tooltip: 'Save User',
        //     onClick: (event, rowData) => alert("You saved ")
        //   }
        // ]}
      />
      ):(  <MaterialTable
        title="Assign request, please accept or reject"
        columns={columns}
        data={assignReq}        
        // actions={[
        //   {
        //     icon: 'save',
        //     tooltip: 'Save User',
        //     onClick: (event, rowData) => alert("You saved ")
        //   }
        // ]}
      />)
    }
    
          </div>
      
      </div>
      <Footer/>
      </div>)
  )
}

export default NewTasks