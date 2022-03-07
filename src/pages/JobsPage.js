import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getJobs} from '../features/JobsSlice';
import JSONPretty from 'react-json-pretty';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {statusStructs, actionStructs} from '../config';
import '../assets/json-theme.css';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const TerraformDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>{props.for}</Button>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={'xl'}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>{`Terraform ${props.for}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`output-dialog-${props.for}`}>
            {props.data ? <JSONPretty className="json-text" data={props.data} themeClassName="json-theme"></JSONPretty> : `No ${props.for}.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default function JobsPage() {
  const dispatch = useDispatch();
  const {jobs} = useSelector((state) => state.jobs);
  const {search} = useSelector((state) => state.search);


  let filteredJobs = _(jobs).toPairs().sortBy(0).fromPairs().value();
  const listJobs = _.find(filteredJobs, (o) => {
    return o.ID == search;
  });
  if (listJobs) {
    filteredJobs = {0: listJobs};
  }

  useEffect(() => {
    dispatch(
        getJobs(),
    );

    const interval = 5000; // 5s
    const id = setInterval(() => {
      dispatch(
          getJobs(),
      );
    }, interval);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="WorkspacesPage">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job UUIDs</TableCell>
              <TableCell align={'right'}>Action</TableCell>
              <TableCell align={'right'}>Status</TableCell>
              <TableCell align={'right'}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(filteredJobs).map(([_, job]) => (
              <TableRow
                key={job.ID}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell
                  component="th"
                  scope="row"
                >
                  {job.ID}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align={'right'}
                >
                  {actionStructs[job.Action]}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align={'right'}
                >
                  {statusStructs[job.Status]}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  align={'right'}
                >
                  {job.Status != 0 ?
                      <ButtonGroup
                        size="small"
                        variant="outlined">
                        {job.Action == 1 && job.Status != 3 ? <TerraformDialog data={job.Response.Output} for="Output" />: ''}
                        <TerraformDialog data={job.Response.Result} for="Result" />
                        <TerraformDialog data={job.Response.Errors} for="Errors" />
                      </ButtonGroup> : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

TerraformDialog.propTypes = {
  for: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
