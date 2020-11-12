import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import "./styles.css";
import transactionData from "./data.json";
import UserTable from "./UserTable";
import { calculateRewards } from "./utils";
import UserTransactionTable from "./UserTransactionTable";
import DateRangePicker from "./DateRangePicker";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  root: {
    textAlign: "center"
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
	flexDirection:"column"
  },
  dateRoot:{
	display: "flex",
	alignItems: "center",
	flexWrap: "wrap"
  },
  dateTitle:{
	  paddingRight:'10px',
  },
  rewardButton:{
	  marginTop:'15px'
  }
}));
export default function App() {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = React.useState(false);  
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [showDetails,setDetails]=React.useState(false);
  const handleChange = (event) => {
    setSelectedUser(event.target.value);
	setDetails(false);
	setStartDate(null);
	setEndDate(null);
  };
  const getUserNames = () => {
    const allUsers = transactionData.map((tData) => tData.name);
    return [...new Set(allUsers)];
  };
  const handleStartDateChange= (date) => { 
	 setDetails(false);
      setStartDate((new Date(date)));
      setEndDate( (new Date(new Date(date).getTime() + 1000 * 60 * 60 * 24 * 90)));
}
const handleClear=()=>{
  setDetails(false);setSelectedUser("");setStartDate(null);setEndDate(null);
}
  return (
    <div className={classes.root}>
      <h1>Customer Rewards Calculator</h1>
      <div className={classes.content}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-user">Select User</InputLabel>
          <Select
            native
            value={selectedUser}
            onChange={handleChange}
            inputProps={{
              name: "user",
              id: "select-user"
            }}
          >
            <option aria-label="None" value="" />
            {getUserNames().map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </Select>
        </FormControl>    
 <DateRangePicker classes={classes} startDate={startDate} endDate={endDate} handleStartDateChange={handleStartDateChange} />	
 <div>
 <Button variant="contained" disabled={!(startDate && selectedUser)} onClick={()=>{setDetails(true)}} className={classes.rewardButton}  color="primary">GET USER REWARD
        </Button>  <Button variant="contained" disabled={!(startDate || selectedUser)} onClick={handleClear} className={classes.rewardButton}  color="primary">CLEAR
        </Button> </div>
          
      </div>
	 
       
      {showDetails && (
        <div>
	  <h5> {`User Rewards of ${selectedUser} from ${startDate.toDateString()} to ${endDate.toDateString()}`} </h5>
          <UserTable		  
            headers={[
              { custid: "Customer ID" },
              { name: "Name" },
              { rewards: "Reward Points" }
            ]}
            rows={calculateRewards(selectedUser,startDate,endDate)}
          />
          <UserTransactionTable selectedUser={selectedUser} />
        </div>
      )}
    </div>
  );
}
