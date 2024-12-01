import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";


function BackButton({destination='/'}) {
  return ( 
    <>
     <div className="flex">
<Link to={destination} className="bg-sky-800 text-white px-8 py-5 
rounded-lg w-fit">
  <BsArrowLeft />
</Link> 
     </div>
    </>
   );
}

export default BackButton;