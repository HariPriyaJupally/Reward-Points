import React from "react";
import Grid from '@material-ui/core/Grid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const RewardDateRangePicker = (props) => {
  const {classes,startDate,handleStartDateChange}=props;
  return <Grid  className={classes.dateRoot} >  
  <h4 className={classes.dateTitle}>Select start date for a three month transaction period</h4>
   <DatePicker fixedHeight  selected={startDate} onChange={date => handleStartDateChange(date)} />
  </Grid>
};

export default RewardDateRangePicker;
