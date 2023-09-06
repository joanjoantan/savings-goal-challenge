import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Transaction } from "../../types/index";

type Props = {
  transactions: Transaction[];
};

const BasicTable = ({ transactions }: Props) => {
  const data = transactions;

  if (!data.length) {
    return <p>No entries found</p>;
  }
  return (
    <>
      {data.length ? (
        <TableContainer component={Paper} sx={{ width: 500 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Reference</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(
                (trans: {
                  feedItemUid: string;
                  transactionTime: moment.MomentInput;
                  reference: string;
                  amount: { minorUnits: number };
                }) => {
                  return (
                    <TableRow
                      key={trans.feedItemUid}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {moment(trans.transactionTime).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      </TableCell>
                      <TableCell>{trans.reference}</TableCell>
                      <TableCell align="right">
                        £{(trans.amount.minorUnits / 100).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </>
  );
};

export default BasicTable;
