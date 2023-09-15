import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  severity: AlertColor
  open: boolean
  autoHideDuration: number
  msg: string
  handleClose: () => void
}

//スナックバー
export default function MaterialSnackbar(props: Props) {
  const vertical: SnackbarOrigin["vertical"] = "top";
  const horizontal: SnackbarOrigin["horizontal"] = "center";

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.autoHideDuration}
      anchorOrigin={{ vertical, horizontal }}
      onClose={props.handleClose}
    >
      <Alert onClose={props.handleClose} severity={props.severity} sx={{ width: '100%' }}>
        {props.msg}
      </Alert>
    </Snackbar>
  )
}
