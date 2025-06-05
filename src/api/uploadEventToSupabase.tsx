import { supabase } from "./supabase";

export const uploadEventToSupabase = async (file: File): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("events")
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("events")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};
