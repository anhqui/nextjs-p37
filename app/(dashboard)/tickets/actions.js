"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function addTicket(formData) {
  const ticket = Object.fromEntries(formData);

  // connect supabase
  const supabase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // insert the data
  const { error } = await supabase.from("Tickets").insert({
    ...ticket,
    user_email: session.user.email,
  });

  // redirect to the tickets page
  revalidatePath("/tickets");
  redirect("/tickets");
}
