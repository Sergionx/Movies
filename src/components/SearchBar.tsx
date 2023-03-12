import react from "react";

interface Props {
  placeholder: string;
  data: string;
}

function SearchBar(props: Props) {
  return (
    <div className="search">
      <div className="searchInputs"></div>
      <input type="text" placeholder={props.placeholder} />
      <div className="earchIcon"></div>
      <div className="dataResult"></div>
    </div>
  );
}
export default SearchBar;
