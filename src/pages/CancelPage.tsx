import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCheckoutCancel from "../hooks/useCheckoutCancel";
import LoadingPage from "./LoadingPage/LoadingPage";
import { useEffect } from "react";
import { Title } from "@mantine/core";

export default function CancelPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  if (sessionId === null) {
    return <div>Keine gültige SessionID</div>;
  }
  const authHeader = useAuthHeader();
  const token = authHeader?.split(" ")[1];
  const navigator = useNavigate();
  const delay = 5000;
  const to = "/";

  const query = useCheckoutCancel(sessionId, token);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigator(to);
    }, delay);

    // Aufräumen des Timers, wenn die Komponente unmountet
    return () => clearTimeout(timer);
  }, [navigator]);

  if (query.isLoading) {
    return <LoadingPage />;
  }

  if (query.isError) {
    return <div>{query.error.message}</div>;
  }

  return (
    <div>
      <Title>Bestellvorgang abgebrochen</Title>
      <p>Sie werden in {delay / 1000} Sekunden weitergeleitet...</p>
    </div>
  );
}
