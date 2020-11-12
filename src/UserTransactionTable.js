import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import UserTable from "./UserTable";
import { getUserTransaction, getRewards } from "./utils";

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  title: {
    paddingRight: "10px"
  }
});

const userRewards=(selectedUser)=>{
let data=getUserTransaction(selectedUser);
data.forEach(item=>{
	item['reward']=getRewards(item.amt);
	item['transactionDt']=new Date(item['transactionDt']).toDateString();
})
return data;
}

const UserTransactionDetails = ({ selectedUser }) => {
  const classes = useStyles();
  const [viewDetails, setViewDetails] = React.useState(false);

  React.useEffect(() => {
    setViewDetails(false);
  }, [selectedUser]);
  const handleChange = (event) => {
    setViewDetails(event.target.checked);
  };
  return (
    <>
      <div className={classes.root}>
        <FormControlLabel
          control={
            <Switch
              checked={viewDetails}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />
          }
          label={`View All Transcation Details of ${selectedUser}`}
        />
      </div>
      {viewDetails && (
        <UserTable
          headers={[{ transactionDt: "Transaction Date" }, { amt: "Amount" },{reward:'Rewards'}]}
          rows={userRewards(selectedUser)}
        />
      )}
    </>
  );
};

export default UserTransactionDetails;
