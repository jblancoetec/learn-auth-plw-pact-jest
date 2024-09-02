import { LinearProgress } from "@mui/material";

const SignUpProcessProgress = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading && <LinearProgress />;
};

export default SignUpProcessProgress;
