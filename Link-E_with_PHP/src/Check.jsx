
import { useUser } from "./view/UserContext";
const Check = () => {
  const user = useUser();
  console.log(user)

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Type: {user.type}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
};

export default Check;
