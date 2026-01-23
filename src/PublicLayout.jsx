import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div>
      {/* ici tu peux mettre un header public si tu veux */}
      <Outlet />
    </div>
  );
}

export default PublicLayout;
