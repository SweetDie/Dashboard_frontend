import React, { useEffect } from "react";
import { DataGrid, GridRowId, GridColumns, GridRenderCellParams, GridActionsCellItem } from '@mui/x-data-grid';
import Loader from "../../components/loader";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import { Link } from "react-router-dom";

const Users: React.FC<any> = () => {
  const { GetAllUsers, DeleteUser, LockUser } = useActions();
  const { loading, allUsers } = useTypedSelector((state) => state.UserReducer);

  const LockUserAction = React.useCallback(
    (id: GridRowId) => async () => { 
      await LockUser(id.toString());
      await GetAllUsers();
    },
    [],
  );

  const DeleteUserAction = React.useCallback(
    (id: GridRowId) => async () => {
      await DeleteUser(id.toString());
      await GetAllUsers();
    },
    [],
  );

  const columns = React.useMemo<GridColumns>(() => [
    { field: "name", headerName: "Name", width: 170 },
    { field: "surname", headerName: "Surname", width: 170 },
    { field: "phoneNumber", headerName: "Phone number", width: 170 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "emailConfirmed", headerName: "Confirmed email", width: 130 },
    { field: "role", headerName: "Role", width: 130 },

    {
      field: "buttons", type: "actions", width: 50, renderCell: (params: GridRenderCellParams) => (
        <>
          <Link to={`../edit/${params.id}`} style={{ textDecoration: 'none', color: '#2196f3' }}>
            <EditIcon />
          </Link>
        </>
      )
    },
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<BlockIcon style={{ color: params.row.lockoutEnabled ? "green" : "red" }} />}
          label={ params.row.lockoutEnabled ? "Unblock user" : "Block user" }
          onClick={LockUserAction(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete user"
          onClick={DeleteUserAction(params.id)}
          showInMenu
        />,
      ],
    },
  ], []);

  useEffect(() => {
    GetAllUsers();
  }, []);

  let rows: any[] = allUsers;

  if (loading) {
    return <Loader />;
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        checkboxSelection
      />
    </div>
  );
};

export default Users;
