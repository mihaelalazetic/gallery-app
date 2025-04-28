import { supabase } from "./supabase";

export const uploadProfilePictureToSupabase = async (
  file: File
): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("users").upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("users")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};
