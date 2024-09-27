import { useGetAllAttractionsQuery } from "./services/attraction";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import AttractionCard from "./AttractionCard";
import VisibilityIcon from "@mui/icons-material/visibility";
import { useDispatch } from "react-redux";
import { setAttractionID } from "./features/attraction/attractionSlice";

export default function App() {
  const { data, error, isLoading } = useGetAllAttractionsQuery();
  const dispatch = useDispatch();

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "coverimage",
      headerName: "image",
      width: 100,
      renderCell: (params) => <Avatar src={params.value} />,
    },
    { field: "name", headerName: "name", width: 150 },
    { field: "detail", headerName: "detail", width: 500 },
    { field: "latitude", headerName: "latitude", width: 100 },
    { field: "longitude", headerName: "longitude", width: 100 },
    {
      field: "action",
      headerName: "action",
      width: 50,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<VisibilityIcon />}
          onClick={() => dispatch(setAttractionID(params.id))}
        />
      ),
    },
  ];

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <Container maxWidth="lg">
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
              />
            </div>
            <AttractionCard />
          </Container>
        </>
      ) : null}
    </div>
  );
}
