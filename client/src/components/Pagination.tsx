import ReactPaginate from "react-paginate";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import "../styles/pagination.css";
import { useNavigate } from "react-router-dom";

interface PaginationProps {
  pageCount: number;
  route: string;
}

export const Pagination: React.FC<PaginationProps> = ({ pageCount, route }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
      }}
    >
      <ReactPaginate
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={({ selected }) => navigate(`/${route}/${selected + 1}`)}
        containerClassName={"pagination"}
        nextLabel={<ArrowForwardIcon style={{ fontSize: 18, width: 150 }} />}
        previousLabel={<ArrowBackIcon style={{ fontSize: 18, width: 150 }} />}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Pagination;
