
import { Link } from "react-router-dom";

const AppLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="text-2xl font-bold tracking-tighter flex items-center">
        <span className="text-mq-yellow">MQ</span>
      </div>
    </Link>
  );
};

export default AppLogo;
