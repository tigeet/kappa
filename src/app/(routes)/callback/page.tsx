import { memo } from "react";
import createUserIfDoesNotExist from "./actions";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await createUserIfDoesNotExist();
  if (!user) {
    redirect("/error");
  }
  redirect("/");
};
export default memo(Page);
