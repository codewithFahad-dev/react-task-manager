import { useAppContext } from "./context";

const filtersArr = ["All", "Active", "Completed"];

const Filters = () => {
  const { handleFilter } = useAppContext();
  return (
    <ul className="filter-buttons">
      {filtersArr.map((item) => {
        return (
          <button type="button" onClick={() => handleFilter(item)} key={item}>
            {item}
          </button>
        );
      })}
    </ul>
  );
};

export default Filters;
