import { useEffect, useState } from "react";

const useNavigator = () => {
  const [nav, setNavigator] = useState<Navigator | undefined>(undefined);

  useEffect(() => setNavigator(navigator), []);

  return nav;
};

export default useNavigator;
