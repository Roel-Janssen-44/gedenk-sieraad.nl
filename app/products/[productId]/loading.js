import Skeleton from "@mui/material/Skeleton";

export default function LoadingProductPage() {
  return (
    <div className="container mt-6 flex flex-col justify-center">
      <Skeleton
        animation="wave"
        variant="rounded"
        width={"auto"}
        height={350}
        className="aspect-square mb-4"
      />
      <Skeleton
        animation="wave"
        variant="rounded"
        width={300}
        height={32}
        className="mb-4"
      />
      <Skeleton
        animation="wave"
        variant="rounded"
        width={220}
        height={28}
        className="mb-1"
      />
    </div>
  );
}
