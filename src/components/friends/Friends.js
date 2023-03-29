import { useSelector } from "react-redux";

const Friends = () => {
  const currentUser = useSelector((state) => state.authentication.currentUser);
  
  return <div>Friends</div>;
};

export default Friends;
