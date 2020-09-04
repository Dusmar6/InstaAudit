import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
    padding: theme.spacing(4, 1, 0)
  },
}));

export default function ToggleSwitch() {
  const classes = useStyles();
  const [hidden, setHidden] = React.useState(false);

  const handleHiddenChange = (event) => {
    setHidden(event.target.checked);
  };

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={<Switch checked={hidden} onChange={handleHiddenChange} color="primary" />}
        label="Remember Me"
      />
    </div>
  );
}