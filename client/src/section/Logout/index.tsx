import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "baseui/snackbar";
import React from "react";
import { useHistory } from "react-router-dom";
import { LoadingSnipper } from "../../lib/Components";
import { LOG_OUT } from "../../lib/graphQl/mutations/logout";
import { Logout as LogoutMut } from "../../lib/graphQl/mutations/logout/__generated__/LogOut";
import { Viewer } from "../../lib/types";

interface ILogoutProps {
  setViewer: (viewer: Viewer) => void;
}

const Logout: React.FC<ILogoutProps> = ({ setViewer }) => {
  const histroy = useHistory();
  const { enqueue } = useSnackbar();
  const [_logOut, _] = useMutation<LogoutMut>(LOG_OUT, {
    onCompleted: ({ logOut }) => {
      histroy.push("/");
      enqueue({ message: "Logged out successfully!" });
      setViewer(logOut);
    },
    onError: () => {
      histroy.push("/");
      setViewer({
        didRequest: true,
        avatar: null,
        email: null,
        firstName: null,
        id: null,
        isAdmin: null,
        lastName: null,
      });
    },
  });
  const logout = React.useRef(_logOut);

  React.useEffect(() => {
    logout.current();
  }, []);

  return <LoadingSnipper />;
};

export { Logout };
