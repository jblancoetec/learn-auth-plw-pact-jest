import { LinearProgress } from "@mui/material";

const FeedbackInProgress = ({ isLoading }: { isLoading: boolean }) => {
  return isLoading && <LinearProgress />;
};

export default FeedbackInProgress;
