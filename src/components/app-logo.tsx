
import { Link } from "react-router-dom";

const AppLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="text-2xl font-bold tracking-tighter flex items-center gap-1">
        <span className="text-mq-yellow">MQ</span>
        <span className="text-xs font-normal text-mq-yellow/70 mt-1.5">MUSIC</span>
      </div>
    </Link>
  );
};

export default AppLogo;
