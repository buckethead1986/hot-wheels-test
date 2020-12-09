import react from "react";
import Button from "@material-ui/core/Button";

function Navbar(props) {
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
  }
  return (
    <div>
      <Button>{props.first}</Button>
      <Button>{props.second}</Button>
      <Button onClick={handleClick}>{props.arr[0]}</Button>
    </div>
  );
}
export default Navbar;
