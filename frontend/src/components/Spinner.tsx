import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  size: number;
}

export default function Spinner({ size }: Props) {
  return <ClipLoader color="white" size={size} />;
}
