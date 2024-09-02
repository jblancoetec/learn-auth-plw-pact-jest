import { Alert } from "@mui/material";
import { ProcessStatus, Status } from "@/app/hooks/useProcessStatus";

const SignUpProcessError = ({
  hasAProblem,
  problem,
}: {
  hasAProblem: boolean;
  problem: string;
}) => {
  return hasAProblem && <Alert severity="error">{problem}</Alert>;
};

export default SignUpProcessError;
