import { useEffect, useState } from "react";

export const useGeolocation = () => {
  const [position, setPostion] = useState<{ lat: number; long: number } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setPostion({ lat: pos.coords.latitude, long: pos.coords.longitude }),
      (err) => setError(err.message),
    );
  }, []);

  return { position, error };
};
