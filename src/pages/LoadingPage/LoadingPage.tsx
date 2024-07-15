import { Loader } from "@mantine/core";
import "./LoadingPage.css";

export default function LoadingPage() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <img src="/loading.webp" alt="Loading" className="loading-image" />
        <Loader color="green" />
      </div>
    </div>
  );
}
