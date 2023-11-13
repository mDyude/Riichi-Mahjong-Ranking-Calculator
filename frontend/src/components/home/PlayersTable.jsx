import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { OpenInNew, Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material";
import { styled } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
const PlayersTable = ({ players }) => {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 470 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow>
            <StyledTableCell>Ranking</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="right">Played</StyledTableCell>
              <StyledTableCell align="right">Avg Score</StyledTableCell>
              <StyledTableCell align="right">Total Pts</StyledTableCell>
              <StyledTableCell align="right">Operations</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {players.map((player, index) => (
              <StyledTableRow
                key={player._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {player.rank}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {player.name}
                  <Link to={`/players/${player._id}`}>
                    <IconButton>
                      <OpenInNew sx={{ fontSize: 15}} />
                    </IconButton>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">{player.gamesPlayed}</StyledTableCell>
                <StyledTableCell align="right">{Math.round(player.avgScore)}</StyledTableCell>
                <StyledTableCell align="right">{Math.round(player.totalScore * 10) / 10}</StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/players/edit/${player._id}`}>
                    <IconButton aria-label="edit">
                      <Edit />
                    </IconButton>
                  </Link>
                  <Link to={`/players/delete/${player._id}`}>
                    <IconButton aria-label="delete">
                      <Delete />
                    </IconButton>
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};
//     <table className="w-full border-separate border-spacing-2">
//     <thead>
//       <tr>
//         <th className="border border-slate-600 rounded-lg text-center">
//           Ranking
//         </th>
//         <th className="border border-slate-600 rounded-lg text-center">
//           Name
//         </th>
//         <th className="border border-slate-600 rounded-lg text-center">
//           Played
//         </th>
//         <th className="border border-slate-600 rounded-lg text-center">
//           Score
//         </th>
//         <th className="border border-slate-600 rounded-lg text-center">
//           Operations
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//       {players.map((player, index) => (
//         <tr key={player._id} className="h-8">
//           <td className="border border-slate-700 rounded-lg text-center">
//             {player.rank}
//           </td>
//           <td className="border border-slate-700 rounded-lg text-center">
//             <Link to={`/players/${player._id}`}>{player.name}</Link>
//           </td>
//           <td className="border border-slate-700 rounded-lg text-center">
//             {player.gamesPlayed}
//           </td>
//           <td className="border border-slate-700 rounded-lg text-center">
//             {player.totalScore}
//           </td>
//           <td className="border border-slate-700 rounded-lg text-center">
//             <div className="flex justify-center gap-x-4">
//               {/* <Link to={`/players/${player.name}`}>
//                 <BsInfoCircle className="text-2xl text-green-800" />
//               </Link> */}
//               <Link to={`/players/edit/${player._id}`}>
//                 <AiOutlineEdit className="text-2xl text-yellow-600" />
//               </Link>
//               <Link to={`/players/delete/${player._id}`}>
//                 <MdOutlineDelete className="text-2xl text-red-600" />
//               </Link>
//             </div>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>

export default PlayersTable;
